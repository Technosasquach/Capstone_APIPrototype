import React, {useState, useEffect} from 'react';
import { Icon, Button, Upload } from 'antd';
import './InformationField.less';

import { convertToRaw, EditorState, AtomicBlockUtils } from 'draft-js';
import draftToMarkdown from './../../../../../node_modules/draftjs-to-markdown/lib/draftjs-to-markdown.js';
import { Editor } from 'react-draft-wysiwyg';
import './../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

let updater = false;

const InformationField = (props: any) => {
    const [Image, setImage] = useState(props.imageData);
    const [Data, setData] = useState([] as any[]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onChange = (editorState: any) => {
        setEditorState(editorState);
        console.log(convertToRaw(editorState.getCurrentContent()))
        setData(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    }

    const insertImage = (editorState: any, base64: any) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'image',
          'IMMUTABLE',
          { src: base64 },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          { currentContent: contentStateWithEntity },
        );
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
      };

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    useEffect(() => {
        updater = true;
    }, []);

    useEffect(() => {
        insertImage(editorState, Image);
    }, [Image]);

    useEffect(() => {
        update();
    }, [Data]);
    
    const beforeUpload = (file: any) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    }
    

    const remover = () => {
        props.remover(props.id);
    }

    const update = () => {
        if(!updater) {
            props.update({key: props.id, content: Data, removeable: props.removeable, imageData: Image});
        } else {
            updater = false;
        }
    }

    return (
        <div className="fieldContainer">
            <div id="editor">
                <Editor 
                    editorState={editorState}
                    onEditorStateChange={onChange}
                />
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