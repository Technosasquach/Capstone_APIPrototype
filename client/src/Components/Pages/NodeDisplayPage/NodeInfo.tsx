import * as React from "react";

import "./NodeInfo.less";
import { Breadcrumb, Table } from 'antd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
     }
  ];
  const dataParent = [
    {
      key: '1',
      name: 'Parent',
    },
  ];
  const dataChild = [
    {
      key: '1',
      name: 'Child 1',
    },
    {
        key: '2',
        name: 'Child 2',
    },
  ];

export default class NodeInfo extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Parent Parent</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Parent</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>PCP Pumps</Breadcrumb.Item>
                </Breadcrumb>
                <h1>PCP Pumps (updates title for node)</h1>
                <hr/>
                <h2>Related Nodes</h2>
                <h3>Parent</h3>
                <Table columns={columns} dataSource={dataParent} />
                <h3>Children</h3>
                <Table columns={columns} dataSource={dataChild} />
            </div>
        );
    }
}