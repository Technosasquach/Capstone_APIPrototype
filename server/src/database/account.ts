import * as mongoose from "mongoose";

export interface IAccountModel extends mongoose.Document {
    createdAt: Date;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    position: string;
    phone: string;
}

export const AccountSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: false,
        default: Date.now
    },
    username: {
        type: String,
        unique: false,
        required: false
    },
    firstname: {
        type: String,
        unique: false,
        required: false
    },
    lastname: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    position: {
        type: String,
        unique: false,
        required: false
    },
    phone: {
        type: String,
        unique: false,
        required: false
    }
});

export const Account: mongoose.Model<IAccountModel> = mongoose.model<IAccountModel>("Account", AccountSchema);