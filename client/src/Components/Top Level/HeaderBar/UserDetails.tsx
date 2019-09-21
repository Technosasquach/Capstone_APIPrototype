import * as React from "react";

import "./UserDetails.less";
import { Button } from 'antd';

export default class SearchBar extends React.Component<any, any> {

    render() {
        return (
            <div className="userdetails">
                <Button type="primary" shape="circle" icon="user" href="/"/>
                <Button type="primary" shape="circle" icon="setting" href="/account"/>
            </div>
        );
    }
}
