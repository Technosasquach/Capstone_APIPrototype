import * as mongoose from "mongoose";

export interface INodeModel extends mongoose.Document {
    createdAt: Date;
    depth: number;
    name: string;
    json: string;
    parents: mongoose.Types.ObjectId[];
    children: mongoose.Types.ObjectId[];
}

export const NodeSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : { type: Date, default: Date.now },
    depth: Number,
    name: String,
    json: String,
    parents: [mongoose.Schema.Types.ObjectId],
    children: [mongoose.Schema.Types.ObjectId]
});

export const Node: mongoose.Model<INodeModel> = mongoose.model<INodeModel>("Nodes", NodeSchema);