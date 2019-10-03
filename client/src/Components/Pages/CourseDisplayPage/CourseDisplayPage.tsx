import React, {useEffect, useState} from "react";
import {List} from 'antd';
import Loader from './../../Utility/Loader';
import axios from 'axios';

import { Link } from 'react-router-dom';

const CourseDisplayPage = (props: any) => {
  // const data = [
  //   'Racing car sprays burning fuel into crowd.',
  //   'Japanese princess to wed commoner.',
  //   'Australian walks 100km after outback crash.',
  //   'Man charged over missing wedding girl.',
  //   'Los Angeles battles huge wildfires.',
  // ];

  const [Loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Nodes, setNodes] = useState([] as any[]);

  useEffect(() => {
    getData();
  }, [props.match.params.id])

  const getData = () => {
    setLoading(true);
    setName("Loading Data");
    let data:any = {query:  "query{course(id: \"" + props.match.params.id + "\"){name nodes}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        name: res.data['data']['course']['name'],
        nodes: res.data['data']['course']['nodes'],
      };
    }).then(json => {
      setName(json.name);
      Promise.all(json.nodes.map((val: string): Promise<{}> => {
        return getPageData(val);
      })).then((res: any[]) => {
        setNodes(res);
        setLoading(false);
      });
    })
  }

  const getPageData = (id: string): Promise<{}> => {
    let data:any = {query:  "query{node(id: \"" + id + "\"){ id name }}\n\n"};
    return axios.post("http://localhost:3000/graphql/", data).then(res => {
        return {
          name: res.data['data']['node']['name'],
          id: res.data['data']['node']['id']
        }
    });
  }

  return (
    <Loader loading={Loading}>
      {Name}
      <List
        size="large" 
        bordered
        dataSource={Nodes}
        renderItem={item => <List.Item><Link to={{
          pathname: '/learning',
          state: {
              nodeID : item.id
          }
      }}>{item.name}</Link></List.Item>}
      />
    </Loader>
  );
}


export default CourseDisplayPage;