"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.NodeSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    depth: {
        type: Number,
        unique: false,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    json: {
        type: String,
        unique: false,
        required: true
    },
    keywords: {
        type: [String],
        unique: false,
        required: false
    },
    parents: [{
            type: [mongoose.Schema.Types.ObjectId],
            unique: false,
            required: false
        }],
    children: [{
            type: [mongoose.Schema.Types.ObjectId],
            unique: false,
            required: false
        }]
});
exports.Node = mongoose.model("Nodes", exports.NodeSchema);
//# sourceMappingURL=nodes.js.map