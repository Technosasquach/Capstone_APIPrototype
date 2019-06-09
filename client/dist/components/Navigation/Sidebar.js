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
var Button_1 = require("./Button");
require("./Sidebar.less");
var sidebar = /** @class */ (function (_super) {
    __extends(sidebar, _super);
    function sidebar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            path: _this.props.pather,
            highlight: Array(4).fill(null),
        };
        return _this;
    }
    sidebar.prototype.sethighlight = function () {
        switch (this.state.path) {
            case 0:
                this.state.highlight[0] = true;
                this.state.highlight[1] = false;
                this.state.highlight[2] = false;
                this.state.highlight[3] = false;
                break;
            case 1:
                this.state.highlight[0] = false;
                this.state.highlight[1] = true;
                this.state.highlight[2] = false;
                this.state.highlight[3] = false;
                break;
            case 2:
                this.state.highlight[0] = false;
                this.state.highlight[1] = false;
                this.state.highlight[2] = true;
                this.state.highlight[3] = false;
                break;
            case 3:
                this.state.highlight[0] = false;
                this.state.highlight[1] = false;
                this.state.highlight[2] = false;
                this.state.highlight[3] = true;
                break;
        }
    };
    sidebar.prototype.render = function () {
        this.sethighlight();
        return (React.createElement("div", null,
            React.createElement("div", { className: "box" },
                React.createElement("div", { className: "sidebar" },
                    React.createElement(Button_1.default, { pather: "/", comp: "Dashboard", highlight: this.state.highlight[0] }),
                    React.createElement(Button_1.default, { pather: "/a", comp: "Example 1", highlight: this.state.highlight[1] }),
                    React.createElement(Button_1.default, { pather: "/b", comp: "Example 2", highlight: this.state.highlight[2] }),
                    React.createElement(Button_1.default, { pather: "/c", comp: "Example 3", highlight: this.state.highlight[3] })),
                React.createElement("div", { className: "main" }, this.props.children))));
    };
    return sidebar;
}(React.Component));
exports.default = sidebar;
//# sourceMappingURL=Sidebar.js.map