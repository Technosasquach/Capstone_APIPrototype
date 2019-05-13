import * as React from "react";
import Button from "./Button";

import "./Sidebar.less";


export default class sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
            path: this.props.pather,
            highlight: Array(4).fill(null),
         };
    }

    sethighlight() {
        switch(this.state.path) {
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
    }

    render() {
        this.sethighlight();
        return (
            <div>
                <div className="box">
                    <div className="sidebar">
                    <Button pather="/" comp="Dashboard" highlight={this.state.highlight[0]}/>
                    <Button pather="/a" comp="Example 1" highlight={this.state.highlight[1]}/>
                    <Button pather="/b" comp="Example 2" highlight={this.state.highlight[2]}/>
                    <Button pather="/c" comp="Example 3" highlight={this.state.highlight[3]}/>
                    </div>
                    <div className="main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
