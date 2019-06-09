import * as React from "react";
import Button from "./Button";

import Icon from 'antd/lib/icon';

import "./Sidebar.less";

export default class sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>            
                <div className="box">
                    <div className="sidebar">
                    <Button pather="/" text="Dashboard" index={0}><Icon type="home" theme="filled" /></Button>
                    <Button pather="/a" text="Example 1" index={1}/>
                    <Button pather="/b" text="Example 2" index={2}/>
                    <Button pather="/c" text="Example 3" index={3}/>
                    
                    </div>
                    <div className="main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
