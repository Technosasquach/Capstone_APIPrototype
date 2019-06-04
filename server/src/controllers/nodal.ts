import { Node  } from "./../database";
import * as mongoose from "mongoose";
import * as graphLib from "graphlib";
import { Graph } from "graphlib";
import * as fs from "fs";
import * as path from "path";

// export interface INodalMemory {
//     graph: Graph;
//     generateNodeMap(): void;
//     generateRecursive(node: any): void;
//     addToGraph(parent: any, child: any): void;
// }

// Wrapper library for finding elements and sorting the node database
export class NodalMemory { //implements INodalMemory {
// export const NodalGraph = () => {

    graph = new Graph(); 

    constructor() {
        return;
    }

    public generateNodeMap() {
        // Get the first node, chuck into generate recursive
        // 'created_at: 1 (Oldest), -1 (Newest)
        Node.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, node: any) {
            if (err) console.error(err);
            console.log("[NodalMemory] Starting graph construction");
            console.log(JSON.stringify(node._doc));
            this.generateRecursive(); //node._doc);
            // console.log("[NodalMemory] Completed graph construction");
            // console.log("[NodalMemory] Saving graph construction");
            // fs.writeFile(path.join(__dirname, "./graph.json"), graphLib.json.write(this.graph), {encoding: "utf8"}, () => {
            //     console.log("[NodalMemory] Saved graph construction!");
            // });
        });
    }

    private generateRecursive(node: any) {
        // Get children of given node
        // console.log("------------");
        console.log("[NodalMemory] Processing graph: " + JSON.stringify(node._id));
        node.children.forEach((childID: any) => {
            console.log("[NodalMemory] Sending child: " + childID._id);
            Node.findById(childID, (err, child: any) => {
                this.addToGraph(node, child._doc._id);
                this.generateRecursive(child._doc);
            })
        })
        return;
    }

    public addToGraph(parent: any, child: any) {
        this.graph.setNode(child.id + "", child.json);
        this.graph.setEdge(parent.id, child.id);
    }

    // Save made graph
    // Load saved graph
    // UUID to UUID path -> UUID[] returned
}