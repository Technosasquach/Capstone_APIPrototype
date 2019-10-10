import React from 'react';
import { Icon, Upload } from 'antd';
import './InformationField.less';

import { Editor } from 'react-draft-wysiwyg';
import './../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'antd/es/radio';


const InformationField = (props: any) => {

    const onChange = (editorState: any) => {
        props.setContent(editorState);
    }
    
    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const beforeUpload = (file: any) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            props.setImages([...props.Images,e.target.result]);
        };
        reader.readAsDataURL(file);
        return false;
    }

    const deleteImage = (key: number) => {
        const temp = [...props.Images];
        temp.splice(key, 1);
        props.setImages(temp);
    }

    return (
        <div className="fieldContainer">
            <div id="editor">
                <Editor 
                    editorState={props.Content}
                    onEditorStateChange={onChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']
                        },
                    }}
                />
            </div>
            {props.Images.length > 0 && 
                <div className="imagecontainer">
                    <div className="centerr">
                        {props.Images.map((Image: any, key: number) => {
                            return <div key={key} className="iamge"><img src={Image}/><Button onClick={deleteImage.bind(null, key)} className="delete">X</Button></div>
                        })} 
                    </div>
                </div>
             }
            <div id="imagecenter">
                <div id='imagediv'>
                    <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={beforeUpload}>
                        {uploadButton}
                    </Upload>
                </div>
            </div>
        </div>
    )
}


export default InformationField;