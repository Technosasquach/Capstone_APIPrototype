import * as React from "react";

import "./SignIn.less";
import 'antd/dist/antd.css';

import { Icon, Input, Button } from 'antd';
const ButtonGroup = Button.Group;
import Loader from "./../../Utility/Loader"

import * as CookieHandler from "./../../../utils/clientCookies";

export class SignInPage extends React.Component<{ submitFunc: Function, errorMsg: string }, { username: string, password: string, isWaiting: boolean, hasAcceptedCookies: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isWaiting: false,
            hasAcceptedCookies: CookieHandler.default.getCookie("gdpr") == "true" ? true : false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCookieAcceptance = this.handleCookieAcceptance.bind(this);
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

    handleCookieAcceptance(event: any) {
        event.preventDefault();
        // Set the cookie
        CookieHandler.default.setCookie("gdpr", "true", 1000);
        this.setState({
            hasAcceptedCookies: true
        })
    }

    render() {
        return (
            <div className="SignInContainer">
                <div className="SignIn">
                    <div className="SignInLeft">
                        <span>SynLERN</span>
                    </div>
                    { this.state.hasAcceptedCookies ? 
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
                    :
                        <div className="SignInRight">
                            <p>This site uses cookies. To comply with the European <a href="https://gdpr-info.eu/">General Data Protection Regulation (GDPR)</a> we must ask you to accept us using cookies. <br/> You will not be able to use this service without them</p>
                            <ButtonGroup>
                                <Button type="primary" onClick={this.handleCookieAcceptance}>Accept</Button>
                                <Button type="danger" >Reject</Button>
                            </ButtonGroup>
                        </div>
                    }
                </div>
            </div>
        );
    }
}