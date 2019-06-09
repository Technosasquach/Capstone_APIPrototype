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
// Wrapper library for finding elements and sorting the node database
class NodalMemory {
    constructor() {
        // export const NodalGraph = () => {
        this.graph = new dagre.graphlib.Graph();
        this.traversedItems = 0;
        this.traversableItems = 0;
        this.bar1 = new cliProgress.Bar({
            format: '[NodalMemory] Graphing... [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_grey);
    }
    generateNodeMap() {
        this.traversedItems = 0;
        console.log("[NodalMemory] Starting graph construction");
        database_1.Node.countDocuments({}, (err, count) => {
            this.traversableItems = count;
            this.bar1.start(this.traversableItems, 0);
            database_1.Node.findOne({}, {}, { sort: { 'created_at': 1 } }, (err, node) => {
                if (err)
                    console.error(err);
                this.graph.setNode(node._doc._id, { "depth": node._doc.depth, "label": node._doc.name, "width": "30", "height": "15" });
                this.generateRecursive(node._doc);
            });
        });
    }
    generateRecursive(node) {
        this.updateProgress();
        let i = node.children.length;
        node.children.forEach((childID) => {
            database_1.Node.findById(childID, (err, child) => {
                this.addToGraph(node, child._doc);
                this.generateRecursive(child._doc);
            });
        });
    }
    addToGraph(parent, child) {
        this.graph.setNode(child._id, { "depth": child.depth, "label": child.name, "width": "30", "height": "15" });
        this.graph.setEdge(parent._id, child._id, { "width": "30" }); //"label": "Edge " + parent._id + " to " + child._id 
    }
    updateProgress() {
        this.traversedItems++;
        this.bar1.update(this.traversedItems);
        if (this.traversedItems >= this.traversableItems) {
            this.bar1.stop();
            console.log("[NodalMemory] Completed graph construction");
            console.log("[NodalMemory] Saving graph construction to " + path.join(__dirname, "./graph.json"));
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