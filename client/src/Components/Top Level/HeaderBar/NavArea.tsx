import * as React from "react";

import "./NavArea.less";
import { Button } from 'antd';

export default class NavArea extends React.Component<any, any> {

    render() {
        return (
            <div className="navarea">
                <Button type="primary" size="large" href="/">Home</Button>
                <Button type="primary" size="large" href="/">Home</Button>
                <Button type="primary" size="large" href="/">Home</Button>
            </div>
        );
    }
}
