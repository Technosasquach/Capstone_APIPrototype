import * as React from "react";

import "./SearchPage.less";

import { Table } from 'antd';

import Search from "antd/lib/input/Search";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'cate',
        key: 'cate',
        width: '15%',
    },
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        width:'60%',
    }
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      cate: "test",
      data: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      cate: "test",
      data: '10 Downing Street',
    },
  ];

export default class NodeDisplayPage extends React.Component<any, any> {

    render() {
        return (
            <div className="SearchPage">
                <h1 style={{textAlign: 'center'}}>Search Results</h1>
                <hr/>
                <Search placeholder="input search text" enterButton />
                <hr/>


                <Table columns={columns} scroll = {{y: 600}} dataSource={dataSource} defaultExpandedRowKeys={["0-0"]} />
            
            </div>
        );
    }
}