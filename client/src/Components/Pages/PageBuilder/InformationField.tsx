import React, {useState, useEffect} from 'react';
import { Icon, Button, Upload } from 'antd';
import './InformationField.less';

import { convertToRaw, EditorState, RichUtils, Editor, DraftHandleValue } from 'draft-js';
import Buttonr from './button';
import BlockStyleToolBar, { getBlockStyle } from './BlockStyles/BlockStyleToolBar';

let updater = false;

const InformationField = (props: any) => {
    const [Image, setImage] = useState(props.imageData);
    const [Data, setData] = useState([] as any[]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onChange = (editorState: any) => {
        setEditorState(editorState);
        setData(convertToRaw(editorState.getCurrentContent()).blocks);
    }

    const handleKeyCommand = (command: any, editorState: any) => {
        let newState: EditorState | null;
        newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return "handled" as DraftHandleValue;
        }
        return "not-handled" as DraftHandleValue;
    }

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


    const setStyle = (input: any) => {
        const newState = RichUtils.toggleInlineStyle(editorState, input);
        if (newState) {
          onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    const toggleBlockType = (blockType: any) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    return (
        <div className="fieldContainer">
            <div id="editor">
                <div style={{display: "flex"}}>
                <BlockStyleToolBar
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <Buttonr clicker={setStyle} type="BOLD">B</Buttonr>
                <Buttonr clicker={setStyle} type="ITALIC">I</Buttonr>
                <Buttonr clicker={setStyle} type="UNDERLINE">U</Buttonr>
                </div>
                <Editor 
                    blockStyleFn={getBlockStyle}
                    editorState={editorState}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
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