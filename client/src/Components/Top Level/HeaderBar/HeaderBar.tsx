import * as React from "react";

import "./HeaderBar.less";
import 'antd/dist/antd.css';

import Logo from './Logo';
import Nav from './NavArea';
import SearchBar from './SearchBar';
import User from './UserDetails';

export default class HeaderBar extends React.Component<any, any> {

    render() {
        return (
            <div className="navbar">
                <Logo/>
                <Nav/>
                <SearchBar/>
                <User/>
            </div>
        );
    }
}
