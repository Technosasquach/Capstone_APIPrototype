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
require("./Example_3.less");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        return _super.call(this, props) || this;
    }
    Dashboard.prototype.render = function () {
        return (React.createElement("div", { className: "dashboardContainer" },
            React.createElement("h1", null, "Example_1"),
            React.createElement("div", { className: "sl-sideNav", id: "sidebar-wrapper" },
                React.createElement("div", { className: "sidebar-heading bg-light sl-logo" }, "Syneng|Learn "),
                React.createElement("div", { className: "list-group list-group-flush" },
                    React.createElement("a", { className: "list-group-item active list-group-item-action" },
                        React.createElement("i", { className: "fas fa-desktop mr-3" }),
                        "Dashboard"),
                    React.createElement("a", { className: "list-group-item list-group-item-action" },
                        React.createElement("i", { className: "fas fa-sitemap mr-3" }),
                        "Equipment Detail"),
                    React.createElement("a", { className: "list-group-item list-group-item-action" },
                        React.createElement("i", { className: "fas fa-project-diagram mr-3" }),
                        "Pathways"),
                    React.createElement("a", { className: "list-group-item list-group-item-action" },
                        React.createElement("i", { className: "fas fa-graduation-cap mr-3" }),
                        "Course"),
                    React.createElement("a", { className: "list-group-item list-group-item-action" },
                        React.createElement("i", { className: "fas fa-user mr-3" }),
                        "Profile"),
                    React.createElement("a", { className: "list-group-item list-group-item-action" },
                        React.createElement("i", { className: "fas fa-cog mr-3" }),
                        "Status")))));
    };
    return Dashboard;
}(React.Component));
exports.default = Dashboard;
//# sourceMappingURL=Example_3.js.map