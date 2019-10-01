"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
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
            type: String,
            unique: false,
            required: true
        }],
});
exports.Course = mongoose.model("Courses", exports.CourseSchema);
//# sourceMappingURL=courses.js.map