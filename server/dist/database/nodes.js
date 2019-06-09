"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.NodeSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    depth: Number,
    name: String,
    json: String,
    parents: [mongoose.Schema.Types.ObjectId],
    children: [mongoose.Schema.Types.ObjectId]
});
exports.Node = mongoose.model("Nodes", exports.NodeSchema);
//# sourceMappingURL=nodes.js.map