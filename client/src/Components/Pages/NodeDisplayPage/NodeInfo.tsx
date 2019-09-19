import * as React from "react";

import "./NodeInfo.less";
import { Breadcrumb, Table, Button } from 'antd';
import axios from 'axios'
import { Link } from "react-router-dom";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text:string, record:any) => <Link to={"/node/" + record.link}>{text}</Link>,
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
      name: "Loading Data",
      childdata: dataChild,
      parentdata: dataParent,
    };
  }

  componentDidMount() {
    this.beginQuery();
  }

  componentDidUpdate(prevProps: any) {
    if(prevProps !== this.props) {
      this.beginQuery();
    }
  }

  /**
   * beginQuery
   * Initates requests for data for specific node
   *
   * @memberof NodeInfo
   */
  beginQuery = () => {
    let data:any = {query:  "query{node(id: \"" + this.props.id + "\"){name children parents}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        name: res.data['data']['node']['name'],
        childrenIDS: res.data['data']['node']['children'],
        parentIDS: res.data['data']['node']['parents']
      };
    }).then(async (json) => {
      let childData = [];
      let parentData = [];
      if(json.childrenIDS.length > 0) {
        childData = await this.dataSet(json.childrenIDS);
      } else {
        childData = dataChild;
      }
      if(json.parentIDS.length > 0) {
        parentData = await this.dataSet(json.parentIDS);
      } else {
        parentData = dataParent;
      }
      this.setState({
        name: json.name,
        childdata: childData,
        parentdata: parentData
      }); 
    });
  }

  /**
   * dataSet
   * Gets all element names and returns a array of json objects
   *
   * @memberof NodeInfo
   */
  dataSet = (IDS: string[]) => {
    //let data:any = {};

    return Promise.all(IDS.map((ID: string) => {
      let data = {query: "query{node(id: \"" + ID + "\"){name}}\n\n"};
      return axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
        return res.data.data.node.name;
      });
    })).then((res: any) => {
      let key = 1;
      let content = [] as any[];
      for(let i = 0; i < res.length; i++) {
        content.push(this.setData(key, res[i], IDS[i]));
        key++;
      }
      return content;
    });
  }

    /**
   * setData
   * sets up object to display in table for input data
   *
   * @memberof NodeInfo
   */
  setData = (num: number,name: string, link: string) => {
    return {
      key: num,
      name: name,
      link: link
    }
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
              <Table columns={columns} pagination={false} dataSource={this.state.parentdata} />
              <h3>Children</h3>
              <Table columns={columns} pagination={false} dataSource={this.state.childdata} />
              <Link to={this.props.id + "/builder/"}><Button type="primary" style={{float: "right"}}>Course Builder</Button></Link>
          </div>
      );
    }
}