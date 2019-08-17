import * as React from "react";

import "./SideBar.less";
//import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default class SideBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        //cache state
        this.state = {
            openKeys: ['sub1'],
        };
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    onOpenChange = (openKeys: any) => {
        const latestOpenKey = openKeys.find((key: any) => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };

    render() {
        return (
            <div className={this.props.sidestate ? "sidebar" : "sidebargone"}>
                <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ width: 256 }}>
                    <SubMenu key="sub1" title={
                        <span>
                            <Icon type="book" />
                            <span>Bookmarks</span>
                        </span>
                    }>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                        <span>
                        <Icon type="unordered-list" />
                        <span>Directory</span>
                        </span>
                    }>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={
                        <span>
                        <Icon type="experiment" />
                        <span>Exam</span>
                        </span>
                    }>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
