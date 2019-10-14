import * as React from 'react'

import { SignInPage } from "./../Pages/SignInPage/SignIn";
import { SignUpPage } from "./../Pages/SignInPage/SignUp";
import Axios from 'axios';
import * as qs from "querystring";
import CookieHandler from '../../utils/clientCookies';
import { EUserAuthLevel } from "./../../../../server/src/database/users"


export default class AuthProvider extends React.Component<any, { isSignUp: boolean, isAuthorized: boolean, errorMsg: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isSignUp: false,
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
                    errorMsg: "",
                    isSignUp: false
                }
            }
        } catch {
            console.log("[AuthProvider] Bad JWT Exists, forcing login");
            this.state = {
                isAuthorized: false,
                errorMsg: "",
                isSignUp: false
            }
        }

        this.userSubmission = this.userSubmission.bind(this);
        this.userSignUp = this.userSignUp.bind(this);
        this.switchSignIn = this.switchSignIn.bind(this);
    }

    userSubmission(username: string, password: string) {
        console.log("[AuthProvider] User has submitted auth request with credentials: ", username, password);

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
    }

    userSignUp(username: string, password: string) {
        console.log("[AuthProvider] Registering User: ", username, password);
        Axios({
            url: "/auth/users/create", 
            method: "post",
            data: qs.stringify({ username, password, accessLevel: EUserAuthLevel.USER }), 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((result: any) => {
            if(result.data.isValid == false) {
                console.log("[AuthProvider] Creation of user failed: " + JSON.stringify(result.data));
                this.setState({
                    errorMsg: "Something is wrong with your credentials"
                });
            } else {
                console.log("[AuthProvider] Creation of user valid");
                this.setState({
                    isAuthorized: true
                });
            }
        }).catch((err: any) => {
            console.log("[AuthProvider] Creation of user errored");
            console.log(err);
        })
    }

    switchSignIn() {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }

    render() {
        if (this.state.isAuthorized) {
            return this.props.children
        } else {
            if (this.state.isSignUp) {
                return <SignUpPage submitFunc={this.userSignUp} errorMsg={this.state.errorMsg} signUpBtn={this.switchSignIn} />
            } else {
                return <SignInPage submitFunc={this.userSubmission} errorMsg={this.state.errorMsg} signUpBtn={this.switchSignIn} />
            }
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