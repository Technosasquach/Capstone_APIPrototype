import * as mongoose from "mongoose";

/**
 * NodalModel
 *
 * @export
 * @interface NodalModel
 * @extends {mongoose.Document}
 */
export interface NodalModel extends mongoose.Document {
    depth: number;
    name: string;
    json: string;
    keywords: string[];
}

/**
 * TSNodalModel
 * A model for in memory array use and recursive nesting
 *
 * @export
 * @interface TSNodalModel
 * @extends {NodalModel}
 */
export interface TSNodalModel extends NodalModel {
    uuid: string;
    children: any[];
}

/**
 * INodeModel
 *
 * @export
 * @interface INodeModel
 * @extends {NodalModel}
 */
export interface INodeModel extends NodalModel {
    createdAt: Date;
    parents: mongoose.Types.ObjectId[];
    children: mongoose.Types.ObjectId[];
}

export const NodeSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    depth: {
        type: Number,
        unique: false,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    json: {
        type: String,
        unique: false,
        required: true
    },
    keywords: {
        type: [String],
        unique: false,
        required: false
    },
    parents: [{
        type: [mongoose.Schema.Types.ObjectId],
        unique: false,
        required: false
    }],
    children: [{
        type: [mongoose.Schema.Types.ObjectId],
        unique: false,
        required: false
    }]
});

export const Node: mongoose.Model<INodeModel> = mongoose.model<INodeModel>("Nodes", NodeSchema);