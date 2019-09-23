import * as React from "react";

import { Input, Button, Icon, Upload } from 'antd';
import './Formfill.less';
const { TextArea } = Input;

export default class Formfill extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidUpdate(prevProps: any) {
        if(prevProps.nodeID !== this.props.nodeID) {
            const object = {
                title: (document.getElementById("title") as HTMLInputElement).value,
                description: (document.getElementById("desc") as HTMLInputElement).value,
                content: (document.getElementById("content") as HTMLInputElement).value
            }
            this.props.save(object, prevProps.nodeID);
            if(this.props.pages[this.props.nodeID] !== undefined) {
                (document.getElementById("content") as HTMLInputElement).value = this.props.pages[this.props.nodeID].content;
                (document.getElementById("desc") as HTMLInputElement).value = this.props.pages[this.props.nodeID].description;
                (document.getElementById("title") as HTMLInputElement).value = this.props.pages[this.props.nodeID].title;
            } else {
                (document.getElementById("content") as HTMLInputElement).value = "";
                (document.getElementById("desc") as HTMLInputElement).value = "";
                (document.getElementById("title") as HTMLInputElement).value = "";
            }
        } else if (prevProps.submit !== this.props.submit) {
            const object = {
                title: (document.getElementById("title") as HTMLInputElement).value,
                description: (document.getElementById("desc") as HTMLInputElement).value,
                content: (document.getElementById("content") as HTMLInputElement).value
            }
            this.props.save(object, prevProps.nodeID);
        }
    }

    render() {
        return (
            <div className="containerInput">
                <span id="top">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                    >
                        <Icon type='plus' />
                        <div className="ant-upload-text">Upload Image</div>
                    </Upload>
                    <div className="title">
                        <h1>{this.props.nodeName}</h1>
                        <span>
                            <h1>Title</h1><TextArea id="title" autosize={{ minRows: 1, maxRows: 1}} />
                        </span>
                    </div>
                </span>
                <span id="middle">
                    <span>
                        <h1>Description</h1>
                        <h1 style={{marginTop: "52px"}}>Content</h1>
                    </span>
                    <span>
                        <TextArea id="desc" autosize={{ minRows: 4, maxRows: 4 }} />
                        <TextArea id="content" autosize={{ minRows: 4, maxRows: 4 }} />
                    </span>
                </span>
                <Button type="dashed">
                    <span>
                       <p>Add field</p> 
                    </span>
                </Button>
            </div>
        );
       
    }
}