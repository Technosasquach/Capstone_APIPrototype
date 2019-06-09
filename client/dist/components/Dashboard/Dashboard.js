"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
//import axios from "axios";
//import * as OSIConfig from "./../../config/osiPiDetails";
require("./Dashboard.less");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            resp: ""
        };
        return _this;
    }
    Dashboard.prototype.componentDidMount = function () {
        // console.log("[API] Requesting data");
        // axios.get(OSIConfig.default.url, {
        //     url: OSIConfig.default.url,
        //     withCredentials: true,
        //     auth: {
        //         username: OSIConfig.default.credentials.username,
        //         password: OSIConfig.default.credentials.password
        //     }
        // }).then((rep: any) => {
        //     console.log("[API] Data received");
        //     console.log(JSON.stringify(rep));
        //     this.setState({resp: rep});
        // });
    };
    Dashboard.prototype.render = function () {
        return (React.createElement("div", { className: "dashboardContainer" },
            React.createElement("h1", null, "Dashboard"),
            React.createElement("hr", null),
            React.createElement("p", null, JSON.stringify(this.state.resp.data, null, "\t"))));
    };
    return Dashboard;
}(React.Component));
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map