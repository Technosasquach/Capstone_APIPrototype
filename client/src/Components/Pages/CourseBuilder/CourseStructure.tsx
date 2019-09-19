import React from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer';

export default class CourseStructure extends React.Component<any, any> {

  render() {
      return (
        <DndProvider backend={HTML5Backend}>
          <h1>Course Structure</h1>
          <Draggable Structure={this.props.structure} />
        </DndProvider>
      );
  }
}