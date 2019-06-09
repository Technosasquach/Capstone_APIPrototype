import * as mongoose from "mongoose";

export interface NodalModel extends mongoose.Document {
    depth: number;
    name: string;
    json: string;
}

// A model for in memory array use and recursive nesting
export interface TSNodalModel extends NodalModel {
    uuid: string;
    children: any[];
}


export interface INodeModel extends NodalModel {
    createdAt: Date;
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