import React, {useState, useEffect} from 'react';

import {Button, Input, Table, Modal} from 'antd';

const columnsAll = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Add',
        key: 'Add',
        render: (name: any, object: any) => {
            const callfunc = () => {
                object.func(object.id);
            }
            return <a onClick={callfunc}>Add</a>;
        },
    },
]

const AddTaken = (props: any) => {
    const [Visible, setVisible] = useState(false);
    const [Courses, setCourses] = useState([] as any);
    const [InputRef, setInputRef] = useState({} as any);

    const giveFunction = (data: any[]) => {
        const temp = [] as any[];
        for(let i = 0; i < data.length; i++) {
            temp.push({id: data[i].id, name: data[i].name});
        }
        temp.forEach(element => {
            element.func = props.addCourse;
        });
        return temp;
    }

    const filter = (data: any[]) => {
        const temp = data.filter(course => {
            return props.current.filter((currentcourse: any) => {
                return currentcourse.id == course.id
            }) == 0;
        });
        return temp;
    }

    useEffect(() => {
        if(InputRef.state) {
            if(InputRef.state.value) {
                    const data = props.AllCourses.filter((course: any) => {
                        return course.name.toLowerCase().indexOf(InputRef.state.value.toLowerCase()) >= 0
                    });
                    const temp = filter(data);
                    if(temp.length > 0) {
                        setCourses(giveFunction(temp));
                    } else {
                        InputRef.state.value = "";
                        setCourses(giveFunction(filter(props.AllCourses)));
                    }
            } else {
                setCourses(giveFunction(filter(props.AllCourses)));
            }
        }
    }, [props.AllCourses, props.current, InputRef]);

    
    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = (e: any) => {
        InputRef.state.value = "";
        setCourses(giveFunction(filter(props.AllCourses)));
        setVisible(false);
    };
    
    const handleCancel = (e: any) => {
        InputRef.state.value = "";
        setCourses(giveFunction(filter(props.AllCourses)));
        setVisible(false);
    };

    const CourseSearch = (e: any) => {
        if (e.target.value) {
            const data = props.AllCourses.filter((course: any) => {
                return course.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
            })
            setCourses(giveFunction(filter(data)));
        } else {
            setCourses(giveFunction(filter(props.AllCourses)));
        }
    }

    return (
        <>
            <Button onClick={showModal} style={{float: "right"}}>Add Course</Button>
            <Modal title="Course Adder" visible={Visible} onOk={handleOk} onCancel={handleCancel}>
                <Input ref={setInputRef} onChange={CourseSearch} />
                <Table rowKey="id" dataSource={Courses} columns={columnsAll} />
            </Modal>
        </>
    );
}

export default AddTaken;