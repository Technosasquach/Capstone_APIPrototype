import React, {useState, useEffect} from "react";
import InformationField from './InformationField'
import { Icon, Button } from 'antd';
import "./PageBuilder.less";
import axios from 'axios';

import Loader from './../../Utility/Loader';

import { EditorState, convertToRaw } from 'draft-js';

const draftjstomarkdown = require('./../../../../../node_modules/draftjs-to-markdown/lib/draftjs-to-markdown.js');

const PageBuilderPage = (props: any) => {
  const [Information, setInformation] = useState(EditorState.createEmpty());
  const [Images, setImages] = useState([] as string[]);
  const [Name, setName] = useState("Loading Data");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [props.match.params.id])

  const loadData = () => {
    setLoading(true);
    setName("Loading Data");
    let data:any = {query:  "query{node(id: \"" + props.match.params.id + "\"){name}}"};
    axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
      setName(res.data.data.node.name);
      setLoading(false);
    })
    // data = {query:  "query{informationByNodeId(nodeId: \"" + props.match.params.id + "\"){text image order}}"};
    // axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
    //   return ([...res.data.data.informationByNodeId]);
    // }).then((json: any) => {
    //   const data: content[] = [];
    //   for(let i = 0; i < json.length; i++) {
    //     for(let j = 0; j < json.length; j++) {
    //       if(json[j].order === i) {
    //         data.push({key: i, content: json[j].text, imageData: json[j].image, removeable: (i === 0 ? false : true)} as content)
    //       }
    //     }
    //   }
    //   data.length > 0 ? setInformation(data) : setInformation([{key: 0, content: "", removeable: false, imageData: ""}] as content[]);
    //   setLoading(false);
    // });
  }

  const updateContent = (data: any) => {
    setInformation(data);
  }

  const save = () => {
    console.log(draftjstomarkdown.default(convertToRaw(Information.getCurrentContent())));
    console.log(Images);
  }

  return (
    <Loader loading={Loading}>
      <div className="pageBuilder">
        <div className="title">
            <h1>{Name}</h1>
        </div>
        {Information !== undefined && <InformationField 
          content={Information}
          images={Images}
          update={updateContent}
          updateImages={setImages}
        />}
        
        <Button onClick={save} className="SaveButton"><Icon type="save"/>Save</Button>
      </div>
    </Loader>
  );
}


export default PageBuilderPage;