import * as React from 'react'

import { SignInPage } from "./../Pages/SignInPage/SignIn";

export interface AuthPeople {
    username: string,
    password: string
}

export const AuthedPeople: AuthPeople[] = [
    {
        username: "test",
        password: "test",
    },
    {
        username: "hello",
        password: "world"
    }
]

export default class Loader extends React.Component<any, { isAuthorized: boolean, errorMsg: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isAuthorized: true,
            errorMsg: ""
        }

        this.userSubmission = this.userSubmission.bind(this);
    }

    userSubmission(username: string, password: string) {
        console.log("[AuthProvider] User has submitted auth request with credentials: ", username, password);
        let isAuthed = false;
        for(let i = 0; i < AuthedPeople.length; i++){
            if(AuthedPeople[i].username == username  && AuthedPeople[i].password == password) {
                isAuthed = true;
            }
        }

        setTimeout(() => {
            if(isAuthed) {
                this.setState({
                    isAuthorized: true
                })
            } else {
                this.setState({
                    errorMsg: "Incorrect Username or Password"
                })
            }
        }, 1 + 1000 * Math.random())

        
    }

    render() {
        if (this.state.isAuthorized) {
            return this.props.children
        } else {
            return <SignInPage submitFunc={this.userSubmission} errorMsg={this.state.errorMsg}/>
        }
    }
}