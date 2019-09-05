import * as React from "react";

import { Menu, Button, Icon } from 'antd';


export default class PageSelector extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Menu
                style={{backgroundColor: "#EAEAEA"}}
                defaultSelectedKeys={['1']}
                mode="inline"
                >
                <Menu.Item key="1">OEPISRV<Icon style={{marginLeft: "180px"}} type="plus"/></Menu.Item>
                <Menu.Item key="2">Configuration<Icon style={{marginLeft: "148px"}} type="plus"/></Menu.Item>
                <Menu.Item key="3">Database1<Icon style={{marginLeft: "168px"}} type="plus"/></Menu.Item>
                <Menu.Item key="4">Origin_RTO_dev<Icon style={{marginLeft: "135px"}} type="plus"/></Menu.Item>
                <Menu.Item key="5">Origin_RTO_dev_wip<Icon style={{marginLeft: "106px"}} type="plus"/></Menu.Item>
                <Menu.Item key="6">OriginAF<Icon style={{marginLeft: "178px"}} type="plus"/></Menu.Item>
                <Menu.Item key="7">pcp_example<Icon style={{marginLeft: "153px"}} type="plus"/></Menu.Item>
                <Menu.Item key="8">
                    <Button type="dashed" style={{ width: '100%', height: '100%' }}>
                        <Icon type="plus" /> Add Page
                    </Button>
                </Menu.Item>
                </Menu>
            </div>
        );
    }
}