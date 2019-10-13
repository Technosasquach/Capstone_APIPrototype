import React, {useState, useEffect} from "react";

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

const SearchPage = (props: any) => {
  const [Name, setName] = useState("Loading Data");
  const [ChildData, setChildData] = useState(dataChild);
  const [ParentData, setParentData] = useState(dataParent);
  const [Loading, setLoading] = useState(false);


  useEffect(() => {
    beginQuery();
  }, [props.match.params.id])

  /**
   * beginQuery
   * Initates requests for data for specific node
   *
   * @memberof NodeInfo
   */
  const beginQuery = () => {
    setLoading(true);
    setName("Loading Data");
    let data:any = {query:  "query{node(id: \"" + props.match.params.id + "\"){name children {id name} parents {id name}}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        name: res.data['data']['node']['name'],
        children: res.data['data']['node']['children'],
        parents: res.data['data']['node']['parents']
      };
    }).then((json) => {
      setName(json.name);
      if(json.children.length > 0) {
        setChildData(dataSet(json.children));
      } else {
        setChildData(dataChild);
      }
      if(json.parents.length > 0) {
        setParentData(dataSet(json.parents));
      } else {
        setParentData(dataParent);
      }
      setLoading(false);
    });
  }
    
    
      /**
       * dataSet
       * Gets all element names and returns a array of json objects
       *
       * @memberof NodeInfo
       */
      const dataSet = (array: any[]) => {
        let key = 1;
        let content = [] as any[];
        for(let i = 0; i < array.length; i++) {
          content.push(setData(key++, array[i].name, array[i].id));
        }
        return content;
      }
    
        /**
       * setData
       * sets up object to display in table for input data
       *
       * @memberof NodeInfo
       */
      const setData = (num: number,name: string, link: string) => {
        return {
          key: num,
          name: name,
          link: link
        }
      }
    
    
  if(Loading) {
    return <Loader/>
  } else {
    return (
      <div id="NodePage">
          <h1>{Name}</h1>
          <hr/>
          <h2>Related Nodes</h2>
          <h3>Parent</h3>
          <Table columns={columns} pagination={false} dataSource={ParentData} />
          <h3>Children</h3>
          <Table columns={columns} pagination={false} dataSource={ChildData} />
          <Link to={"/node/" + props.match.params.id + "/coursebuilder/"}><Button type="primary" style={{float: "right"}}>Course Builder</Button></Link>
          <Link to={"/node/" + props.match.params.id + "/builder/"}><Button type="primary" style={{float: "right", marginRight: "5px"}}>Page Builder</Button></Link>
      </div>
    );
  }    
}

export default SearchPage;