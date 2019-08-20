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
        required: true
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
    }
});

export const Information: mongoose.Model<IInformationModel> = mongoose.model<IInformationModel>("Information", InformationSchema);