
import axios from "axios";
import * as OSIConfig from "./../config/osiPiDetails";

import { Node } from "./../database";

class OSIPiAPIScraper {

    buf = new ObjectBuffer();

    // Return a array of all of the urls
    private extractLinks(scrape: any): string[] {
        return [];
    }

    public scrapeWholeAPI() {
        this.recursiveScrape(0, OSIConfig.default.url);
    }

    private recursiveScrape(depth: number, startingURL?: string) {
        const scrape = this.requestWrapper();
        this.storeScrape(depth, scrape);
        this.buf.add(this.extractLinks(scrape));
        const newDepth = depth + 1;
        if(this.buf.length() > 1) {
            this.recursiveScrape(newDepth, this.buf.next());
        } else {
            return
        }
    }

    private storeScrape(depth: number, scrape: any) {
        const node = new Node({
            depth: depth,
            json: JSON.stringify(scrape),
            parents: "",
            children: ""
        })
        node.save();
    }

    private requestWrapper(url?: string): any {
        axios.get(OSIConfig.default.url, {
            url: url || OSIConfig.default.url,
            withCredentials: true,
            auth: {
                username: OSIConfig.default.credentials.username,
                password: OSIConfig.default.credentials.password
            }
        }).then((rep: any) => { return rep; });
    }
}

class ObjectBuffer {

    buffer: any[];

    /**
     * @name Adds a entry to the buffer
     * @param {any} items Any number of elements/items can be added
     * @returns {number} New array length
     */
    add(...items: any): number {
        return this.buffer.unshift(...items);
    }

    /**
     * @name Retrieves and deletes the oldest entry from the buffer
     * @returns {number} New array length
     */
    next(): any {
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
    length(): number {
        return this.buffer.length;
    }
}