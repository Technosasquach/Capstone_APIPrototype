import * as React from "react";

import "./HeaderBar.less";
import 'antd/dist/antd.css';

export default class HeaderBar extends React.Component<any, any> {

    render() {
        return (
            <div className="navbar">
                <h1>Header</h1>
            </div>
        );
    }
}
