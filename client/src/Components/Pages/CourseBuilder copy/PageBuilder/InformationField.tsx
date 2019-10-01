import React, {useState, useEffect} from 'react';
import { Input, Icon, Button, Upload } from 'antd';
const { TextArea } = Input;

import './InformationField.less'

interface content {
    key: number;
    content: any;
    imageSet: boolean;
    imageData?: string;
}

const InformationField = (props: any) => {
    const [UseImage, setUseImage] = useState(false);
    const [Image, setImage] = useState(undefined as any);
    const [Data, setData] = useState("");

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
        );


    useEffect(() => {
        update();
    }, [Data, Image])
    
    const beforeUpload = (file: any) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    }
    
    const change = (e: any) => {
        setData(e.target.value);
    }

    const remover = () => {
        props.remover(props.id);
    }

    const update = () => {
        if(UseImage) {
            props.update({key: props.id, content: Data, imageSet: UseImage, imageData: Image} as content);
        } else {
            props.update({key: props.id, content: Data, imageSet: UseImage} as content);
        }
    }

    return (
        <div className="fieldContainer">
            <div id="buttons">
                {UseImage ? <Button onClick={() => setUseImage(false)}><Icon type="Plus" />Remove Image</Button> : <Button onClick={() => setUseImage(true)}><Icon type="Plus" />Add Image</Button>}
                <Button><Icon type="Plus" />Add Chart</Button>
            </div>
            <div id={UseImage ? "image" : "noimage"}>
                <TextArea onChange={change} className={'none'} rows={8} autosize={{minRows: 8, maxRows: 8}} />
            </div>
            {UseImage && 
            <div id='imagediv'>
                <Upload name="avatar" listType="picture-card" className="avatar-uploader imagediv" showUploadList={false} beforeUpload={beforeUpload}>
                    {Image !== undefined ? <img src={Image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div> } 
            {props.removeable && <Button onClick={remover}><Icon type="close"/></Button>}
        </div>
    )
}

export default InformationField;