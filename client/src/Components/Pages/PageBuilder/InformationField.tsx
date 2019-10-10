import React, {useState, useEffect} from 'react';
import { Icon, Upload } from 'antd';
import './InformationField.less';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'antd/es/radio';

let updating = false;

const InformationField = (props: any) => {
    const [Images, setImages] = useState([] as string[]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onChange = (editorState: any) => {
        setEditorState(editorState);
    }

    useEffect(() => {
        if(updating) {
            updating = false;
        } else {
            onChange(props.content);
            setImages(props.images);
        }
    }, [props.content, props.images]);

    useEffect(() => {
        updating = true;
        props.update(editorState);
    }, [editorState]);
    
    useEffect(() => {
        updating = true;
        props.updateImages(Images);
    }, [Images])

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const beforeUpload = (file: any) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            setImages([...Images,e.target.result]);
        };
        reader.readAsDataURL(file);
        return false;
    }

    const deleteImage = (key: number) => {
        const temp = [...Images];
        temp.splice(key, 1);
        setImages(temp);
    }

    return (
        <div className="fieldContainer">
            <div id="editor">
                <Editor 
                    editorState={editorState}
                    onEditorStateChange={onChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history']
                    }}
                />
            </div>
            {Images.length > 0 && 
                <div className="imagecontainer">
                    <div className="centerr">
                        {Images.map((Image: any, key: number) => {
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