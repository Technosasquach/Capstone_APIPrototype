import { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
const routes = Router();

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

import {scrape} from './../controllers/scraper';
routes.get("/api/", function(req: Request, res: Response) {
    console.log("Test");
    //scrape.scrapeWholeAPI();
    res.json({
        message: "Scraping Database."
    });
});

import {Course} from './../database/courses'
import {Page} from './../database/pages'
routes.post("/CourseCreate/", function(req: Request, res: Response) {
    const data = req.body;
    let pages = [];

    for(let i = 0; i < data.amount; i++) {
        let temp = data.data["" + i];
        let image = temp['image'];
        delete temp['image'];
        console.log(temp);
        pages.push(new Page({
            name: data.data["" + i]['title'],
            content: JSON.stringify(temp),
            image: image
        }));
    }
    pages.forEach(element => {
        element.save();
    });
    
    new Course({
        name: data.coursename,
        pages: pages,
    }).save();

    res.end();
})

routes.post("/graph/", function(req: Request, res: Response) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff: Buffer) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    })
})

export default routes;