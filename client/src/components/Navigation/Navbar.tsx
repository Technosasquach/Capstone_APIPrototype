
import * as React from "react";
import { Link } from "react-router-dom";

import "./Navbar.less";

export default class Root extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="left">
                        <Link to="/"><img src="http://via.placeholder.com/20x20"></img></Link>
                        <Link to="/"><span>Syneng|Learn</span></Link>
                    </div>
                    <div className="right">
                        <Link to="/"><span>Profle</span></Link>
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
