import React, {useEffect, useState} from "react";
import axios from 'axios';
import {List} from 'antd';
import {Link} from 'react-router-dom';
import Loader from './../../Utility/Loader'

const CourseDisplay = (props: any) => {
    const [Data, setData] = useState([] as any[]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const data = {query:  "query{everyCourse{id name}}\n\n"};
        axios.post("/graphql/", data).then(res => {
            return res.data['data']['everyCourse'].map((res: any) => {
                return {name: res.name, id: res.id};
            });
          }).then(res => {
              setData(res);
              setLoading(false);
          });
          return () => {}
    }, [])

    if(Loading) {
      return <Loader/>
    }
   else {return (
      <List
      style={{width: "100%"}}
      bordered
      size="large"
      dataSource={Data}
      renderItem={item => <List.Item><Link to={'/course/' + item.id}>{item.name}</Link></List.Item>}
      />
  )};
    
}

export default CourseDisplay;