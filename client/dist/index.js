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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("./components/Navigation/Navbar");
var Dashboard_1 = require("./components/Dashboard/Dashboard");
var Example_1_1 = require("./components/Example_1/Example_1");
var Example_2_1 = require("./components/Example_2/Example_2");
var Example_3_1 = require("./components/Example_3/Example_3");
var Sidebar_1 = require("./components/Navigation/Sidebar");
require("./public/bootstrap.min.css");
require("./index.less");
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.componentDidMount = function () {
        console.log("[CORE] React has loaded");
    };
    Root.prototype.componentWillMount = function () {
        console.log("[CORE] React will load");
    };
    Root.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(Navbar_1.default, null,
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true, render: function (routeProps) { return (React.createElement(Sidebar_1.default, __assign({}, routeProps, { pather: 0 }),
                        React.createElement(Dashboard_1.default, null))); } }),
                React.createElement(react_router_dom_1.Route, { path: "/a", exact: true, render: function (routeProps) { return (React.createElement(Sidebar_1.default, __assign({}, routeProps, { pather: 1 }),
                        React.createElement(Example_1_1.default, null))); } }),
                React.createElement(react_router_dom_1.Route, { path: "/b", exact: true, render: function (routeProps) { return (React.createElement(Sidebar_1.default, __assign({}, routeProps, { pather: 2 }),
                        React.createElement(Example_2_1.default, null))); } }),
                React.createElement(react_router_dom_1.Route, { path: "/c", exact: true, render: function (routeProps) { return (React.createElement(Example_3_1.default, __assign({}, routeProps))); } }))));
    };
    return Root;
}(React.Component));
exports.default = Root;
react_dom_1.render(React.createElement(Root, null), document.getElementById("root"));
//# sourceMappingURL=index.js.map