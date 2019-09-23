import * as mongoose from "mongoose";


export interface CourseModel extends mongoose.Document {
    name: string;
    pages: {}[];
    content: {}[];
}

export interface TSCourseModel extends CourseModel {
    uuid: string;
    createdAt: Date;
}

export const CourseSchema: mongoose.Schema = new mongoose.Schema({
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
    pages: [{
        type: Object,
        unique: false,
        required: true
    }],
    content: [{
        type: Object,
        unique: false,
        required: true
    }],
});

export const Course: mongoose.Model<CourseModel> = mongoose.model<CourseModel>("Courses", CourseSchema);
