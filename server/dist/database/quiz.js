"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.QuizSchema = new mongoose.Schema({
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
exports.Quiz = mongoose.model("Quizzes", exports.QuizSchema);
//# sourceMappingURL=quiz.js.map