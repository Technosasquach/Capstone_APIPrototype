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

import {Course, Information} from './../database/index'
routes.post("/coursebuilder/", function(req: Request, res: Response) {
    const data = req.body;
    new Course({
        name: data.coursename,
        nodes: data.nodes
    }).save();

    let node = 0;
    data.data.forEach((element: any) => {
        let order = 0;
        element.forEach((items: any) => {
            new Information({
                text: items.content,
                image: items.imageData,
                nodeId: data.nodes[node],
                order: order++,
            }).save();
        })
        node++;
    });

    res.end();
})

routes.post("/graph/", function(req: Request, res: Response) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff: Buffer) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    })
})

export default routes;