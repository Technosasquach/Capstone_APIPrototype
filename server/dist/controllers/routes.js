"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const routes = express_1.Router();
routes.post("/", (req, res) => {
    res.json({ message: "API is active" });
});
const scraper_1 = require("./../controllers/scraper");
routes.get("/api/", function (req, res) {
    console.log("Test");
    scraper_1.scrape.scrapeWholeAPI();
    res.json({
        message: "Scraping Database."
    });
});
routes.post("/graph/", function (req, res) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map