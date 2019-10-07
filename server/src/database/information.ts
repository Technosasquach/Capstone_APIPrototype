import * as mongoose from "mongoose";

/**
 * IInformationModel
 *
 * @export
 * @interface IInformationModel
 * @extends {mongoose.Document}
 */
export interface IInformationModel extends mongoose.Document {
    createdAt: Date;
    related: mongoose.Types.ObjectId[];
    text: string;
    keywords: string[];
    nodeId: mongoose.Schema.Types.ObjectId;
    order: number;
    image: Buffer;
}

export const InformationSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    related: [{
        type: [mongoose.Schema.Types.ObjectId],
        unique: false,
        required: false
    }],
    text: {
        type: String,
        unique: false,
        required: true
    },
    keywords: {
        type: [String],
        unique: false,
        required: false
    },
    nodeId: {
        type: String,
        unique: false,
        required: true
    },
    order: {
        type: Number,
        unique: false,
        required: true
    },
    image: {
        type: String,
        unique: false,
        required: false,
        index: false
    }
});

export const Information: mongoose.Model<IInformationModel> = mongoose.model<IInformationModel>("Information", InformationSchema);