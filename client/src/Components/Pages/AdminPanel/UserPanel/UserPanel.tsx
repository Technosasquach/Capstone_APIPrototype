import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Loader from './../../../Utility/Loader';

import { Select, Input, Table, Row, Col, Button } from 'antd';
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
                        id
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
            setAccount(json.account ? json.account : {id: "", firstname: "", lastname: "", email: "", position: "", phone: ""} as any);
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

    const changeFirstName = (e: any) => {
        setAccount({...Account, firstname: e.target.value});
    }

    const changeLastName = (e: any) => {
        setAccount({...Account, lastname: e.target.value});
    }

    const changeEmail = (e: any) => {
        setAccount({...Account, email: e.target.value});
    }

    const changePosition = (e: any) => {
        setAccount({...Account, position: e.target.value});
    }

    const changePhone = (e: any) => {
        setAccount({...Account, phone: e.target.value});
    }

    const updateAuth = (e:any) => {
        setAccessLevel(e);
    }

    const Save = () => {
        if(Account.id) {
            const query = {query: `
                mutation createAccountInfo($id: String!, $username: String, $firstname: String, $lastname: String, $email: String, $position: String, $phone: String,) { 
                    updateAccount(id: $id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, position: $position, phone: $phone){
                        id
                        username
                        firstname 
                        lastname 
                        email 
                        position 
                        phone 
                    }
                }`,
                variables: {
                    id: Account.id,
                    username: Username,
                    firstname: Account.firstname,
                    lastname: Account.lastname,
                    email: Account.email,
                    position: Account.position,
                    phone: Account.phone,
                }
            }
            axios.post("/graphql/", query);
        } else {
            const query = {query: `
                mutation createAccountInfo($username: String, $firstname: String, $lastname: String, $email: String, $position: String, $phone: String,) { 
                    addAccount(username: $username, firstname: $firstname, lastname: $lastname, email: $email, position: $position, phone: $phone){
                        id
                        username
                        firstname 
                        lastname 
                        email 
                        position 
                        phone 
                    }
                }`,
                variables: {
                    username: Username,
                    firstname: Account.firstname,
                    lastname: Account.lastname,
                    email: Account.email,
                    position: Account.position,
                    phone: Account.phone,
                }
            }
            axios.post("/graphql/", query);
        }

        const query = {query: `
            mutation updateAccess($id: String!, $accessLevel: String) { 
                updateUser(id: $id, accessLevel: $accessLevel){
                    id
                    accessLevel
                }
            }`,
            variables: {
                id: props.match.params.id,
                accessLevel: AccessLevel
            }
        }
        axios.post("/graphql/", query);
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
                        <Select onChange={updateAuth} defaultValue={AccessLevel}>
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
                        <span>First Name</span>
                    </Col>
                    <Col span={16}>
                        <Input onChange={changeFirstName} defaultValue={Account ? Account.firstname : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Last Name</span>
                    </Col>
                    <Col span={16}>
                        <Input onChange={changeLastName} defaultValue={Account ? Account.lastname : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Email</span>
                    </Col>
                    <Col span={16}>
                        <Input onChange={changeEmail} defaultValue={Account ? Account.email : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Position</span>
                    </Col>
                    <Col span={16}>
                        <Input onChange={changePosition} defaultValue={Account ? Account.position : "No Data!"}></Input>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Phone</span>
                    </Col>
                    <Col span={16}>
                        <Input onChange={changePhone} defaultValue={Account ? Account.phone : "No Data!"}></Input>
                    </Col>
                </Row>
            </div>
            <Button onClick={Save} >Save</Button>
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