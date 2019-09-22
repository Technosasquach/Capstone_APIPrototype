import * as React from "react";

import { Input, Button, Icon, Upload } from 'antd';

const { TextArea } = Input;

export default class Formfill extends React.Component<any, any> {

    render() {
        return (
            <div style={{margin: "50px"}}>
                <div style={{display:"flex"}}>
                    <h1 style={{marginRight: "5px"}}>Title</h1><Input style={{marginTop: "5px"}} />
                </div>
                <div style={{display:"flex"}}>
                    <h1 style={{marginRight: "5px"}}>Description</h1><TextArea rows={4} style={{marginTop: "5px"}} />
                </div>
                <div style={{ marginTop: '10px', width: "100%", display: 'flex', marginLeft: 'auto', marginRight: 'auto'}}>
                    <h1 style={{marginRight:"310px"}}>Upload Image</h1>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        style={{}}
                    >
                        <Icon type='plus' />
                        <div className="ant-upload-text">Upload</div>
                    </Upload>
                </div>
                <div style={{height:"200px", width:"400px", marginTop: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button type="dashed" style={{ width: '100%', height: '100%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </div>
            </div>
        );
    }
}