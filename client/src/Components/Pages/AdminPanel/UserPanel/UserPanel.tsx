import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Loader from './../../../Utility/Loader';

import { Select, Input, Table, Row, Col } from 'antd';
const { Option } = Select;

import AddTaken from './AddTaken';

import './UserPanel.less';

enum EUserAuthLevel {
    USER = "USER",
    OPERATOR = "OPERATOR",
    ADMIN = "ADMIN"
}


const columnsCourseTaken = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Remove',
        key: 'Remove',
        render: (name: any, object: any) => {
            const callfunc = () => {
                object.func(object.id);
            }
            return <a onClick={callfunc}>Remove</a>;
        },
    },
];

const columnsCourseCompleted = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Remove',
        key: 'Remove',
        render: (name: any, object: any) => {
            const callfunc = () => {
                object.func(object.id);
            }
            return <a onClick={callfunc}>Remove</a>;
        },
    },
];



const UserPanel = (props: any) => {
    const [AllCourses, setAllCourses] = useState([] as any[]);
    const [Username, setUsername] = useState("");
    const [CoursesTaken, setCoursesTaken] = useState([] as any[]);
    const [CoursesComplete, setCoursesComplete] = useState([] as any[]);
    const [AccessLevel, setAccessLevel] = useState(EUserAuthLevel.USER);
    const [Account, setAccount] = useState({} as any);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [props.match.params.id]);

    const getData = () => {
        setLoading(true);
        const query = {query: `
            query UserByName($id: String) { 
                user(id: $id) {
                    username 
                    coursesTaken { 
                        id 
                        name
                    } 
                    coursesComplete {
                        id 
                        name
                    } 
                    accessLevel 
                    account { 
                        username
                        firstname 
                        lastname 
                        email 
                        position 
                        phone 
                    } 
                }
                everyCourse { 
                    id 
                    name
                }
            }`,
            variables: {
                id: props.match.params.id
            }
        }
        axios.post("/graphql/", query).then(res => {
            console.log(res.data.data);
            return {
                accessLevel: res.data.data.user.accessLevel,
                account: res.data.data.user.account,
                coursesComplete: res.data.data.user.coursesComplete,
                coursesTaken: res.data.data.user.coursesTaken,
                username: res.data.data.user.username,
                everyCourse: res.data.data.everyCourse
            }
        }).then(json => {
            setAccessLevel(json.accessLevel);
            setAccount(json.account);
            setCoursesComplete(json.coursesComplete);
            setCoursesTaken(json.coursesTaken);
            setUsername(json.username);
            setAllCourses(json.everyCourse);
            setLoading(false);
        })
    }

    const addFunc = (data: any[], func: any) => {
        const temp = [] as any[];
        for(let i = 0; i < data.length; i++) {
            temp.push({id: data[i].id, name: data[i].name});
        }
        temp.forEach(element => {
            element.func = func;
        });
        return temp;
    }

    const AddCoursesTaken = (id: string) => {
        const courses = [...CoursesTaken.map(course => {return course.id})];
        courses.push(id);
        const query = {query: `
            mutation coursesUpdate($id: String!, $courses: [String]) { 
                updateCoursesTaken(_id: $id, coursesTaken: $courses) {
                    coursesTaken { 
                        id 
                        name
                    } 
                }
            }`,
            variables: {
                id: props.match.params.id,
                courses
            }
        }
        axios.post("/graphql/", query).then(res => {
            setCoursesTaken(res.data.data.updateCoursesTaken.coursesTaken);
        }).catch(res => {
            console.log(res);
        })
    }

    const RemoveTakenCourse = (id: string) => {
        const courses: any[] = CoursesTaken.filter(course => {return course.id != id}).map(course => {return course.id});
        const query = {query: `
            mutation coursesUpdate($id: String!, $courses: [String]) { 
                updateCoursesTaken(_id: $id, coursesTaken: $courses) {
                    coursesTaken { 
                        id 
                        name
                    } 
                }
            }`,
            variables: {
                id: props.match.params.id,
                courses
            }
        }
        axios.post("/graphql/", query).then(res => {
            setCoursesTaken(res.data.data.updateCoursesTaken.coursesTaken);
        }).catch(res => {
            console.log(res);
        })
    }

    const AddCoursesComplete = (id: string) => {
        const courses = [...CoursesComplete.map(course => {return course.id})];
        courses.push(id);
        const query = {query: `
            mutation coursesUpdate($id: String!, $courses: [String]) { 
                updateCoursesComplete(_id: $id, coursesComplete: $courses) {
                    coursesComplete {
                        id 
                        name
                    }
                }
            }`,
            variables: {
                id: props.match.params.id,
                courses
            }
        }
        axios.post("/graphql/", query).then(res => {
            console.log(res.data.data.updateCoursesComplete.coursesComplete);
            setCoursesComplete(res.data.data.updateCoursesComplete.coursesComplete);
        }).catch(res => {
            console.log(res);
        })
    }

    const RemoveCompleteCourse = (id: string) => {
        const courses: any[] = CoursesComplete.filter(course => {return course.id != id}).map(course => {return course.id});
        const query = {query: `
            mutation coursesUpdate($id: String!, $courses: [String]) { 
                updateCoursesComplete(_id: $id, coursesComplete: $courses) {
                    coursesComplete {
                        id 
                        name
                    }
                }
            }`,
            variables: {
                id: props.match.params.id,
                courses
            }
        }
        axios.post("/graphql/", query).then(res => {
            setCoursesComplete(res.data.data.updateCoursesComplete.coursesComplete);
        }).catch(res => {
            console.log(res);
        })
    }

    if (Loading) {
        return <Loader/>
    }
    return (
    <Row gutter={30} className="UserPanelContainer">
        <Col span={12} className="UserPanelInfo">
            <div className="UserPanelHeader">
                <div className="UserNameHeader">
                    <h1>{Username}</h1><span>Username:</span>
                </div>
                <Row gutter={16} className="AccessLevelHeader">
                    <Col span={8}>
                        <span>Access Level:</span>
                    </Col>
                    <Col span={16}>
                        <Select defaultValue={AccessLevel}>
                            <Option value="USER">USER</Option>
                            <Option value="OPERATOR">OPERATOR</Option>
                            <Option value="ADMIN">ADMIN</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            <div className="AccountInfo">
                <h2>Account Information</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Display Name</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.username : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>First Name</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.firstname : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Last Name</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.lastname : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Email</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.email : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Position</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.position : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Phone</span>
                    </Col>
                    <Col span={16}>
                        <Input defaultValue={Account ? Account.phone : "No Data!"}></Input>
                    </Col>
                </Row>
            </div>     
        </Col>

        <Col span={12} className="CourseContainer">
            <div className="CourseTaken">
                <h1>Courses Taken</h1> 
                <Table size="small" style={{marginBottom: "5px"}} rowKey="id" dataSource={addFunc(CoursesTaken, RemoveTakenCourse)} columns={columnsCourseTaken}/>
                <AddTaken current={CoursesTaken} addCourse={AddCoursesTaken} AllCourses={AllCourses}/>
            </div>
            <div className="CourseCompleted">
                <h1>Courses Complete</h1>
                <Table size="small" style={{marginBottom: "5px"}} rowKey="id" dataSource={addFunc(CoursesComplete, RemoveCompleteCourse)} columns={columnsCourseCompleted}/>
                <AddTaken current={CoursesComplete} addCourse={AddCoursesComplete} AllCourses={AllCourses}/>
            </div>
        </Col>
    </Row>
    );
}

export default UserPanel;