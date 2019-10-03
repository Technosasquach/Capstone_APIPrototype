import React, {useState, useEffect} from "react";
import InformationField from './InformationField'
import { Icon, Button } from 'antd';
import "./PageBuilder.less";

import {content} from '../Types'

const PageBuilderPage = (props: any) => {
  const [Information, setInformation] = useState([{key: 0, content: "", removeable: false, imageData: ""}] as content[]);
  const [ReRender, setReRender] = useState(true);

  useEffect(() => {
    setReRender(false);
    setInformation([...props.Content[props.Selected]]);
  }, [props.Selected, props.Content])

  useEffect(() => {
    setReRender(true);
  }, [Information])

  const updateContent = (data: any) => {
    const temp = [...props.Content];
    temp[props.Selected][data.key] = data;
    props.setContent(temp);
    setInformation([...temp[props.Selected]]);
  }

  const addInfo = () => {    
    const temp = [...props.Content];
    temp[props.Selected].push({key: Information.length, content: "", removeable: true, imageData: ""} as content);
    props.setContent(temp);
  }

  const removeInfo = (id: number) => {
    const temp = [] as content[];
    Information.forEach(element => {
      temp.push({key: element.key, content: element.content, removeable: element.removeable, imageData: element.imageData});
    });
    if(id < temp.length-1) {
      for(let i = id+1; i < temp.length; i++) {
        temp[i].key = temp[i].key - 1;
      }
    }
    temp.splice(id, 1);
    const temp2 = [...props.Content];
    temp2[props.Selected] = temp;
    props.setContent(temp2);
  }

  return (
    <div className="pageBuilder">
      <div className="title">
          <h1>{props.nodeName ? props.nodeName : "Loading..."}</h1>
      </div>
      {ReRender && Information.map(info => {
        return <InformationField 
        key={info.key} 
        id={info.key} 
        content={info.content} 
        imageData={info.imageData} 
        removeable={info.removeable} 
        remover={removeInfo} 
        update={updateContent}/>
      })}
      
      <div id="contentAdder">
        <Button onClick={addInfo}><Icon type="plus"/>Add Content</Button>
      </div>
    </div>
  );
}


export default PageBuilderPage;