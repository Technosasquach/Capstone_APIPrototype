"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.AccountSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: false,
        default: Date.now
    },
    username: {
        type: String,
        unique: false,
        required: false
    },
    firstname: {
        type: String,
        unique: false,
        required: false
    },
    lastname: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    position: {
        type: String,
        unique: false,
        required: false
    },
    phone: {
        type: String,
        unique: false,
        required: false
    }
});
exports.Account = mongoose.model("Account", exports.AccountSchema);
//# sourceMappingURL=account.js.map