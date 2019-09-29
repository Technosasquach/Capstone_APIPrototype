import React, {useState} from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer'
import {Button, Icon, Input, Modal} from 'antd'
import CourseNodeAdder from "./CourseNodeAdder";

import "./CourseStructure.less";

const CourseStructure = (props: any) => {
  const [, setCourseName] = useState("");
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
    return (
      <div id="container">
        <h1>Course Structure</h1>
        <span style={{display: "flex"}}><h5>Course Name</h5><Input onChange={updateName} /></span>
        <div id="adder">
          <DndProvider backend={HTML5Backend}>
            <Draggable Structure={props.Structure} />
            <div id={"AddButton"}>
              <Button onClick={showModal} type="dashed" style={{ width: '100%', height: '100%' }}>
                <Icon type="plus" /> Add Page
              </Button>
            </div>
            <Button type="primary" id="SubmitButton">
              Submit Course
            </Button>
          </DndProvider>
          <Modal
          title="Structure Select"
          visible={Visible}
          onOk={handleOk}
          onCancel={handleCancel}
          >
            <CourseNodeAdder enabled={true} Structure={props.Structure} setStructure={props.setStructure} Children={props.Children} />
          </Modal>
        </div>
      </div>
    );
}

export default CourseStructure;