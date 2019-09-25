import * as React from "react";
import "./HomePage.less";
import { Button, Modal } from 'antd'

export default class HomePage extends React.Component<any, any> {
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = (e: any) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = (e: any) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };


    render() {
        return (
            <div className="HomePage">
                <h1>Home Page</h1>
                <Button type="primary" onClick={this.showModal}>
                Open Modal
                </Button>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}