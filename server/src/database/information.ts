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
    data: string;
    keywords: string[];
    nodeId: mongoose.Schema.Types.ObjectId;
    type: string;
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
    data: {
        type: String,
        unique: false,
        required: true,
        index: false
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
    type: {
        type: String,
        unique: false,
        required: true
    },
});

export const Information: mongoose.Model<IInformationModel> = mongoose.model<IInformationModel>("Information", InformationSchema);