import * as mongoose from "mongoose";
import { CommentModel } from './comment'

export interface PageModel extends mongoose.Document {
    name: string;
    content: string;
    image: { data: Buffer, contentType: String };
    comments?: [CommentModel];
}

export interface TSPageModel extends PageModel {
    uuid: string;
    createdAt: Date;
}

export const PageSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    content: {
        type: String,
        unique: false,
        required: true
    },
    image: {
        type: { data: Buffer, contentType: String },
        unique: false,
        required: false,
        index: false
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        unique: false,
        required: false
    }]
});

PageSchema.set('autoIndex', false);

export const Page: mongoose.Model<PageModel> = mongoose.model<PageModel>("Pages", PageSchema);
