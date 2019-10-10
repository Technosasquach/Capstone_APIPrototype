import React, {useState, useEffect} from "react";
import CourseStructure from './CourseStructure/CourseStructure';
import Loader from '../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';
import QuizBuilder from './QuizBuilder/QuizBuilder';

import {useRequest} from './Hooks/Request';

import "./CourseBuilder.less";

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
const draftandmark = require('./PageBuilder/markdownDraftjs/index');

import {card, structure, selected, quiz} from './Types'

const CourseBuilderPage = (props: any) => {
  const [Parent, setParent] = useState({} as card);
  const [Children, setChildren] = useState([] as string[]);
  const [Loading, fetchedData] = useRequest({query:  "query{node(id:\"" + props.match.params.id + "\"){id name children { id name }}}"}, [props.match.params.id]);
  const [LoadingPage, fetchedPageData] = useRequest({query:  "query{informationByNodeId(nodeId: \"" + props.match.params.id + "\"){data type id}}"}, [props.match.params.id]);

  const [Structure, setStructure] = useState({index: ([] as number[]), treeIndex: ([] as string[]), cards: ([] as card[])} as structure);
  const [Content, setContent] = useState([EditorState.createEmpty()] as EditorState[]);
  const [Images, setImages] = useState([[]] as string[][]);
  const [IDS, setIDS] = useState([] as string[][]);
  const [, ] = useState([] as quiz[]);

  const [Selected, setSelected] = useState({index: 0, type: 0} as selected);
  const [Name, setName] = useState(undefined as any);

  useEffect(() => {
    if(Selected.index == 0) {
      setName(Parent.name);
    } else {
      setName(Structure.cards[Selected.index-1].name);
    }
  }, [Selected]);

  useEffect(() => {
    if(!Loading && fetchedData) {
      const parsed = {
        id: fetchedData['data']['node']['id'],
        name: fetchedData['data']['node']['name'],
        children: fetchedData['data']['node']['children']
      }
      setParent({id: parsed.id, name: parsed.name});
      setChildren(parsed.children);
      setName(parsed.name);
    }
  }, [fetchedData]);

  useEffect(() => {
    if(!LoadingPage && fetchedPageData) {
      const ids = [] as any[];
      fetchedPageData.data.informationByNodeId.forEach((element:any) => {
        ids.push({id: element.id, type: element.type});
        if(element.type === "text") {
          setContent([EditorState.createWithContent(convertFromRaw(draftandmark.markdownToDraft(element.data)))])
        } else {
          const data = JSON.parse(element.data);
          setImages([[...data]]);
        }
      });
      setIDS([[...ids]]);
    }
  }, [fetchedPageData])

  useEffect(() => {
    Content.forEach(item => {
      console.log(convertToRaw(item.getCurrentContent()));
    })
    console.log(Images, IDS);
  }, [Content])

  const setContentIndex = (data: any) => {
    const temp = [...Content];
    temp[Selected.index] = data;
    setContent(temp);
  }

  const setImagesIndex = (data: any) => {
    const temp = [...Images];
    temp[Selected.index] = data;
    setImages(temp);
  }

  return (
    <Loader loading={Loading || LoadingPage}>
        <div className="coursepage">
            <div className="stuctureregion">
              <CourseStructure 
              Parent={Parent} 
              Structure={Structure} 
              setStructure={setStructure} 
              Children={Children} 
              Content={Content} 
              setContent={setContent} 
              Images={Images}
              setImages={setImages}
              Selected={Selected.index} 
              setSelected={setSelected}
              IDS={IDS}
              setIDS={setIDS}
              />
            </div>
            <div className="selectregion">
              {Selected.type ?
                <QuizBuilder 
                Selected={Selected.index}/>
                  :
                <PageBuilder 
                nodeName={Name} 
                Content={Content[Selected.index]} 
                setContent={setContentIndex}
                Images={Images[Selected.index]}
                setImages={setImagesIndex} 
                Selected={Selected.index} />
              }

            </div>
        </div>
    </Loader>
  );
}

export default CourseBuilderPage;