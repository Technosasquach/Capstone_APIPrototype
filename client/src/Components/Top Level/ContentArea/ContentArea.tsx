import * as React from "react";

import "./ContentArea.less";
import 'antd/dist/antd.css';
import { Icon, Button } from 'antd';
export default class ContentArea extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        //cache state
    }

    render() {
        return (
            <div>
                <div className="content">
                    <Button type="primary" onClick={this.props.toggler} style={{ marginBottom: 16 }}>
                        <Icon type={this.props.sidestate ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    {this.props.children}
                </div>
            </div>

        );
    }
}
