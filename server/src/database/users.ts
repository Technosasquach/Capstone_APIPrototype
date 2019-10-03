import * as mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
    username: string;
    password: string;
    coursesTaken: string[];
    coursesComplete: string[];
    history: string[];
    createdAt: Date;
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

export const Course: mongoose.Model<UserModel> = mongoose.model<UserModel>("Courses", UserSchema);
