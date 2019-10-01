import React, {useState} from "react";
import InformationField from './InformationField'
import { Input, Icon, Upload } from 'antd';
import "./PageBuilder.less";

const PageBuilderPage = (props: any) => {
  const [Loading,] = useState(false);
  const [Image, setImage] = useState(undefined);

  const uploadButton = (
    <div>
      <Icon type={Loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const beforeUpload = (file: any) => {
    var reader = new FileReader();
    reader.onload = (e: any) => {
        setImage(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
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
            <h1>{props.nodeName}</h1>
            <span>
                <h1>Title</h1><Input id="title" />
            </span>
        </div>
      </span>
      <InformationField/>
    </div>
  );
}


export default PageBuilderPage;