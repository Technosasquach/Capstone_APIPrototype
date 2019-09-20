import * as React from "react";

import "./NavArea.less";
import { Button } from 'antd';

export default class NavArea extends React.Component<any, any> {

    render() {
        return (
            <div className="navarea">
                <Button type="primary" size="large" href="/">node view</Button>
                <Button type="primary" size="large" href="/learning">learning</Button>
                <Button type="primary" size="large" href="/account">account</Button>
            </div>
        );
    }
}
