import * as React from 'react'

import { SignInPage } from "./../Pages/SignInPage/SignIn";

export default class Loader extends React.Component<any, { isAuthorized: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isAuthorized: false
        }

        this.userSubmission = this.userSubmission.bind(this);
    }

    userSubmission(username: string, password: string) {
        console.log("[AuthProvider] User has submitted auth request with credentials: ", username, password);
        this.setState({
            isAuthorized: true
        })
    }

    render() {
        if (this.state.isAuthorized) {
            return this.props.children
        } else {
            return <SignInPage submitFunc={this.userSubmission}/>
        }
    }
}