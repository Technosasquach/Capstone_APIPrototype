"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inital server setup
// ----------------------------------------------------------------------------
const express = require("express");
const http = require("http");
const app = express();
exports.App = app;
const server = http.createServer(app);
const io = require("socket.io")(server);
exports.Server = server;
// Dependencies
// ----------------------------------------------------------------------------
const mongoose = require("mongoose");
// import * as passport from "passport";
// export const Passport = passport;
// Utilities
// ----------------------------------------------------------------------------
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const lusca = require("lusca");
// import * as mongo from "connect-mongo";
const path = require("path");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
// MongooseDB
// ----------------------------------------------------------------------------
const autentication_config_1 = require("./config/autentication.config");
// 
const mongoURL = "mongodb://" + autentication_config_1.MongoDBConfig.username + ":" + autentication_config_1.MongoDBConfig.password + "@" + autentication_config_1.MongoDBConfig.host + ":27017/synlern?authSource=admin";
console.log("MongoDB connecting too: " + mongoURL);
mongoose.connect(mongoURL, { useNewUrlParser: true });
// mongoose.set('debug', true); // turn on debug
mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    if (error)
        console.log("Mongo Error: " + error);
    process.exit();
});
mongoose.set('useFindAndModify', false);
// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
// Cookie content decoding and parsing
const autentication_config_2 = require("./config/autentication.config");
app.use(cookieParser(autentication_config_2.AuthenticationConfig.cookieSecret));
// Allows CORS
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// Pretty prints in console
app.use(errorHandler());
app.use(logger("dev"));
// Static content
app.use(express.static(path.join(__dirname, "./../../client/dist")));
app.use(express.static(path.join(__dirname, "./../public/")));
// Prod vs Dev code and display
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
}
else {
    app.locals.pretty = true;
}
// Setting up the routes for the rest of the application
const routes_1 = require("./controllers/routes");
app.use("/", routes_1.default);
// Setting up GraphQL
const graphql_1 = require("./controllers/graphql");
app.use("/", graphql_1.default);
app.get("/public/bgImage.jpeg", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../public/serveimageA2.jpeg"));
});
app.get("/public/favicon.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../public/favicon.png"));
});
app.get("/**/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../../client/dist/index.html"));
});
//# sourceMappingURL=core.js.map