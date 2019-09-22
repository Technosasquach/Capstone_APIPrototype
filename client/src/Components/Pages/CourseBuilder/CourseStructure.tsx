import React from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer'
import {Button, Icon} from 'antd'

import "./CourseStructure.less";

export default class CourseStructure extends React.Component<any, any> {

  render() {
      return (
        <DndProvider backend={HTML5Backend}>
          <h1>Course Structure</h1>
          <Draggable Structure={this.props.structure} />
          <div id={"AddButton"}>
            <Button onClick={this.props.showModal} type="dashed" style={{ width: '100%', height: '100%' }}>
              <Icon type="plus" /> Add Page
            </Button>
          </div>
          <Button type="primary" style={{float: "right"}}>
            Submit Course
          </Button>
        </DndProvider>
      );
  }
}