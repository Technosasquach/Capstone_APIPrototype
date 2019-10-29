import * as React from 'react'

import { SignInPage } from "./../Pages/SignInPage/SignIn";
import { SignUpPage } from "./../Pages/SignInPage/SignUp";
import Axios from 'axios';
import * as qs from "querystring";
import CookieHandler from '../../utils/clientCookies';
import { EUserAuthLevel } from "./../../../../server/src/database/users"
import Particles from 'react-particles-js';

export const AuthContext = React.createContext({
    isSignUp: false,
    isAuthorized: true,
    errorMsg: "",
    isAdmin: false
});

export default class AuthProvider extends React.Component<any, { isSignUp: boolean, isAuthorized: boolean, errorMsg: string, isAdmin: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            isSignUp: false,
            isAuthorized: true,
            errorMsg: "",
            isAdmin: true,
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
                            errorMsg: "Login has expired, please login again"
                        })
                    } else {
                        console.log("[AuthProvider] JWT Valid, authorizing...");
                        this.setState({
                            isAuthorized: true,
                            errorMsg: "",
                            isAdmin: result.data.tokenInformation.accessLevel == "ADMIN" || result.data.tokenInformation.accessLevel == "OPERATOR",
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
                    isSignUp: false,
                    isAdmin: false,
                }
            }
        } catch {
            console.log("[AuthProvider] Bad JWT Exists, forcing login");
            this.state = {
                isAuthorized: false,
                errorMsg: "",
                isSignUp: false,
                isAdmin: false,
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
                    isAuthorized: true,
                    isAdmin: result.data.tokenInformation.accessLevel == "ADMIN" || result.data.tokenInformation.accessLevel == "OPERATOR"
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
                    isAuthorized: true,
                    isAdmin: result.data.tokenInformation.accessLevel == "ADMIN" || result.data.tokenInformation.accessLevel == "OPERATOR"
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
            return <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>
        } else {
            return <div className="authContainer">
                { this.state.isSignUp ? (
                    <SignUpPage submitFunc={this.userSignUp} errorMsg={this.state.errorMsg} signUpBtn={this.switchSignIn} />
                ) : (
                    <SignInPage submitFunc={this.userSubmission} errorMsg={this.state.errorMsg} signUpBtn={this.switchSignIn} />
                ) }
                <div className="bg">
                    <Particles params={{
                    "particles": {
                        "number": {
                        "value": 100,
                        "density": {
                            "enable": false,
                            "value_area": 1000
                        }
                        },
                        "color": {
                        "value": "#ffffff"
                        },
                        "shape": {
                        "type": "circle",
                        "polygon": {
                            "nb_sides": 3
                        },
                        },
                        "opacity": {
                        "value": 0.43246706442958394,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.3,
                            "sync": false
                        }
                        },
                        "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 31.635045140775965,
                            "sync": false
                        }
                        },
                        "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                        },
                        "move": {
                        "enable": true,
                        "speed": 3.2034597365154363,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "resize": true
                        },
                        "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                            "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 231.17917602874746,
                            "size": 8.1115500360964,
                            "duration": 2
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                        }
                    }
                    }}/>
                </div>
            </div>
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