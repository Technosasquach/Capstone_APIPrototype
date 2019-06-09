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
//import * as OSIConfig from "./../config/osiPiDetails";
require("./Example_1.less");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        return _super.call(this, props) || this;
    }
    Dashboard.prototype.render = function () {
        return (React.createElement("div", { className: "dashboardContainer" },
            React.createElement("h1", null, "Example_3"),
            React.createElement("hr", null)));
    };
    return Dashboard;
}(React.Component));
exports.default = Dashboard;
//# sourceMappingURL=Example_1.js.map