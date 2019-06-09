import { Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
const routes = Router();

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

import {scrape} from './../controllers/scraper';
routes.get("/api/", function(req: Request, res: Response) {
    scrape.scrapeWholeAPI();
    res.json({
        message: "Scraping Database."
    });
});

routes.post("/graph/", function(req: Request, res: Response) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff: Buffer) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    })
})

import { beginQuery, queryAll, beginSearch} from "./../controllers/query";
routes.get("/Data/", (req: Request, res: Response) => {
    beginQuery.then(e => {
        res.json({ data: queryAll});
    })
});

routes.get("/Data/Search/", (req: Request, res: Response) => {
    beginSearch(req.query.search).then(e => {
        res.json({data: e});
    });
});

export default routes;