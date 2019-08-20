
const elasticLunr = require("elasticlunr");
import { Node, Information, INodeModel, IInformationModel } from "./../database/index"
/**
 * SystemSearch
 * Provides core searching functionality to the program
 *
 * @export
 * @class SystemSearch
 */
export class SystemSearch {

    /**
     * nodeSearchEngine
     * Storage for the node search engine
     * 
     * @static
     * @memberof SystemSearch
     */
    static nodeSearchEngine = elasticLunr(function () {
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
    static informationSearchEngine = elasticLunr(function () {
        this.addField('text');
        this.setRef('id');
        this.saveDocument(false); // http://elasticlunr.com/docs/index.html
            // Will not save original JSON, makes updating and deleting elements without ID impossible
    });

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
        Node.find({}, (err, data: INodeModel[]) => {
            if(err) throw err;
            data.forEach((elm: INodeModel) => {
                this.addToNodeSearch(elm.id, elm.keywords.join(", "));
            })
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
    static addToNodeSearch(id: string, text: string) {
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
        Information.find({}, (err, data: IInformationModel[]) => {
            if(err) throw err;
            data.forEach((elm: IInformationModel) => {
                this.addToInformationSearch(elm.id, [...elm.keywords, elm.text].join(", "));
            })
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
    static addToInformationSearch(id: string, text: string) {
        // If an id exists prior, then remove item, save text, add saved text to new text
        //@ts-ignore
        this.informationSearchEngine.update({ // Update will remove an element, then add if an ID is found to be the same
            "id": id,
            "text": text
        });
    }
}