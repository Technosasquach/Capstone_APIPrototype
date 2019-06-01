"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const OSIConfig = require("./../config/osiPiDetails");
const database_1 = require("./../database");
class OSIPiAPIScraper {
    constructor() {
        this.buf = new ObjectBuffer();
    }
    // Return a array of all of the urls
    extractLinks(scrape, depth) {
        var temp = [];
        //depth to indicate between databases and elements
        if (depth == 0) {
            var a = scrape['Items'];
            for (var i = 0; i < a.length; i++) {
                temp.push(a[i]['Links']['Databases']);
            }
        }
        else {
            var a = scrape['Items'];
            for (var i = 0; i < a.length; i++) {
                temp.push(a[i]['Links']['Elements']);
            }
        }
        return temp;
    }
    scrapeWholeAPI() {
        //clear database while testing
        database_1.Node.collection.deleteMany({});
        this.recursiveScrape(0, OSIConfig.default.url);
    }
    recursiveScrape(depth, startingURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const scrape = yield this.requestWrapper(startingURL);
            //if request returned nothing return
            if (scrape == undefined) {
                return;
            }
            this.storeScrape(depth, scrape);
            this.buf.add(this.extractLinks(scrape, depth));
            const newDepth = depth + 1;
            while (this.buf.length() >= 1) {
                //place await infront of this to slow down an excess of requests lol :P
                this.recursiveScrape(newDepth, this.buf.next());
            }
        });
    }
    storeScrape(depth, scrape) {
        var a = scrape['Items'];
        for (var i = 0; i < a.length; i++) {
            const node = new database_1.Node({
                depth: depth,
                name: a[i]['Name'],
                json: JSON.stringify(a[i]),
                parents: "",
                children: ""
            });
            node.save();
        }
    }
    requestWrapper(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = {};
            yield axios_1.default.get(url || OSIConfig.default.url, {
                url: url || OSIConfig.default.url,
                withCredentials: true,
                auth: {
                    username: OSIConfig.default.credentials.username,
                    password: OSIConfig.default.credentials.password
                }
            }).then(response => {
                //success response
                a = response;
            }, response => {
                //fail response - checks if its just a page not existing or a request issue
                if (response.status != undefined) {
                    if (response.response.status == 502) {
                        return;
                    }
                }
                else {
                    //Timeout Issue from large request amount redoes if page exists
                    this.requestWrapper(url);
                }
            });
            return a.data;
        });
    }
}
class ObjectBuffer {
    constructor() {
        this.buffer = [];
    }
    /**
     * @name Adds a entry to the buffer
     * @param {any} items Any number of elements/items can be added
     * @returns {number} New array length
     */
    add(items) {
        for (var i = 0; i < items.length; i++) {
            this.buffer.unshift(items[i]);
        }
        return this.buffer.length;
    }
    /**
     * @name Retrieves and deletes the oldest entry from the buffer
     * @returns {number} New array length
     */
    next() {
        return this.buffer.pop();
    }
    /**
     * @name Deletes the buffer
     * @returns {number} New array length
     */
    delete() {
        this.buffer = [];
    }
    /**
     * @name Length of buffer
     * @returns {number} Array length
     */
    length() {
        return this.buffer.length;
    }
}
exports.scrape = new OSIPiAPIScraper();
//# sourceMappingURL=scraper.js.map