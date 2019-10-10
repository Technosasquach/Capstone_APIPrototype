"use strict";
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
const checkType = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return true;
        }
    }
    return false;
};
const getType = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return types[i].id;
        }
    }
};
const getIndex = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return i;
        }
    }
};
routes.post("/pagebuilder/", authenticateConnection, function (req, res) {
    const data = req.body;
    if (data.auth.accessLevel === "ADMIN") {
        if (data.text !== "" && data.text !== undefined) {
            if (!checkType(data.ids, "text")) {
                new index_1.Information({
                    nodeId: data.id,
                    type: "text",
                    data: data.text
                }).save();
            }
        }
        else {
            if (checkType(data.ids, "text")) {
                index_1.Information.findByIdAndDelete(getType(data.ids, "text")).catch(res => console.log(res));
                data.ids.splice(getIndex(data.ids, "text"), 1);
            }
        }
        if (JSON.parse(data.images).length > 0 && data.images !== undefined) {
            if (!checkType(data.ids, "images")) {
                new index_1.Information({
                    nodeId: data.id,
                    type: "images",
                    data: data.images
                }).save();
            }
        }
        else {
            if (checkType(data.ids, "images")) {
                index_1.Information.findByIdAndDelete(getType(data.ids, "images")).catch(res => console.log(res));
                data.ids.splice(getIndex(data.ids, "images"), 1);
            }
        }
        data.ids.forEach((element) => {
            console.log("update");
            index_1.Information.findByIdAndUpdate(element.id, {
                id: element.id,
                type: element.type,
                data: (element.type === "text" ? data.text : data.images)
            }).catch(res => console.log(res));
        });
        res.end();
    }
    else {
        res.status(401).json({ status: 'Access Denied, Invalid Access' });
    }
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
            const token = authentication_1.AuthenticationController.generateJWT(user.username, user.accessLevel);
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            // Set all JWT cookies
            res.cookie("jwt", token, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30), signed: true });
            res.cookie("username", user.username, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
            res.cookie("accessLevel", user.accessLevel, { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
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
        const token = authentication_1.AuthenticationController.generateJWT(auth.username, auth.accessLevel);
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
    }
    else {
        // Wipe jwt cookie for user, just incase its malicious attempts
        res.cookie("jwt", "", { httpOnly: true, signed: true });
        res.cookie("username", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
        res.cookie("accessLevel", "", { maxAge: authentication_1.AuthenticationController.DaysFromNowInMilliseconds(30) });
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
    console.log(username);
    console.log(req.body);
    authentication_1.AuthenticationController.createUser(username, password, accessLevel);
    res.json({
        status: "Did Accept new user"
    });
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