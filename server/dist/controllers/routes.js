"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const authentication_1 = require("./authentication");
const routes = express_1.Router();
routes.post("/", (req, res) => {
    res.json({ message: "API is active" });
});
routes.get("/api/", authenticateConnection, function (req, res) {
    console.log("Test");
    //scrape.scrapeWholeAPI();
    res.json({
        message: "Scraping Database."
    });
});
const ContentBuilder_1 = require("./ContentBuilder");
routes.post("/coursebuilder/", authenticateConnection, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        if (data.auth.accessLevel === "ADMIN") {
            const response = yield ContentBuilder_1.ContentController.BuildCourse(data.coursename, data.nodes, data.data, data.quizzes, data.images, data.ids);
            if (typeof (response) == "object") {
                res.end(res.json(response._id));
            }
            else {
                res.end("" + response);
            }
        }
        else {
            res.status(401).json({ status: 'Access Denied, Invalid Access' });
        }
    });
});
routes.post("/pagebuilder/", authenticateConnection, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        if (data.auth.accessLevel === "ADMIN") {
            const response = yield ContentBuilder_1.ContentController.BuildPage(data.text, data.images, data.ids, data.id);
            if (response == -1) {
                res.end("-1");
            }
            else {
                res.end();
            }
        }
        else {
            res.status(401).json({ status: 'Access Denied, Invalid Access' });
        }
    });
});
routes.get("/logout/", function (req, res) {
    res.cookie("jwt", "", { signed: true });
    res.cookie("username", "", { maxAge: Date.now() });
    res.cookie("accessLevel", "", { maxAge: Date.now() });
    res.cookie("id", "", { maxAge: Date.now() });
    res.redirect('/');
});
routes.post("/auth/verifyUser/", function (req, res) {
    const username = req.body["username"] || "";
    const password = req.body["password"] || "";
    console.log("[Routes:Auth] Req: " + JSON.stringify(req.body));
    console.log("[Routes:Auth] VerifyUser | Username: " + username + ", Password: " + password);
    authentication_1.AuthenticationController.authenticateUsernamePassword(username, password, (isValid, user) => {
        console.log("[Routes:Auth] isValid: " + isValid + ", user: " + user || "");
        if (isValid) {
            // Return with a JWT token, set cookies too
            const token = authentication_1.AuthenticationController.generateJWT(user.username, user.accessLevel, user.id);
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            // Set all JWT cookies
            res.cookie("jwt", token, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30), signed: true });
            res.cookie("username", user.username, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            res.cookie("accessLevel", user.accessLevel, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            res.cookie("id", user.id, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            // Return success
            res.json({
                isValid: true,
                status: "Success",
                token,
                tokenInformation: auth,
                time: Date.now()
            });
        }
        else {
            // Wipe jwt cookie for user, just incase its malicious attempts
            res.cookie("jwt", "", { signed: true });
            res.cookie("username", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            res.cookie("accessLevel", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            res.cookie("id", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            // Return failure
            res.json({
                isValid: false,
                status: "Failure",
                time: Date.now()
            });
        }
    });
});
routes.post("/auth/verifyToken/", function (req, res) {
    const token = req.signedCookies["jwt"];
    if (!token && token != undefined && token != null) {
        res.json({
            isValid: false,
            status: "Failure, no JWT cookie present!",
            time: Date.now()
        });
        return;
    }
    const auth = authentication_1.AuthenticationController.authenticateJWT(token);
    if (auth.valid) {
        // Generate a new cookie for the user
        const token = authentication_1.AuthenticationController.generateJWT(auth.username, auth.accessLevel, auth.userID);
        res.cookie("jwt", token, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30), signed: true });
        res.cookie("username", auth.username, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("accessLevel", auth.accessLevel, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("id", auth.userID, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.json({
            isValid: true,
            status: "Success",
            token,
            tokenInformation: auth,
            time: Date.now()
        });
    }
    else {
        // Wipe jwt cookie for user, just incase its malicious attempts
        res.cookie("jwt", "", { httpOnly: true, signed: true });
        res.cookie("username", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("accessLevel", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("id", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.json({
            isValid: false,
            status: "Failure",
            time: Date.now()
        });
    }
});
routes.post("/auth/users/create", function (req, res) {
    const username = req.body.username || "";
    const password = req.body.password || "";
    const accessLevel = req.body.accessLevel || "";
    const id = authentication_1.AuthenticationController.createUser(username, password, accessLevel);
    setTimeout(() => {
        const token = authentication_1.AuthenticationController.generateJWT(username, accessLevel, id);
        const auth = authentication_1.AuthenticationController.authenticateJWT(token);
        res.cookie("jwt", token, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30), signed: true });
        res.cookie("username", auth.username, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("accessLevel", auth.accessLevel, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.json({
            isValid: true,
            status: "Success",
            token,
            tokenInformation: auth,
            time: Date.now()
        });
    }, 1000);
});
routes.post("/graph/", authenticateConnection, function (req, res) {
    console.log("[Routes] API Triggered: MassiveGraphDefFile");
    fs.readFile(path.join(__dirname, "./../../../graph.json"), (err, buff) => {
        res.json(JSON.parse(buff.toString())); // Rehydrate the JSON and send to client
    });
});
exports.default = routes;
function authenticateConnection(req, res, next) {
    const token = req.signedCookies["jwt"];
    const auth = authentication_1.AuthenticationController.authenticateJWT(token);
    if (auth.valid) {
        req.body = Object.assign({}, req.body, { auth: auth });
        next();
    }
    else {
        res.status(401).json({ status: 'Access Denied, Invalid JWT Token' });
    }
}
//# sourceMappingURL=routes.js.map