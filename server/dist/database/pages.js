"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PageSchema = new mongoose.Schema({
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
    content: {
        type: String,
        unique: false,
        required: true
    },
    image: {
        type: { data: Buffer, contentType: String },
        unique: false,
        required: false,
        index: false
    },
    comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
            unique: false,
            required: false
        }]
});
exports.PageSchema.set('autoIndex', false);
exports.Page = mongoose.model("Pages", exports.PageSchema);
//# sourceMappingURL=pages.js.map