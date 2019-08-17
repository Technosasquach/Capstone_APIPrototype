import * as React from "react";

import "./SideBar.less";
import { Link } from "react-router-dom";

export default class SideBar extends React.Component<any, any> {

    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">Node Display Page</Link>
                    </li>
                    <li>
                        <Link to="/learning">Learning Page</Link>
                    </li>
                    <li>
                        <Link to="/exam">Exam Page</Link>
                    </li>
                    <li>
                        <Link to="/account">Account Page</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In Page</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
