"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticLunr = require("elasticlunr");
const index_1 = require("./../database/index");
/**
 * SystemSearch
 * Provides core searching functionality to the program
 *
 * @export
 * @class SystemSearch
 */
class SystemSearch {
    /**
     * buildNodeSearch
     * When called, with run a full search engine build for the node database set
     *
     * @static
     * @memberof SystemSearch
     */
    static buildNodeSearch() {
        // For every node, extract keywords and id
        // Attach new entry to search, with ID as key and keywords as value
        // Should use the given addToNodeSearch();
        // Wiping SearchDB incase
        this.nodeSearchEngine = elasticLunr(function () {
            this.addField('text');
            this.setRef('id');
            this.saveDocument(false); // http://elasticlunr.com/docs/index.html
            // Will not save original JSON, makes updating and deleting elements without ID impossible
        });
        index_1.Node.find({}, (err, data) => {
            if (err)
                throw err;
            data.forEach((elm) => {
                this.addToNodeSearch(elm.id, elm.keywords.join(", "));
            });
        });
    }
    /**
     * addToNodeSearch
     * Adds the key/value pair to the node search engine
     *
     * @static
     * @param {string} id The ID that will be returned for searches. Only to be the mondoID of the database entry
     * @param {string} text Text string to be searched against
     * @memberof SystemSearch
     */
    static addToNodeSearch(id, text) {
        // If an id exists prior, then remove item, save text, add saved text to new text
        //@ts-ignore
        this.nodeSearchEngine.update({
            "id": id,
            "text": text
        });
    }
    /**
     * buildInformationSearch
     * When called, with run a full search engine build for the information database set
     *
     * @static
     * @memberof SystemSearch
     */
    static buildInformationSearch() {
        // For every information byte, extract keywords and ID
        // Attach new entry to search, with ID as key and keywords as value
        // Should use the given addToInformationSearch();
        this.informationSearchEngine = elasticLunr(function () {
            this.addField('text');
            this.setRef('id');
            this.saveDocument(false); // http://elasticlunr.com/docs/index.html
            // Will not save original JSON, makes updating and deleting elements without ID impossible
        });
        index_1.Information.find({}, (err, data) => {
            if (err)
                throw err;
            data.forEach((elm) => {
                this.addToInformationSearch(elm.id, [...elm.keywords, elm.text].join(", "));
            });
        });
    }
    /**
     * addToInformationSearch
     * Adds the key/value pair to the information search engine
     *
     * @static
     * @param {string} id The ID that will be returned for searches. Only to be the mondoID of the database entry
     * @param {string} text Text string to be searched against
     * @memberof SystemSearch
     */
    static addToInformationSearch(id, text) {
        // If an id exists prior, then remove item, save text, add saved text to new text
        //@ts-ignore
        this.informationSearchEngine.update({
            "id": id,
            "text": text
        });
    }
}
/**
 * nodeSearchEngine
 * Storage for the node search engine
 *
 * @static
 * @memberof SystemSearch
 */
SystemSearch.nodeSearchEngine = elasticLunr(function () {
    this.addField('text');
    this.setRef('id');
    this.saveDocument(false); // http://elasticlunr.com/docs/index.html
    // Will not save original JSON, makes updating and deleting elements without ID impossible
});
/**
 * informationSearchEngine
 * Storage for the information search engine
 *
 * @static
 * @memberof SystemSearch
 */
SystemSearch.informationSearchEngine = elasticLunr(function () {
    this.addField('text');
    this.setRef('id');
    this.saveDocument(false); // http://elasticlunr.com/docs/index.html
    // Will not save original JSON, makes updating and deleting elements without ID impossible
});
exports.SystemSearch = SystemSearch;
//# sourceMappingURL=search.js.map