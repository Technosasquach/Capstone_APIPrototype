"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.InformationSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    related: [{
            type: [mongoose.Schema.Types.ObjectId],
            unique: false,
            required: false
        }],
    data: {
        type: String,
        unique: false,
        required: true,
        index: false
    },
    keywords: {
        type: [String],
        unique: false,
        required: false
    },
    nodeId: {
        type: String,
        unique: false,
        required: true
    },
    type: {
        type: String,
        unique: false,
        required: true
    },
});
exports.Information = mongoose.model("Information", exports.InformationSchema);
//# sourceMappingURL=information.js.map