import * as React from "react";
import { Link } from "react-router-dom";

import "./Button.less";

export default class sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
            path: this.props.pather,
            comp: this.props.comp,
            highlight: this.props.highlight,
         };
    }

    

    render() {
       if(this.state.highlight) {
           return (
                <div className="highlight">
                    <Link to={this.state.path}><span id="sidebarEnabled">{this.state.comp}</span></Link>
                </div>
           );
       } else {
            return (
                <div className="nohighlight">
                    <Link to={this.state.path}><span>{this.state.comp}</span></Link>
                </div>
            );
       }
    }
}

