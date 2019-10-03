import React, {useState, useEffect} from 'react';
import { Input, Icon, Button, Upload } from 'antd';
const { TextArea } = Input;
import './InformationField.less';
import {content} from '../Types';

let updater = false;

const InformationField = (props: any) => {
    const [Image, setImage] = useState(props.imageData);
    const [Data, setData] = useState(props.content);

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    useEffect(() => {
        updater = true;
        (document.getElementById('text' + props.id) as HTMLInputElement).value = props.content;
    }, []);

    useEffect(() => {
        update();
    }, [Data, Image]);
    
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
        if(!updater) {
            props.update({key: props.id, content: Data, removeable: props.removeable, imageData: Image} as content);
        } else {
            updater = false;
        }
    }

    return (
        <div className="fieldContainer">
            <div id="image">
                <TextArea onChange={change} className={'none'} id={'text' + props.id} rows={12} autosize={{minRows: 12, maxRows: 12}} />             
            </div>
            <div id='imagediv'>
                <Upload name="avatar" listType="picture-card" className="avatar-uploader imagediv" showUploadList={false} beforeUpload={beforeUpload}>
                    {Image !== "" ? <img src={Image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
            {props.removeable && <Button onClick={remover}><Icon type="close"/></Button>}
        </div>
    )
}


export default InformationField;