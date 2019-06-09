import * as mongoose from "mongoose";

export interface IInformationModel extends mongoose.Document {
    createdAt: Date;
    related: mongoose.Types.ObjectId[];
    text: string;
}

export const InformationSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : { type: Date, default: Date.now },
    related: [mongoose.Schema.Types.ObjectId],
    text: String
});

export const Information: mongoose.Model<IInformationModel> = mongoose.model<IInformationModel>("Information", InformationSchema);