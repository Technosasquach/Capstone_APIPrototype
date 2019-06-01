
import axios, { AxiosResponse } from "axios";
import * as OSIConfig from "./../config/osiPiDetails";

import { Node } from "./../database";

class OSIPiAPIScraper {
    
    buf = new ObjectBuffer();

    // Return a array of all of the urls
    private extractLinks(scrape: any, depth: number): string[] {
        var temp = [];
        //depth to indicate between databases and elements
        if(depth == 0) {
            var a = scrape['Items'];
            for(var i = 0; i < a.length; i++){
                temp.push(a[i]['Links']['Databases']);
            }
        } else {
            var a = scrape['Items'];
            for(var i = 0; i < a.length; i++){
                temp.push(a[i]['Links']['Elements']);
            }
        }
        return temp;
    }

    public scrapeWholeAPI() {
        //clear database while testing
        Node.collection.deleteMany({});
        this.recursiveScrape(0, OSIConfig.default.url);
    }

    private async recursiveScrape(depth: number, startingURL?: string) {
        const scrape = await this.requestWrapper(startingURL);
        //if request returned nothing return
        if (scrape == undefined) {
            return;
        }
        this.storeScrape(depth, scrape);
        this.buf.add(this.extractLinks(scrape, depth));
        const newDepth = depth + 1;
        while(this.buf.length() >= 1) {
            //place await infront of this to slow down an excess of requests lol :P
            this.recursiveScrape(newDepth, this.buf.next());
        }
    }

    private storeScrape(depth: number, scrape: any) {
        var a = scrape['Items'];
        for(var i = 0; i < a.length; i++){
            const node = new Node({
                depth: depth,
                name: a[i]['Name'],
                json: JSON.stringify(a[i]),
                parents: "",
                children: ""
            })
            node.save();
        }
    }

    private async requestWrapper(url?: string): Promise<any> {
        var a = {} as AxiosResponse;
        await axios.get(url || OSIConfig.default.url, {
            url: url || OSIConfig.default.url,
            withCredentials: true,
            auth: {
                username: OSIConfig.default.credentials.username,
                password: OSIConfig.default.credentials.password
            }
        }).then(response => {
            //success response
            a = response
        }, response => {
            //fail response - checks if its just a page not existing or a request issue
            if(response.status != undefined) {
                if (response.response.status == 502) {
                    return;
                }
            } else {
                //Timeout Issue from large request amount redoes if page exists
                this.requestWrapper(url);
            }
        });
        return a.data;
    }
}

class ObjectBuffer {

    buffer: any[] = [];

    /**
     * @name Adds a entry to the buffer
     * @param {any} items Any number of elements/items can be added
     * @returns {number} New array length
     */
    add(items: any): number {
        for(var i = 0; i < items.length; i++){
            this.buffer.unshift(items[i]);
        }
        return this.buffer.length;
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
export const scrape = new OSIPiAPIScraper();