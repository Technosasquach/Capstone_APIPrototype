"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const routes = express_1.Router();
routes.post("/", (req, res) => {
    res.json({ message: "API is active" });
});
routes.get("/api/", function (req, res) {
    console.log("Test");
    //scrape.scrapeWholeAPI();
    res.json({
        message: "Scraping Database."
    });
});
const index_1 = require("./../database/index");
routes.post("/coursebuilder/", function (req, res) {
    const data = req.body;
    const temp = new index_1.Course({
        name: data.coursename,
        nodes: data.nodes
    });
    temp.save();
    try {
        let node = 0;
        data.data.forEach((element) => {
            let order = 0;
            element.forEach((items) => {
                new index_1.Information({
                    text: items.content,
                    image: items.imageData,
                    nodeId: data.nodes[node],
                    order: order++,
                }).save();
            });
            node++;
        });
    }
    catch (e) {
        console.log(e);
    }
    res.end("" + temp._id);
});
routes.post("/graph/", function (req, res) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map