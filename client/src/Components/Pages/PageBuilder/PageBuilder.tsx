import React, {useState, useEffect} from "react";
import InformationField from './InformationField'
import { Icon, Button } from 'antd';
import "./PageBuilder.less";
import axios from 'axios';

import Loader from './../../Utility/Loader';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const draftandmark = require('./markdownDraftjs/index');

const PageBuilderPage = (props: any) => {
  const [Information, setInformation] = useState(EditorState.createEmpty());
  const [Images, setImages] = useState([] as string[]);
  const [Name, setName] = useState("Loading Data");
  const [Loading, setLoading] = useState(false);
  const [IDS, setIDS] = useState([] as {}[]);

  useEffect(() => {
    loadData();
  }, [props.match.params.id])

  const loadData = () => {
    setLoading(true);
    setName("Loading Data");
    let data:any = {query:  "query{node(id: \"" + props.match.params.id + "\"){name}}"};
    axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
      setName(res.data.data.node.name);
    })
    data = {query:  "query{informationByNodeId(nodeId: \"" + props.match.params.id + "\"){data type id}}"};
    axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
      return ([...res.data.data.informationByNodeId]);
    }).then((json: any) => {
      const IDS = [] as any[];
      json.forEach((element: any) => {
        if(element.type === "text") {
          setInformation(EditorState.createWithContent(convertFromRaw(draftandmark.markdownToDraft(element.data))));
        } else {
          const data = JSON.parse(element.data);
          setImages([...data]);
        }
        IDS.push({id: element.id, type: element.type});
      });
      setIDS(IDS);
      setLoading(false);
    });
  }

  const updateContent = (data: any) => {
    setInformation(data);
  }

  const save = () => {
    if(!Loading) {
      setLoading(true);
      let temp: string = draftandmark.draftToMarkdown(convertToRaw(Information.getCurrentContent()));
      let data = {text: temp, images: JSON.stringify(Images), ids: IDS, id: props.match.params.id};
      axios.post("http://localhost:3000/pagebuilder/", data);
  
      const data2 = {query:  "query{informationByNodeId(nodeId: \"" + props.match.params.id + "\"){id type}}"};
      axios.post("http://localhost:3000/graphql/", data2).then((res: any) => {
        const temp: any[] = [];
        res.data.data.informationByNodeId.forEach((element: any) => {
          temp.push({id: element.id, type: element.type});
        });
        setIDS(temp);
        setLoading(false);
      })
    }
  }

  return (
    <Loader loading={Loading}>
      <div className="pageBuilder">
        <div className="title">
            <h1>{Name}</h1>
        </div>
        <InformationField 
          Information={Information}
          Images={Images}
          setInformation={updateContent}
          setImages={setImages}
        />
        <Button onClick={save} className="SaveButton"><Icon type="save"/>Save</Button>
      </div>
    </Loader>
  );
}


export default PageBuilderPage;