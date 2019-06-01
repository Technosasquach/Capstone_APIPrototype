import * as mongoose from "mongoose";

export interface INodeModel extends mongoose.Document {
    createdAt: Date;
    depth: number;
    name: string;
    json: string;
    parents: string[];
    children: string[];
}

export const NodeSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : { type: Date, default: Date.now },
    depth: Number,
    name: String,
    json: String,
    parents: [String],
    children: [String]
});

export const Node: mongoose.Model<INodeModel> = mongoose.model<INodeModel>("Nodes", NodeSchema);