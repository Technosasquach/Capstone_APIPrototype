import React, {useEffect, useContext} from "react";
import CourseStructure from './../../CourseBuilder/CourseStructure/CourseStructure';
import Loader from './../../../Utility/Loader';
import PageBuilder from './../../CourseBuilder/PageBuilder/PageBuilder';
import QuizBuilder from './../../CourseBuilder/QuizBuilder/QuizBuilder';

import {useRequest} from './../../CourseBuilder/Hooks/Request'; 

import { EditorState, convertFromRaw } from 'draft-js';
const draftandmark = require('./../../CourseBuilder/PageBuilder/markdownDraftjs/index');

import ContentProvider, {ContentContext} from './../../CourseBuilder/Context/ContentContext';
import StructureProvider, {StructureContext} from './../../CourseBuilder/Context/StructureContext';
import QuizProvider from './../../CourseBuilder/Context/QuizContext';

const CourseBuilderPage = (props: any) => {
    const [Loading, fetchedData] = useRequest({query:  "query{node(id:\"" + props.id + "\"){id name children { id name }}}"}, [props.id]);
    const [LoadingPage, fetchedPageData] = useRequest({query:  "query{informationByNodeId(nodeId: \"" + props.id + "\"){data type id}}"}, [props.id]);
  
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
  
    if(Loading || LoadingPage) {
      return <Loader/>
    } else {
      return (
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
      );
    }
}

const CourseEditor = (props: any) => {
    
    return (
        <StructureProvider>
            <ContentProvider>
                <QuizProvider>
                    <CourseBuilderPage id={props.match.params.id}/>
                </QuizProvider>
            </ContentProvider>
        </StructureProvider>
        );
    
}

export default CourseEditor;