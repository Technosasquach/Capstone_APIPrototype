import React, {useState, useEffect} from "react";
import CourseStructure from './CourseStructure/CourseStructure';
import Loader from '../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';
import QuizBuilder from './QuizBuilder/QuizBuilder';

import {useRequest} from './Hooks/Request';

import "./CourseBuilder.less";

import {card, content, structure, selected, quiz} from './Types'

const CourseBuilderPage = (props: any) => {
  const [Parent, setParent] = useState({} as card);
  const [Structure, setStructure] = useState({index: ([] as number[]), treeIndex: ([] as string[]), cards: ([] as card[])} as structure);
  const [Children, setChildren] = useState([] as string[]);
  const [Content, setContent] = useState([[{key: 0, content: "", removeable: false, imageData: ""}]] as content[][]);
  const [, ] = useState([] as quiz[]);
  const [Selected, setSelected] = useState({index: 0, type: 0} as selected);
  
  const [Loading, fetchedData] = useRequest({query:  "query{node(id:\"" + props.match.params.id + "\"){id name children { id name }}}"}, [props.match.params.id]);

  useEffect(() => {
    if(!Loading && fetchedData) {
      const parsed = {
        id: fetchedData['data']['node']['id'],
        name: fetchedData['data']['node']['name'],
        children: fetchedData['data']['node']['children']
      }
      setParent({id: parsed.id, name: parsed.name});
      setChildren(parsed.children);
    }
  }, [fetchedData]);

  useEffect(() => {
    Content.forEach(item => {
      console.log(...item);
    })
  }, [Content])

  return (
    <Loader loading={false}>
        <div className="coursepage">
            <div className="stuctureregion">
              <CourseStructure 
              Parent={Parent} 
              Structure={Structure} 
              setStructure={setStructure} 
              Children={Children} 
              Content={Content} 
              setContent={setContent} 
              Selected={Selected.index} 
              setSelected={setSelected}/>
            </div>
            <div className="selectregion">
              {Selected.type ?
                <QuizBuilder 
                Selected={Selected.index}/>
                  :
                <PageBuilder 
                nodeName={Parent.name} 
                Content={Content} 
                setContent={setContent} 
                Selected={Selected.index} />
              }

            </div>
        </div>
    </Loader>
  );
}

export default CourseBuilderPage;