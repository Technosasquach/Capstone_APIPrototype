import { Router, Request, Response, NextFunction } from "express";
const routes = Router();

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

routes.get("/api/", function(req: Request, res: Response) {
    res.json({
        message: "The API service is alive."
    });
});

export default routes;