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
var react_router_dom_1 = require("react-router-dom");
require("./Navbar.less");
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root(props) {
        return _super.call(this, props) || this;
    }
    Root.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "navbar" },
                React.createElement("div", { className: "left" },
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("img", { src: "http://via.placeholder.com/20x20" })),
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("span", null, "Syneng|Learn"))),
                React.createElement("div", { className: "right" },
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("span", null, "Profle")),
                    React.createElement(react_router_dom_1.Link, { to: "/a" },
                        React.createElement("span", null, "Notifications")),
                    React.createElement(react_router_dom_1.Link, { to: "/b" },
                        React.createElement("span", null, "Help")),
                    React.createElement(react_router_dom_1.Link, { to: "/c" },
                        React.createElement("span", null, "Tutorial")))),
            this.props.children));
    };
    return Root;
}(React.Component));
exports.default = Root;
//# sourceMappingURL=Navbar.js.map