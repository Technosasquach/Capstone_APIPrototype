import * as React from "react";

import "./SignIn.less";
import 'antd/dist/antd.css';

import { Icon, Input, Button } from 'antd';
import Loader from "./../../Utility/Loader"

export class SignInPage extends React.Component<{ submitFunc: Function, errorMsg: string }, { username: string, password: string, isWaiting: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isWaiting: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            isWaiting: false
        })
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.props.submitFunc(this.state.username, this.state.password);
        this.setState({
            isWaiting: true
        })
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
                        <Loader loading={this.state.isWaiting}>
                            <Input 
                                prefix={
                                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                onChange={this.handleUsernameChange}
                                value={this.state.username}
                                placeholder="Username"
                            />
                            <Input
                                prefix={
                                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                onChange={this.handlePasswordChange}
                                value={this.state.password}
                                placeholder="Password"
                            />
                            { (this.props.errorMsg != "" && this.state.isWaiting == false) ? <div><span>{this.props.errorMsg}</span><br/></div> : undefined}
                            <Button type="primary" onClick={this.handleSubmit}>Submit</Button> Or <a href="">register now!</a>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
}