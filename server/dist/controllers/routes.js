"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
routes.post("/", (req, res) => {
    res.json({ message: "API is active" });
});
routes.get("/api/", function (req, res) {
    res.json({
        message: "The API service is alive."
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map