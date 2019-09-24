import * as React from "react";

import { Input, Button, Icon, Upload } from 'antd';
import './Formfill.less';
const { TextArea } = Input;
import ExtendedFields from './ExtraFieldBuilder/ExtendedFields';

export default class Formfill extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: false
        }

        this.beforeUpload = this.beforeUpload.bind(this);
    }

    beforeUpload(file: any) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            var contents = e.target.result;
            this.setState({
                imageUrl: contents
            })
        };
        reader.readAsDataURL(file);
        return false;
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
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div className="containerInput">
                <span id="top">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                    >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
                        <TextArea id="content" autosize={{ minRows: 8, maxRows: 8 }} />
                    </span>
                </span>
                <ExtendedFields additions={this.props.additions}/>
                    <Button onClick={this.props.addAddition} type="dashed">
                        <span>
                        <p>Add field</p> 
                        </span>
                    </Button>
            </div>
        );
       
    }
}