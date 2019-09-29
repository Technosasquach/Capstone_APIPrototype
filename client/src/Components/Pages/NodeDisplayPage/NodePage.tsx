import * as React from "react";

import './NodePage.less'
import { Table, Button } from 'antd';
import axios from 'axios'
import { Link } from "react-router-dom";
import Loader from "./../../Utility/Loader";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    render: (text:string, record:any) => {return record.link !== undefined ? <Link to={"/node/" + record.link}>{text}</Link> : <div>{text}</div>},
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

export default class SearchPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
          id: this.props.id,
          name: "Loading Data",
          childdata: dataChild,
          parentdata: dataParent,
          loading: true
        };
      }
    
      componentDidMount() {
        this.beginQuery();
      }
    
      componentDidUpdate(prevProps: any) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
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
        this.setState({
          loading: true
        });
        let data:any = {query:  "query{node(id: \"" + this.props.match.params.id + "\"){name children {id name} parents {id name}}}\n\n"};
        axios.post("http://localhost:3000/graphql/", data).then(res => {
          return {
            name: res.data['data']['node']['name'],
            children: res.data['data']['node']['children'],
            parents: res.data['data']['node']['parents']
          };
        }).then((json) => {
          let childData = [] as any;
          let parentData = [] as any;
          if(json.children.length > 0) {
            childData = this.dataSet(json.children);
          } else {
            childData = dataChild;
          }
          if(json.parents.length > 0) {
            parentData = this.dataSet(json.parents);
          } else {
            parentData = dataParent;
          }
          this.setState({
            name: json.name,
            childdata: childData,
            parentdata: parentData,
            loading: false
          }); 
        });
      }
    
    
      /**
       * dataSet
       * Gets all element names and returns a array of json objects
       *
       * @memberof NodeInfo
       */
      dataSet = (array: any[]) => {
        let key = 1;
        let content = [] as any[];
        for(let i = 0; i < array.length; i++) {
          content.push(this.setData(key++, array[i].name, array[i].id));
        }
        return content;
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
            <Loader loading={this.state.loading}>
                <div id="NodePage">
                    <h1>{this.state.name}</h1>
                    <hr/>
                    <h2>Related Nodes</h2>
                    <h3>Parent</h3>
                    <Table columns={columns} pagination={false} dataSource={this.state.parentdata} />
                    <h3>Children</h3>
                    <Table columns={columns} pagination={false} dataSource={this.state.childdata} />
                    <Link to={this.props.match.params.id + "/builder/"}><Button type="primary" style={{float: "right"}}>Course Builder</Button></Link>
                </div>
            </Loader>
        );
    }
}