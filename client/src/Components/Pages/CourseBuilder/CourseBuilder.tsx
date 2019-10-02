import React, {useState, useEffect} from "react";
import CourseStructure from './CourseStructure/CourseStructure';
import Loader from './../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';

import {useRequest} from './Hooks/Request';

import "./CourseBuilder.less";

import {card, content, structure} from './Types'

const CourseBuilderPage = (props: any) => {
  const [Parent, setParent] = useState({} as card);
  const [Structure, setStructure] = useState({index: ([] as number[]), treeIndex: ([] as string[]), cards: ([] as card[])} as structure);
  const [Children, setChildren] = useState([] as string[]);
  const [Content, setContent] = useState([[{key: 0, content: "", removeable: false, imageData: ""}]] as content[][]);
  const [Selected, setSelected] = useState(0);
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
              Selected={Selected} 
              setSelected={setSelected}/>
            </div>
            <div className="selectregion">
              <PageBuilder 
              nodeName={Parent.name} 
              Content={Content} 
              setContent={setContent} 
              Selected={Selected} />
            </div>
        </div>
    </Loader>
  );
}

export default CourseBuilderPage;