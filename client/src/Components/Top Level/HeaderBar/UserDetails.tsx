import * as React from "react";

import "./UserDetails.less";
import { Button, Icon } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class SearchBar extends React.Component<any, any> {
    Logout = () => {
        axios.get("/logout/").then(res => {
            console.log(res);
            window.location.replace('/')
        });
    }

    render() {
        return (
            <div className="userdetails">
                <Button type="primary" shape="circle" ><Link to="/account"><Icon type="user"/></Link></Button>
                <Button type="primary" shape="circle" icon="setting" onClick={this.Logout}></Button>
            </div>
        );
    }
}
