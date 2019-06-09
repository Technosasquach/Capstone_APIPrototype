"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.InformationSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    related: [mongoose.Schema.Types.ObjectId],
    text: String
});
exports.Information = mongoose.model("Information", exports.InformationSchema);
//# sourceMappingURL=information.js.map