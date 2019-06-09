import { Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
const routes = Router();

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

routes.get("/api/", function(req: Request, res: Response) {
    res.json({
        message: "The API service is alive."
    });
});

routes.post("/fuckingmassivegraphdeffile/", function(req: Request, res: Response) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff: Buffer) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    })
})

export default routes;