import React, {useState, useEffect} from "react";
import CourseStructure from './CourseStructure/CourseStructure';
import Loader from './../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';

import {useRequest} from './Hooks/Request';

import "./CourseBuilder.less";

interface card {
  id: string;
  name: string;
}

interface structure {
  index: [number];
  treeIndex: [string];
  cards: [card];
}

const CourseBuilderPage = (props: any) => {
  const [Parent, setParent] = useState({} as card);
  const [Structure, setStructure] = useState({index: ([] as number[]), treeIndex: ([] as string[]), cards: ([] as card[])} as structure);
  const [Children, setChildren] = useState([] as string[]);
  const [Content, setContent] = useState({});

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

  return (
    <Loader loading={Loading}>
        <div className="coursepage">
            <div className="stuctureregion">
              <CourseStructure Parent={Parent} Structure={Structure} setStructure={setStructure} Children={Children}/>
            </div>
            <div className="selectregion">
              <PageBuilder nodeName={Parent.name} Content={Content} setContent={setContent} />
            </div>
        </div>
    </Loader>
  );
}

export default CourseBuilderPage;