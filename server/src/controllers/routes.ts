import { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { AuthenticationController } from "./authentication";
import { UserModel } from "./../database"
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
import { AuthenticationConfig } from "src/config/autentication.config";
routes.post("/coursebuilder/", function(req: Request, res: Response) {
    const data = req.body;
    const temp = new Course({
        name: data.coursename,
        nodes: data.nodes
    });
    temp.save();
    try {
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
    } catch (e) {
        console.log(e);
    }


    res.end("" + temp._id);
})


routes.post("/auth/verifyUser/", function(req: Request, res: Response){
    const username = req.body.username || "";
    const password = req.body.password || "";
    console.log("[Routes:Auth] VerifyUser | Username: " + username + ", Password: " + password);
    AuthenticationController.authenticateUsernamePassword(username, password, (isValid: boolean, user: UserModel) => {
        console.log("[Routes:Auth] isValid: " + isValid + ", user: " + user || "");
        if(isValid) {
            // Return with a JWT token, set cookies too
            const token = AuthenticationController.generateJWT(user.username, user.accessLevel);
            const auth = AuthenticationController.authenticateJWT(token);
            // Set all JWT cookies
            res.cookie("jwt", token, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) , httpOnly: true, signed: true })
            res.cookie("username", user.username, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
            res.cookie("accessLevel", user.accessLevel, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
            // Return success
            res.json({
                isValid: true,
                status: "Success",
                token,
                tokenInformation: auth,
                time: Date.now()
            })
        } else {
            // Wipe jwt cookie for user, just incase its malicious attempts
            res.cookie("jwt", "", { httpOnly: true, signed: true })
            res.cookie("username", "", { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
            res.cookie("accessLevel", "", { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
            // Return failure
            res.json({
                isValid: false,
                status: "Failure",
                time: Date.now()
            })
        }
    })
});

routes.post("/auth/verifyToken/", function(req: Request, res: Response){
    const token = req.signedCookies["jwt"];
    if(!token && token != undefined && token != null) {
        res.json({
            isValid: false,
            status: "Failure, no JWT cookie present!",
            time: Date.now()
        })
        return;
    }
    const auth = AuthenticationController.authenticateJWT(token);
    if(auth.valid) {
        // Generate a new cookie for the user
        const token = AuthenticationController.generateJWT(auth.username, auth.accessLevel);
        res.cookie("jwt", token, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) , httpOnly: true, signed: true })
        res.cookie("username", auth.username, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
        res.cookie("accessLevel", auth.accessLevel, { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
        res.json({
            isValid: true,
            status: "Success",
            token,
            tokenInformation: auth,
            time: Date.now()
        })
    } else {
        // Wipe jwt cookie for user, just incase its malicious attempts
        res.cookie("jwt", "", { httpOnly: true, signed: true })
        res.cookie("username", "", { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
        res.cookie("accessLevel", "", { maxAge: AuthenticationController.DaysFromNowInMilliseconds(30) })
        res.json({
            isValid: false,
            status: "Failure",
            time: Date.now()
        })
    }
});

routes.post("/auth/users/create", function(req: Request, res: Response){
    const username = req.body.username || "";
    const password = req.body.password || "";
    const accessLevel = req.body.accessLevel || "";
    AuthenticationController.createUser(username, password, accessLevel);
    res.json({
        status: "Did Accept new user"
    })
});


routes.post("/graph/", function(req: Request, res: Response) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff: Buffer) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    })
})

export default routes;