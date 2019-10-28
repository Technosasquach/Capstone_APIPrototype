import * as React from "react";

import "./HeaderBar.less";
import 'antd/dist/antd.css';
import { AuthContext } from "./../../Utility/AuthProvider";
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import User from './UserDetails';

export default class HeaderBar extends React.Component<any, any> {

    render() {
        return (
            <div className="navbar">
                
                <h1><img src="/public/favicon.png"/>Syn|Lern</h1>
                <AuthContext.Consumer>
                    {Consumer => (
                        <div > {/* className={Consumer.isAdmin ? "threeButton" : "twoButton"}> */}
                            <Button type="primary" size="large"><Link to="/">Home</Link></Button>
                            <Button type="primary" size="large"><Link to="/tree">Syn|Tree</Link></Button>
                            {/* <Button type="primary" size="large"><Link to="/">Courses</Link></Button> */}
                            {Consumer.isAdmin && <Button type="primary" size="large"><Link to="/Admin">Admin</Link></Button>}
                        </div>
                    )}
                </AuthContext.Consumer>
                <SearchBar/>
                <User/>
            </div>
        );
    }
}
