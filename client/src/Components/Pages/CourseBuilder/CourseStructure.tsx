import React from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer'
import {Button, Icon, Input} from 'antd'

import "./CourseStructure.less";

export default class CourseStructure extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      CourseName: ""
    }
  }
  submit = () => {
    this.props.submitter(this.state.CourseName);
  }

  updateName = (e: any) => {
    this.setState({
      CourseName: e.target.value
    })
  }

  render() {
      return (
        <div id="container">
          <h1>Course Structure</h1>
          <span style={{display: "flex"}}><h5>Course Name</h5><Input onChange={this.updateName} /></span>
          <div id="adder">
            <DndProvider backend={HTML5Backend}>
              <Draggable Structure={this.props.structure} switcher={this.props.switcher} />
              <div id={"AddButton"}>
                <Button onClick={this.props.showModal} type="dashed" style={{ width: '100%', height: '100%' }}>
                  <Icon type="plus" /> Add Page
                </Button>
              </div>
              <Button onClick={this.submit} type="primary" id="SubmitButton">
                Submit Course
              </Button>
            </DndProvider>
          </div>
        </div>
      );
  }
}