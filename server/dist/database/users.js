"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var EUserAuthLevel;
(function (EUserAuthLevel) {
    EUserAuthLevel["USER"] = "USER";
    EUserAuthLevel["OPERATOR"] = "OPERATOR";
    EUserAuthLevel["ADMIN"] = "ADMIN";
})(EUserAuthLevel = exports.EUserAuthLevel || (exports.EUserAuthLevel = {}));
exports.UserSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    },
    accessLevel: {
        type: String,
        unique: false,
        required: true
    },
    coursesTaken: [{
            type: String,
            unique: false,
            required: false
        }],
    coursesComplete: [{
            type: String,
            unique: false,
            required: false
        }],
    history: [{
            type: String,
            unique: false,
            required: false
        }]
});
exports.User = mongoose.model("User", exports.UserSchema);
//# sourceMappingURL=users.js.map