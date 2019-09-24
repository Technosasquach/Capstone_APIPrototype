import * as React from "react";

import "./ExtendedFields.less";
//import types from './types'

import { Input, Upload, Icon } from 'antd'

const { TextArea } = Input;


class ExtendedField extends React.Component<any, any> {
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



  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
      return (
        <div id="containerExtend">
          <span id="spanExtend">
            <Input placeholder={"Content Title"} />
            <TextArea id="content" autosize={{ minRows: 4, maxRows: 4 }} />
          </span>
          <span id="uploadExtend">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
            >
            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </span>
        </div>
      );
  }
}

export default class PageBuilderPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  
  renderAddition = () => {
    return (
      <ExtendedField/>
    );
  }

  render() {
      return (
        <div>{this.props.additions.map(() => this.renderAddition())}</div>
      );
  }
}