import React, {useState, useEffect} from "react";
import InformationField from './InformationField'
import { Input, Icon, Upload, Button } from 'antd';
import "./PageBuilder.less";

interface info {
  key: number;
  content: any;
  removeable: boolean;
  imageSet: boolean;
  imageData?: string;
}

const PageBuilderPage = (props: any) => {
  const [Image, setImage] = useState(undefined);
  const [Information, setInformation] = useState([{key: 0, content: "", removeable: false, imageSet: false}] as info[]);

  const uploadButton = (
    <div>
      <Icon type={'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

    useEffect(() => {
      loadContent();
    }, [props.Selected])

  const loadContent = () => {
    setInformation(props.Content[props.Selected]);
  }

  const updateContent = (data: any) => {
    const temp = [...props.Content];
    temp[props.Selected][data.key] = data;
    props.setContent(temp);
    console.log(temp);
  }

  const beforeUpload = (file: any) => {
    var reader = new FileReader();
    reader.onload = (e: any) => {
        setImage(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  }

  const addInfo = () => {    
    const temp = [...Information];
    temp.push({key: Information.length, content: "", removeable: true, imageSet: false});
    setInformation(temp);

    const temp2 = [...props.Content];
    temp2[props.Selected].push({key: props.Content.length, content: "", imageSet: false});
    props.setContent(temp2);
  }

  const removeInfo = (id: number) => {
    const temp = [...Information];
    if(id < temp.length-1) {
      for(let i = id+1; i < temp.length; i++) {
        temp[i].key = temp[i].key - 1;
      }
    }
    temp.splice(id, 1);
    setInformation(temp);

    const temp2 = [...props.Content];
    if(id < temp2.length-1) {
      for(let i = id+1; i < temp2.length; i++) {
        temp2[props.Selected][i].key = temp2[props.Selected][i].key - 1;
      }
    }
    temp2[props.Selected].splice(id, 1);
    props.setContent(temp2);
  }

  return (
    <div className="pageBuilder">
      <span id="top">
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
        >
            {Image !== undefined ? <img src={Image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <div className="title">
            <h1>{props.nodeName ? props.nodeName : "Loading..."}</h1>
            <span>
                <h1>Title</h1><Input id="title" />
            </span>
        </div>
      </span>
      {Information.map(info => {
        return <InformationField 
        key={info.key} 
        id={info.key} 
        content={info.content} 
        imageSet={info.imageSet} 
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