import * as React from "react";

import "./ExtendedFields.less";
//import types from './types'

import { Input, Upload, Icon } from 'antd'

const { TextArea } = Input;


class ExtendedField extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  

  render() {
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
              >
                  <Icon type='plus' />
                  <div className="ant-upload-text">Upload Image</div>
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