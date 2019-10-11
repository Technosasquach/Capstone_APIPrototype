import React, {useState, useEffect, useContext} from "react";
import CourseStructure from './CourseStructure/CourseStructure';
import Loader from '../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';
import QuizBuilder from './QuizBuilder/QuizBuilder';

import ContentProvider, {ContentContext} from './Context/ContentContext';
import StructureProvider, {StructureContext} from './Context/StructureContext';

import {useRequest} from './Hooks/Request'; 

import "./CourseBuilder.less";

import { EditorState, convertFromRaw } from 'draft-js';
const draftandmark = require('./PageBuilder/markdownDraftjs/index');

import {quiz} from './Types'

const CourseBuilderPage = (props: any) => {
  const [Loading, fetchedData] = useRequest({query:  "query{node(id:\"" + props.id + "\"){id name children { id name }}}"}, [props.id]);
  const [LoadingPage, fetchedPageData] = useRequest({query:  "query{informationByNodeId(nodeId: \"" + props.id + "\"){data type id}}"}, [props.id]);

  const [, ] = useState([] as quiz[]);

  const contentContext = useContext(ContentContext);
  const structureContext = useContext(StructureContext);

  useEffect(() => {
    if(!Loading && fetchedData) {
      const parsed = {
        id: fetchedData['data']['node']['id'],
        name: fetchedData['data']['node']['name'],
        children: fetchedData['data']['node']['children']
      }
      structureContext.setParent({id: parsed.id, name: parsed.name});
      structureContext.setChildren(parsed.children);
      structureContext.setName(parsed.name);
    }
  }, [fetchedData]);

  useEffect(() => {
    if(!LoadingPage && fetchedPageData) {
      const ids = [] as any[];
      fetchedPageData.data.informationByNodeId.forEach((element:any) => {
        ids.push({id: element.id, type: element.type});
        if(element.type === "text") {
          contentContext.setContent([EditorState.createWithContent(convertFromRaw(draftandmark.markdownToDraft(element.data)))]);
        } else {
          const data = JSON.parse(element.data);
          contentContext.setImages([[...data]]);
        }
      });
      contentContext.setIDS([[...ids]]);
    }
  }, [fetchedPageData])

  useEffect(() => {
    console.log(contentContext.IDS);
  }, [contentContext.IDS])

  return (
    <Loader loading={Loading || LoadingPage}>
        <div className="coursepage">
            <div className="stuctureregion">
              <CourseStructure />
            </div>
            <div className="selectregion">
              {structureContext.Selected.type ?
                <QuizBuilder />
                  :
                <PageBuilder />
              }
            </div>
        </div>
    </Loader>
  );
}

const CourseBuilderWrapper = (props: any) => {
  return (
    <StructureProvider>
      <ContentProvider>
        <CourseBuilderPage id={props.match.params.id}/>
      </ContentProvider>
    </StructureProvider>
  )
}

export default CourseBuilderWrapper;