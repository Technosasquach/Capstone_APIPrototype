import { Node, TSNodalModel, INodeModel } from "./../database";
import * as mongoose from "mongoose";
import { Graph } from "graphlib";

// Wrapper library for finding elements and sorting the node database
export class NodalMemory {

    private graph = new Graph(); 

    public generateNodeMap() {
        // Get the first node, chuck into generate recursive
        // 'created_at: 1 (Oldest), -1 (Newest)
        Node.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, node: INodeModel) {
            this.generateRecursive({...node, "uuid": node.id});
        });
    }

    private generateRecursive(node: INodeModel) {
        // Get children of given node
        node.children.forEach((childID) => {
            Node.findById(childID, (err, child: INodeModel) => {
                this.addToGraph(node, child);
                this.generateRecursive(child);
            })
        })
    }

    private addToGraph(parent: INodeModel, child: INodeModel) {
        this.graph.setNode(child.id + "", child.json);
        this.graph.setEdge(parent.id, child.id);
    }

    // Save made graph
    // Load saved graph
    // UUID to UUID path -> UUID[] returned
    
}