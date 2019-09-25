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
const courses_1 = require("./../database/courses");
const pages_1 = require("./../database/pages");
routes.post("/CourseCreate/", function (req, res) {
    const data = req.body;
    let pages = [];
    for (let i = 0; i < data.amount; i++) {
        let temp = data.data["" + i];
        let image = temp['image'];
        delete temp['image'];
        console.log(temp);
        pages.push(new pages_1.Page({
            name: data.data["" + i]['title'],
            content: JSON.stringify(data.data["" + i]),
            image: image
        }));
    }
    pages.forEach(element => {
        element.save();
    });
    new courses_1.Course({
        name: data.coursename,
        pages: pages,
    }).save();
    res.end();
});
routes.post("/graph/", function (req, res) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map