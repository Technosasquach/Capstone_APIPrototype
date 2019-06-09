import * as React from "react";
import { Link } from "react-router-dom";

import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

import "./SideBar.less";

export default class Sidebar extends React.Component<any, any> {

    checkDir() {
        switch(this.props.location.pathname){
            case '/':
                return ['0'];
            case '/a':
                return ['1'];
            case '/b':
                return ['2'];
            case '/c':   
                return ['3'];
            case '/d':   
                return ['4']; 
            default:
                return ['0']; 
        }
    }

    render() {
        return (
            <Sider className='sidebar'>
                <div className="title">
                    <Link to="/"><span>Syneng|Learn</span></Link>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.checkDir()} className="menubar">
                    <Menu.Item key="0">
                        <Link to="/">
                            <Icon type="branches" />
                            <span className="nav-text">PI Directory-Tree</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/a">
                            <Icon type="bar-chart" />
                            <span className="nav-text">Graph Viewer</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}