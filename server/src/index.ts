import { App, Server } from "./core";
import { scrape } from "./controllers/scraper";
// import * as NodalMemory from "./controllers/nodal";
import { NodalMemory } from "./controllers/nodal";
import { SystemSearch } from "./controllers/search";
import { KeyWordEngine } from "./controllers/keywords";
import { AuthenticationController, JWTPayload, JWTPayloadStandard } from "./controllers/authentication";
import { EUserAuthLevel } from "./database/users";
import * as jwt from "jsonwebtoken";

// Start Express server.
// ----------------------------------------------------------------------------
Server.listen(80, () => {
    console.log(("App is running at http://localhost:%d in %s mode"), 80, App.get("env"));
    console.log("Press CTRL-C to stop\n");

    // Starts scrape when server starts
    // scrape.scrapeWholeAPI();

    // Generates new node graph
    // new NodalMemory().generateNodeMap(); 
        // ENABLING THIS WILL CAUSE NPM RUN WATCH TO RESTART LOOP INFINITELY!
        // IT WILL ALSO NEVER ALLOW A RECOMPILE OF THE SERVER
        // MUST FORCE QUIT, OR RUN ONCE

    // Generates searchable set
    // 

    // const token = AuthenticationController.generateJWT("test", EUserAuthLevel.ADMIN);
    // console.log("JWT TOKEN: " + token)
    // console.log("AUTH JWT TOKEN: " + JSON.stringify(AuthenticationController.authenticateJWT(token)));

    // console.log("PASSWORD CRYPTO: password: helloWorld -> crypto: " + AuthenticationController.cryptoPassword("helloWorld"));

    // console.log("[Debug] Outputting all mounted routes");
    // App._router.stack.forEach(print.bind(undefined, []));

});

function print (path: any, layer: any) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(undefined, path.concat(split(layer.route.path))));
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(undefined, path.concat(split(layer.regexp))));
    } else if (layer.method) {
        console.log("%s /%s",
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join("/"));
    }
}

function split (thing: any) {
    if (typeof thing === "string") {
        return thing.split("/");
    } else if (thing.fast_slash) {
        return "";
    } else {
        const match = thing.toString()
            .replace("\\/?", "")
            .replace("(?=\\/|$)", "$")
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : "<complex:" + thing.toString() + ">";
    }
}