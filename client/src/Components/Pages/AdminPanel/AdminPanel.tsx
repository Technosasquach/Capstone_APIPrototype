import React, { useState, useEffect } from 'react';

import './AdminPanel.less'
import {Table, Input, Row, Col, Icon} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Loader from './../../Utility/Loader';

const columnsUser = [
    {
      title: 'Name',
      dataIndex: 'username',
      render: (data: any, more: any) => {
          return <Link to={"/Admin/EditUser/" + more.id}>{data}</Link>
      }
    },
  ];
  const columnsCourse = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (data: any, more: any) => {
        return <Link to={"/Admin/EditCourse/" + more.id}>{data}</Link>
    }
    },
  ];
  const columnsNode = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (data: any, more: any) => {
        return <Link to={"/Admin/EditPage/" + more.id}>{data}</Link>
        }
    },
    {
        title: 'Depth',
        dataIndex: 'depth'
    }
  ];

const AdminPanel = (props: any) => {
    const [UserData, setUserData] = useState([] as any[]);
    const [CourseData, setCourseData] = useState([] as any[]);
    const [NodeData, setNodeData] = useState([] as any[]);
    const [AllUserData, setAllUserData] = useState([] as any[]);
    const [AllCourseData, setAllCourseData] = useState([] as any[]);
    const [AllNodeData, setAllNodeData] = useState([] as any[]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        const query = {query: "query { everyUser { id username } everyCourse { id name } everyNode { id name depth } }"}
        axios.post('/graphql/', query).then(res => {
            return {
                users: res.data.data.everyUser,
                courses: res.data.data.everyCourse,
                nodes: res.data.data.everyNode 
            }
        }).then(json => {
            setAllUserData(json.users);
            setUserData(json.users);
            setAllCourseData(json.courses);
            setCourseData(json.courses);
            setAllNodeData(json.nodes);
            setNodeData(json.nodes);
            setLoading(false);
        });
    }

    const UserSearch = (e: any) => {
        if (e.target.value) {
            const data = AllUserData.filter(user => {
                return user.username.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
            })
            setUserData(data);
        } else {
            setUserData(AllUserData);
        }
    }

    const CourseSearch = (e: any) => {
        if (e.target.value) {
            const data = AllCourseData.filter(course => {
                return course.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
            })
            setCourseData(data);
        } else {
            setCourseData(AllCourseData);
        }
    }

    const NodeSearch = (e: any) => {
        if (e.target.value) {
            const data = AllNodeData.filter(node => {
                return node.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
            })
            setNodeData(data);
        } else {
            setNodeData(AllNodeData);
        }
    }

    if (Loading) {
        return <Loader/>
    }
    return (
    <div style={{height: "100%"}}>
        <h1>Admin Panel</h1>
        <Row gutter={30}>
            <Col span={8} className="adminPane">
                <h2>User Search</h2>
                <Input onChange={UserSearch} placeholder="Search Users" suffix={<Icon type="search" />}/>
                <Table rowKey="id" dataSource={UserData} columns={columnsUser}/>
            </Col>
            <Col span={8} className="adminPane">
                <h2>Course Search</h2>
                <Input onChange={CourseSearch} placeholder="Search Courses" suffix={<Icon type="search" />}/>
                <Table rowKey="id" dataSource={CourseData} columns={columnsCourse}/>
            </Col>
            <Col span={8} className="adminPane">
                <h2>Page Search</h2>
                <Input onChange={NodeSearch} placeholder="Search Pages" suffix={<Icon type="search" />}/>
                <Table rowKey="id" dataSource={NodeData} columns={columnsNode}/>
            </Col>
        </Row>
    </div>
    );
}

export default AdminPanel;