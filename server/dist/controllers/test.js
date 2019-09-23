"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./../database");
exports.tester = function () {
    const a = new database_1.Course({
        pages: [{ test: "HAPPY TIME" }],
        content: ["BUT WHY CAN YOU"]
    });
    a.save();
    console.log("yeet");
};
//# sourceMappingURL=test.js.map