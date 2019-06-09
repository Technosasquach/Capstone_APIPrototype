import { Node, INodeModel  } from "./../database";
import * as dagre from "dagre";
import * as fs from "fs";
import * as path from "path";
import * as cliProgress from "cli-progress";

// export interface INodalMemory {
//     graph: Graph;
//     generateNodeMap(): void;
//     generateRecursive(node: any): void;
//     addToGraph(parent: any, child: any): void;
// }

// Wrapper library for finding elements and sorting the node database
export class NodalMemory { //implements INodalMemory {
// export const NodalGraph = () => {

    graph = new dagre.graphlib.Graph();
    traversedItems: number = 0;
    traversableItems: number = 0;
    bar1 = new cliProgress.Bar({
        format: '[NodalMemory] Graphing... [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
    }, cliProgress.Presets.shades_grey);

    public generateNodeMap() {
        this.traversedItems = 0;
        console.log("[NodalMemory] Starting graph construction");
        Node.countDocuments({}, (err, count: number) => {
            this.traversableItems = count;
            this.bar1.start(this.traversableItems, 0);
            Node.findOne({}, {}, { sort: { 'created_at' : 1 } }, (err, node: any) => {
                if (err) console.error(err);
                this.graph.setNode(node._doc._id, {"depth": node._doc.depth, "label": node._doc.name, "width": "30", "height": "15"});
                this.generateRecursive(node._doc);
            });
        });
    }

    private generateRecursive(node: INodeModel) {
        this.updateProgress();
        let i = node.children.length;
        node.children.forEach((childID: any) => {
            Node.findById(childID, (err, child: any) => {
                this.addToGraph(node, child._doc);
                this.generateRecursive(child._doc);
            })
        })
    }

    public addToGraph(parent: any, child: any) {
        this.graph.setNode(child._id, {"depth": child.depth, "label": child.name, "width": "30", "height": "15"});
        this.graph.setEdge(parent._id, child._id, { "width": "30" }); //"label": "Edge " + parent._id + " to " + child._id 
    }

    private updateProgress() {
        this.traversedItems++;
        this.bar1.update(this.traversedItems);
        if(this.traversedItems >= this.traversableItems) {
            this.bar1.stop();
            console.log("[NodalMemory] Completed graph construction");
            console.log("[NodalMemory] Saving graph construction to " + path.join(__dirname, "./graph.json"));
            
            fs.writeFile(path.join(__dirname, "./../../../graph.json"), JSON.stringify(dagre.graphlib.json.write(this.graph)), {}, (err) => {
                if(err) console.error("[NodalMemory] Error: " + err);
                console.log("[NodalMemory] Saved graph construction!");
            });
        }
    }
}