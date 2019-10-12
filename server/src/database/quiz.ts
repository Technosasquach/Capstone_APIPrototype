import * as mongoose from "mongoose";


export interface IQuizModel extends mongoose.Document {
    createdAt: Date;
    nodeID: mongoose.Types.ObjectId;
    questions: string[];
    answer: string[];
    answers: string[][];
}

export const QuizSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    nodeID: {
        type: String,
        unique: false,
        required: true,
    },
    questions: [{
        type: String,
        unique: false,
        required: true,
    }],
    answer: [{
        type: String,
        unique: false,
        required: true,
    }],
    answers: {
        type: [[String]],
        unique: false,
        required: true,
    },
});

export const Quiz: mongoose.Model<IQuizModel> = mongoose.model<IQuizModel>("Quizzes", QuizSchema);