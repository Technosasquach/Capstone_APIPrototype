import * as React from "react";

import "./SignIn.less";
import 'antd/dist/antd.css';

import { Icon, Input, Button } from 'antd';
import Loader from "./../../Utility/Loader"

export class SignUpPage extends React.Component<{ submitFunc: Function, errorMsg: string, signUpBtn: Function }, { username: string, password: string, phoneNumber: string, isWaiting: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            phoneNumber: "",
            isWaiting: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            isWaiting: false
        })
    }

    handleSubmit(event: any) {
        event.preventDefault();
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

    handleSignUp(event: any) {
        event.preventDefault();
        this.props.signUpBtn();
    }

    render() {
        if(this.state.isWaiting) {
            return <Loader/>
        }
        return (
            <div className="SignInContainer">
                <div className="SignIn">
                    <div className="SignInLeft">
                        <div className="SignInLeftCenter">
                            <img src="/public/favicon.png"/>
                            <span>Syn|LERN</span>
                        </div>
                    </div>
                    <div className="SignInRight">
                            <span>SignUp!</span>
                            <hr/>
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
                                type="password"
                                placeholder="Password"
                            />
                            { (this.props.errorMsg != "" && this.state.isWaiting == false) ? <div><span className="errorMsg">{this.props.errorMsg}</span><br/></div> : undefined}
                            <Button type="primary" onClick={this.handleSubmit}>Create User!</Button> Or <a onClick={this.handleSignUp}>Back to sign in</a>
                    </div>
                </div>
                <div className="bitwise">
                    <span>Made By: <b>BitWise Productions</b></span>
                    <br/>
                    <a href="mailto:bitwiseproductions.team@gmail.com">bitwiseproductions.team@gmail.com</a>
                </div>
            </div>
        );
    }
}