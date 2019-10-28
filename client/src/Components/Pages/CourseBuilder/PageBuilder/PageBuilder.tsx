import React, {useContext} from 'react';
import { Icon, Upload } from 'antd';
import './PageBuilder.less';
import { ContentContext } from './../Context/ContentContext';
import { StructureContext } from './../Context/StructureContext';
import { Editor } from 'react-draft-wysiwyg';
import './../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'antd';

const InformationField = (props: any) => {
    const contentContext = useContext(ContentContext);
    const structureContext = useContext(StructureContext);

    const onChange = (editorState: any) => {
        const temp = [...contentContext.Content];
        temp[structureContext.Selected.index] = editorState;
        contentContext.setContent(temp);
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
            const temp = [...contentContext.Images];
            const temp2 = temp[structureContext.Selected.index];
            temp2.push(e.target.result);
            temp[structureContext.Selected.index] = temp2;
            contentContext.setImages(temp);
        };
        reader.readAsDataURL(file);
        return false;
    }

    const deleteImage = (key: number) => {
        const temp = [...contentContext.Images];
        const temp2 = temp[structureContext.Selected.index];
        temp2.splice(key, 1);
        temp[structureContext.Selected.index] = temp2;
        contentContext.setImages(temp);
    }

    return (
        <div className="fieldContainer">
            <div className="title">
                <h1>{structureContext.Name}</h1>
            </div>
            <div id="editor">
                <Editor 
                    editorState={contentContext.Content[structureContext.Selected.index]}
                    onEditorStateChange={onChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'list', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough']
                        },
                    }}
                />
            </div>
            {contentContext.Images[structureContext.Selected.index].length > 0 && 
                <div className="imagecontainer">
                    <div className="centerr">
                        {contentContext.Images[structureContext.Selected.index].map((Image: any, key: number) => {
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