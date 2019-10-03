import React, {useState} from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer'
import {Button, Icon, Input, Modal} from 'antd'
import CourseNodeAdder from "./CourseNodeAdder";
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import "./CourseStructure.less";

const CourseStructure = (props: any) => {
  const [CourseName, setCourseName] = useState("");
  const [Visible, setVisible] = useState(false);

  const updateName = (e: any) => {
    setCourseName(e.target.value);
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  const extractData = (input: any) => {
    const data = [] as any;
    input.forEach((element: any) => {
      data.push({content: element.content, imageData: element.imageData});
    });
    return data;
  }

  const submitCourse = () => {
    const query = {} as any;
    const order = props.Structure.index;
    let nodes = [props.Parent.id] as any;
    let data = [extractData(props.Content[0])] as any;
    for(let i = 0; i < props.Structure.cards.length; i++){
      nodes.push(props.Structure.cards[order[i]].id);
      data.push(extractData(props.Content[order[i]+1]));
    }

    query.coursename = CourseName;
    query.nodes = nodes;
    query.data = data;
    axios.post("http://localhost:3000/coursebuilder/", query).then(res => {
        props.history.push('/course/' + res.data);
    });
  }

  return (
    <div id="container">
      <h1>Course Structure</h1>
      <span style={{display: "flex"}}><h5>Course Name</h5><Input onChange={updateName} /></span>
      <div id="adder">
        <DndProvider backend={HTML5Backend}>
          <Draggable Parent={props.Parent} Structure={props.Structure} setSelected={props.setSelected}/>
          <div id={"AddButton"}>
            <Button onClick={showModal} type="dashed" style={{ width: '100%', height: '100%' }}>
              <Icon type="plus" /> Add Page
            </Button>
          </div>
          <Button onClick={submitCourse} type="primary" id="SubmitButton">
            Submit Course
          </Button>
        </DndProvider>
        <Modal
        title="Structure Select"
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
          <CourseNodeAdder 
          enabled={true} 
          Structure={props.Structure} 
          setStructure={props.setStructure} 
          Children={props.Children} 
          Content={props.Content}
          setContent={props.setContent}
          Selected={props.Selected} 
          setSelected={props.setSelected}/>
        </Modal>
      </div>
    </div>
  );
}

export default withRouter(CourseStructure);