import * as React from 'react'
import CookieHandler from "./../../utils/clientCookies";

export default class IsAdmin extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (CookieHandler.getCookie('accessLevel') == "ADMIN") {
            return this.props.children
        } else {
            return ""
        }
    }
}