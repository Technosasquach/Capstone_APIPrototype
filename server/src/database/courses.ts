import * as mongoose from "mongoose";

export interface CourseModel extends mongoose.Document {
    name: string;
    nodes: mongoose.Types.ObjectId[];
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
    nodes: [{
        type: [mongoose.Schema.Types.ObjectId],
        unique: false,
        required: true
    }],
});

export const Course: mongoose.Model<CourseModel> = mongoose.model<CourseModel>("Courses", CourseSchema);
