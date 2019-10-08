import React, {useState, useEffect} from "react";
import InformationField from './InformationField'
import { Icon, Button } from 'antd';
import "./PageBuilder.less";
import axios from 'axios';

import Loader from './../../Utility/Loader';

interface content {
  key: number;
  content: any;
  removeable: boolean;
  imageData: string;
}

const PageBuilderPage = (props: any) => {
  const [Information, setInformation] = useState([{key: 0, content: "", removeable: false, imageData: ""}] as content[]);
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
    })
    data = {query:  "query{informationByNodeId(nodeId: \"" + props.match.params.id + "\"){text image order}}"};
    axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
      return ([...res.data.data.informationByNodeId]);
    }).then((json: any) => {
      const data: content[] = [];
      for(let i = 0; i < json.length; i++) {
        for(let j = 0; j < json.length; j++) {
          if(json[j].order === i) {
            data.push({key: i, content: json[j].text, imageData: json[j].image, removeable: (i === 0 ? false : true)} as content)
          }
        }
      }
      data.length > 0 ? setInformation(data) : setInformation([{key: 0, content: "", removeable: false, imageData: ""}] as content[]);
      setLoading(false);
    });
  }

  const updateContent = (data: any) => {
    const temp = [] as content[];
    Information.forEach(element => {
      temp.push({key: element.key, content: element.content, removeable: element.removeable, imageData: element.imageData});
    });
    temp[data.key] = data;
    setInformation(temp);
  }

  const addInfo = () => {    
    setInformation([...Information, {key: Information.length, content: "", removeable: true, imageData: ""}]);
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
    setInformation(temp);
  }

  const save = () => {

  }

  return (
    <Loader loading={Loading}>
      <div className="pageBuilder">
        <div className="title">
            <h1>{Name}</h1>
        </div>
        {Information && Information.map(info => {
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
        <Button onClick={save}><Icon type="save"/>Save</Button>
      </div>
    </Loader>
  );
}


export default PageBuilderPage;