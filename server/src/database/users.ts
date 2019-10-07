import * as mongoose from "mongoose";

export enum EUserAuthLevel {
    USER = "USER",
    OPERATOR = "OPERATOR",
    ADMIN = "ADMIN"
}

export interface UserModel extends mongoose.Document {
    username: string;
    password: string;
    coursesTaken: string[];
    coursesComplete: string[];
    history: string[];
    createdAt: Date;
    accessLevel: EUserAuthLevel
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    },
    accessLevel: {
        type: String,
        unique: false,
        required: true
    },
    coursesTaken: [{
        type: String,
        unique: false,
        required: false
    }],
    coursesComplete: [{
        type: String,
        unique: false,
        required: false
    }],
    history: [{
        type: String,
        unique: false,
        required: false
    }]
});

export const User: mongoose.Model<UserModel> = mongoose.model<UserModel>("User", UserSchema);
