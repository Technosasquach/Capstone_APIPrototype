import React, {useState, useContext} from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Draggable from './Draggable/DragContainer'
import {Button, Icon, Input, Modal} from 'antd'
import CourseNodeAdder from "./CourseNodeAdder";
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import {StructureContext} from './../Context/StructureContext';
import {ContentContext} from './../Context/ContentContext';
import {QuizContext} from './../Context/QuizContext';

const draftandmark = require('./../PageBuilder/markdownDraftjs/index.js');
import {convertToRaw} from 'draft-js';

import "./CourseStructure.less";

const CourseStructure = (props: any) => {
  const [CourseName, setCourseName] = useState("");
  const [Visible, setVisible] = useState(false);

  const structureContext = useContext(StructureContext);
  const contentContext = useContext(ContentContext);
  const quizContext = useContext(QuizContext);

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

  const extractData = (data: any) => {
    return draftandmark.draftToMarkdown(convertToRaw(data.getCurrentContent()));
  }

  const submitCourse = () => {
    const query = {} as any;
    const order = structureContext.Structure.index;
    let nodes = [structureContext.Parent.id] as any;
    let data = [extractData(contentContext.Content[0])] as any;
    let images = [JSON.stringify(contentContext.Images[0])] as any;
    let ids = [contentContext.IDS[0]];
    let quizzes = [quizContext.getQuiz(0)];
    for(let i = 0; i < structureContext.Structure.cards.length; i++){
      nodes.push(structureContext.Structure.cards[order[i]].id);
      data.push(extractData(contentContext.Content[order[i]+1]));
      images.push(JSON.stringify(contentContext.Images[order[i]+1]));
      ids.push(contentContext.IDS[order[i]+1]);
      quizzes.push(quizContext.getQuiz(order[i]+1));
    }
    query.coursename = CourseName;
    query.nodes = nodes;
    query.data = data;
    query.images = images;
    query.ids = ids;
    query.quizzes = quizzes;
    axios.post("/coursebuilder/", query).then(res => {
      switch(res.data) {
        case -1:
            window.alert("Issue with Page submission");
            break;
        case -2:
            window.alert("Issue with Quiz submission");
            break;
        case -3:
            window.alert("Issue with Course submission");
            break;
        default:
            props.history.push('/course/' + res.data);
            break;
      }
    });
  }

  return (
    <div id="container">
      <h1>Course Structure</h1>
      <span style={{display: "flex"}}><h5>Course Name</h5><Input onChange={updateName} /></span>
      <div id="adder">
        <DndProvider backend={HTML5Backend}>
          <Draggable />
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
          enabled={true} />
        </Modal>
      </div>
    </div>
  );
}

export default withRouter(CourseStructure);