import * as React from 'react'

import { SignInPage } from "./../Pages/SignInPage/SignIn";
import Axios from 'axios';
import * as qs from "querystring";
import CookieHandler from '../../utils/clientCookies';

export default class AuthProvider extends React.Component<any, { isAuthorized: boolean, errorMsg: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isAuthorized: true,
            errorMsg: ""
        }

        // Check to see if the JWT token exists
        // Cant check for JWT as its HTTP only for security reasons
        const token = CookieHandler.getCookie("jwt");
        try {
            if(token.length > 1) { // A token exists
                console.log("[AuthProvider] JWT Exists, testing validity");
                Axios({
                    url: "/auth/verifyToken", 
                    method: "post",
                }).then((result: any) => {
                    if(result.data.isValid == false) {
                        console.log("[AuthProvider] JWT not valid, forcing login");
                        this.setState({
                            isAuthorized: false,
                            errorMsg: "JWT Token has expired, please login again"
                        })
                    } else {
                        console.log("[AuthProvider] JWT Valid, authorizing...");
                        this.setState({
                            isAuthorized: true,
                            errorMsg: ""
                        });
                    }
                }).catch((err: any) => {
                    console.log("[AuthProvider] JWT Validation Axios request failed");
                    console.log(err);
                })
            } else {
                console.log("[AuthProvider] No JWT Exists, forcing login");
                this.state = {
                    isAuthorized: false,
                    errorMsg: ""
                }
            }
        } catch {
            console.log("[AuthProvider] Bad JWT Exists, forcing login");
            this.state = {
                isAuthorized: false,
                errorMsg: ""
            }
        }

        this.userSubmission = this.userSubmission.bind(this);
    }

    componentDidMount() {
        
    }

    userSubmission(username: string, password: string) {
        console.log("[AuthProvider] User has submitted auth request with credentials: ", username, password);

        setTimeout(() => {

            Axios({
                url: "/auth/verifyUser", 
                method: "post",
                data: qs.stringify({ username, password }), 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((result: any) => {
                if(result.data.isValid == false) {
                    console.log("[AuthProvider] Username / Password not valid, forcing login login");
                    this.setState({
                        errorMsg: "Something is wrong with your credentials"
                    })
                } else {
                    console.log("[AuthProvider] Username / Password valid, authorizing");
                    this.setState({
                        isAuthorized: true
                    })
                }
                
            }).catch((err: any) => {
                console.log("[AuthProvider] Username / Password Axios request failed");
                console.log(err);
            })
        }, Math.random() * 500);

    }

    onCookieChange() {

    }

    render() {
        if (this.state.isAuthorized) {
            return this.props.children
        } else {
            return <SignInPage submitFunc={this.userSubmission} errorMsg={this.state.errorMsg}/>
        }
    }
}

// const cookieRegistry: any = [];

// function listenCookieChange(cookieName: string, callback: Function) {
//     setInterval(function() {
//         if (cookieRegistry[cookieName]) {
//             if (CookieHandler.getCookie(cookieName) != cookieRegistry[cookieName]) {
//                 cookieRegistry[cookieName] = CookieHandler.getCookie(cookieName);
//                 return callback();
//             }
//         } else {
//             cookieRegistry[cookieName] = CookieHandler.getCookie(cookieName);
//         }
//     }, 100)
// }