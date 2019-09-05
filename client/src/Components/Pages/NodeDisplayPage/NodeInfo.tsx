import * as React from "react";

import "./NodeInfo.less";
import { Breadcrumb, Table, Button } from 'antd';
import axios from 'axios'
import { Link } from "react-router-dom";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text:string, record:any) => <Link to={"/" + record.name}>{text}</Link>,
     }
  ];
const dataParent = [
  {
    key: '1',
    name: 'No Parents',
  },
];
const dataChild = [
  {
    key: 1,
    name: 'No Children',
  },
];

export default class NodeInfo extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      id: this.props.id,
      name: "Temp Title",
      childrenIDS: [] as string[],
      parentsIDS: [],
      childdata: dataChild,
      parentdata: dataParent,
    };

    this.beginQuery();
  }

  /**
   * beginQuery
   * Initates requests for data for specific node
   *
   * @memberof NodeInfo
   */
  beginQuery = async () => {
    let data:any = {};
    data['query'] = "query{node(id: \"" + this.state.id + "\"){name children parents}}\n\n";
    await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
      name: res.data['data']['node']['name'],
      childrenIDS: res.data['data']['node']['children'],
      parentIDS: res.data['data']['node']['parents'],
    }));
    this.childSet();
    this.parentSet();
  }

  /**
   * childSet
   * Gets all child element names and updates state to render them
   *
   * @memberof NodeInfo
   */
  childSet = async () => {
    let data:any = {};
    let names = [] as string[];

    for (let a = 0; a < this.state.childrenIDS.length; a++){
      data['query'] = "query{node(id: \"" + this.state.childrenIDS[a] + "\"){name}}\n\n";
      await axios.post("http://localhost:3000/graphql/", data).then(res => {
        names.push(res.data['data']['node']['name']);
      })
    }
    let key = 1;
    let content = [] as any[];
    names.forEach((element: string) => {
      content.push(this.setData(key, element));
      key++;
    });
    this.setState({
      childdata: content,
    })
  }

  /**
   * parentSet
   * Gets all parent element names and updates state to render them
   *
   * @memberof NodeInfo
   */
  parentSet = async () => {
    let data:any = {};
    let names = [] as string[];
    for (let a = 0; a < this.state.parentIDS.length; a++){
      data['query'] = "query{node(id: \"" + this.state.parentIDS[a] + "\"){name}}\n\n";
      await axios.post("http://localhost:3000/graphql/", data).then(res => {
        names.push(res.data['data']['node']['name']);
      })
    }
    let key = 1;
    let content = [] as any[];
    names.forEach((element: string) => {
      content.push(this.setData(key, element));
      key++;
    });
    this.setState({
      parentdata: content,
    })
  }

    /**
   * setData
   * sets up object to display in table for input data
   *
   * @memberof NodeInfo
   */
  setData = (num: number,name: string) => {
    let temp = {} as any;
    temp['key'] = num;
    temp['name'] = name;
    return temp
  }

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
                  <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
              </Breadcrumb>
              <h1>{this.state.name}</h1>
              <hr/>
              <h2>Related Nodes</h2>
              <h3>Parent</h3>
              <Table columns={columns} dataSource={this.state.parentdata} />
              <h3>Children</h3>
              <Table columns={columns} dataSource={this.state.childdata} />
              <Link to={"/builder/" + this.state.id}><Button type="primary" style={{float: "right"}}>Course Builder</Button></Link>
          </div>
      );
    }
}