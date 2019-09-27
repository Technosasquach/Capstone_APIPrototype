import * as React from "react";

import "./SignIn.less";
import 'antd/dist/antd.css';

import { Icon, Input, Button } from 'antd';

export class SignInPage extends React.Component<{ submitFunc: Function }, { username: string, password: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.props.submitFunc(this.state.username, this.state.password);
    }

    handleUsernameChange(event: any) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event: any) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div className="SignInContainer">
                <div className="SignIn">
                    <div className="SignInLeft">
                        <span>SynLERN</span>
                    </div>
                    <div className="SignInRight">
                        <Input 
                            prefix={
                                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                            onChange={this.handleUsernameChange}
                            value={this.state.username}
                            placeholder="username"
                        />
                        <Input
                            prefix={
                                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                            placeholder="password"
                        />
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}