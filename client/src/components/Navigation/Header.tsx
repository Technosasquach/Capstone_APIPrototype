import * as React from "react";
import { Link } from "react-router-dom";

import "./Header.less";

export default class Root extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div className="navbar">
                    <div/>
                    <div className="right">
                        <Link to="/"><span>Profile</span></Link>
                        <Link to="/a"><span>Notifications</span></Link>
                        <Link to="/b"><span>Help</span></Link>
                        <Link to="/c"><span>Tutorial</span></Link>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}