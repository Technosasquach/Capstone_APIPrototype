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
require("./Button.less");
var sidebar = /** @class */ (function (_super) {
    __extends(sidebar, _super);
    function sidebar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            path: _this.props.pather,
            comp: _this.props.comp,
            highlight: _this.props.highlight,
        };
        return _this;
    }
    sidebar.prototype.render = function () {
        if (this.state.highlight) {
            return (React.createElement("div", { className: "highlight" },
                React.createElement(react_router_dom_1.Link, { to: this.state.path },
                    React.createElement("span", { id: "sidebarEnabled" }, this.state.comp))));
        }
        else {
            return (React.createElement("div", { className: "nohighlight" },
                React.createElement(react_router_dom_1.Link, { to: this.state.path },
                    React.createElement("span", null, this.state.comp))));
        }
    };
    return sidebar;
}(React.Component));
exports.default = sidebar;
//# sourceMappingURL=Button.js.map