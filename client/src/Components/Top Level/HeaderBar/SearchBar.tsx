import * as React from "react";

import "./SearchBar.less";
import { Input } from 'antd';

export default class SearchBar extends React.Component<any, any> {

    render() {
        return (
            <div className="searcharea">
                <Input placeholder="Search" />
            </div>
        );
    }
}
