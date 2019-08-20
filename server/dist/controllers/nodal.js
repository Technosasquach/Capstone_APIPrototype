"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./../database");
const dagre = require("dagre");
const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress");
// export interface INodalMemory {
//     graph: Graph;
//     generateNodeMap(): void;
//     generateRecursive(node: any): void;
//     addToGraph(parent: any, child: any): void;
// }
/**
 * NodalMemory
 *
 * @export
 * @class NodalMemory
 */
class NodalMemory {
    constructor() {
        this.graph = new dagre.graphlib.Graph();
        this.traversedItems = 0;
        this.traversableItems = 0;
        this.bar1 = new cliProgress.Bar({
            format: '[NodalMemory] Graphing... [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_grey);
    }
    /**
     * generateNodeMap()
     *
     * Main entry point for generating the node map. Uses the database stored instances to generate
     * @memberof NodalMemory
     */
    generateNodeMap() {
        // Initial settings
        this.traversedItems = 0;
        // Print init
        console.log("[NodalMemory] Starting graph construction");
        // Count all of the node elements in the database, so we know how many we are iterating though
        database_1.Node.countDocuments({}, (err, count) => {
            this.traversableItems = count;
            // Start the bar graph
            this.bar1.start(this.traversableItems, 0);
            // Get the very first node. "Oldest" element will be the head of the try, as it would have been first scrapped and first processed
            database_1.Node.findOne({}, {}, { sort: { 'created_at': 1 } }, (err, node) => {
                if (err)
                    console.error(err); // If there was an error doing that
                // Start standard node graph rebuilding
                this.graph.setNode(node._doc._id, { "depth": node._doc.depth, "label": node._doc.name });
                this.generateRecursive(node._doc);
            });
        });
    }
    /**
     * generateRecursive()
     *
     * Given a node, it will recursively trawl though all children, and adds it to the larger data structure.
     * @private
     * @param {INodeModel} node - Given node
     * @memberof NodalMemory
     */
    generateRecursive(node) {
        // Flag progress to the external counter
        this.updateProgress();
        let i = node.children.length;
        // For every child
        node.children.forEach((childID) => {
            // Find child object in a database
            database_1.Node.findById(childID, (err, child) => {
                // Add found child object to database
                this.addToGraph(node, child._doc);
                // Process found child object 
                this.generateRecursive(child._doc);
            });
        });
    }
    /**
     * addToGraph()
     *
     * Adds a series of node elements together. Binds all children to a parent node element.
     * @param {*} parent - Parent node
     * @param {*} child - Child node
     * @memberof NodalMemory
     */
    addToGraph(parent, child) {
        this.graph.setNode(child._id, { "depth": child.depth, "label": child.name });
        this.graph.setEdge(parent._id, child._id); //"label": "Edge " + parent._id + " to " + child._id 
    }
    /**
     * updateProgress()
     *
     * Is called whenever the nodal system iterates though a node.
     * Handles the bar graphing, and when it fully passes though everything it saves it all to a file.
     * @private
     * @memberof NodalMemory
     */
    updateProgress() {
        this.traversedItems++;
        this.bar1.update(this.traversedItems);
        // Checking to see if it has run though all of the items it needs too
        if (this.traversedItems >= this.traversableItems) {
            // Stop the bar graph stuff
            this.bar1.stop();
            // Print completion
            console.log("[NodalMemory] Completed graph construction");
            console.log("[NodalMemory] Saving graph construction to " + path.join(__dirname, "./graph.json"));
            // Write to a file in root directory (away from any compile steps or file operations)
            fs.writeFile(path.join(__dirname, "./../../../graph.json"), JSON.stringify(dagre.graphlib.json.write(this.graph)), {}, (err) => {
                if (err)
                    console.error("[NodalMemory] Error: " + err);
                console.log("[NodalMemory] Saved graph construction!");
            });
        }
    }
}
exports.NodalMemory = NodalMemory;
//# sourceMappingURL=nodal.js.map