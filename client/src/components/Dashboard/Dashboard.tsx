
import * as React from "react";



import axios from "axios";

import 'antd/dist/antd.css';
import { Table, Spin } from 'antd';

import "./Dashboard.less";
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

const initstate = {
    data: [],
    cached: false,
    loader: false,
    searched: false,
    savedata: [],
};

export default class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        //cache state
        this.state = localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState") || '{}') : initstate;
    }

    componentWillUnmount() {
        // Remember state for the next mount
        localStorage.setItem('appState', JSON.stringify(this.state));
      }

    componentDidMount() {
        if(!this.state.cached){
            //axios.get("http://localhost:3000/Data/Search/?search=field").then(data => this.setState({data: data.data['data'], cached: true, loader: true})); 
            axios.get("http://localhost:3000/Data/").then(data => this.setState({data: data.data['data'], cached: true, loader: true})); 
        }
    }

    render() {     
        return (
            <div className="dashboardContainer">
                <h1 style={{textAlign: 'center'}}>PI Directory</h1>
                <hr/>
                <Search placeholder="input search text" onSearch={e => {
                    //this.setState({expanded: ['0', '0-5', '0-5-0', '0-5-0-0', '0-5-0-0-0', '0-5-1', '0-5-1-0', '0-5-1-0-0']})
                    axios.get("http://localhost:3000/Data/Search/?search=" + e).then(data => this.setState({savedata: data.data['data'], cached: true, searched: true})); 
                }} enterButton />
                <hr/>


                {this.state.searched ? 
                 (<Table columns={columns} scroll = {{y: 600}} dataSource={this.state.savedata} defaultExpandedRowKeys={["0-0"]} />)
                 : 
                this.state.loader ? (<Table columns={columns} scroll = {{y: 600}} dataSource={this.state.data} defaultExpandedRowKeys={["0-0"]} expandedRowKeys={this.state.expanded} />) : <div style={{textAlign: "center"}}><Spin/></div>}
            
            </div>
        );
    }
}