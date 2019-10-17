import * as React from "react";

import "./ContentArea.less";
import 'antd/dist/antd.css';
export default class ContentArea extends React.Component<any, any> {

    render() {
        return (
            <div className="container">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
