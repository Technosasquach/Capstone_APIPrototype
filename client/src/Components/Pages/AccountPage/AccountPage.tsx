import * as React from "react";
import "./AccountPage.less";
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';
import CookieHandler from "../../../utils/clientCookies";
import AccountForm from "./AccountForm";

const username = CookieHandler.getCookie("username");
export default class AccountPage extends React.Component<any, any> {
    
    render() {
        return (
            <div className="AccountPage">
                <PageHeader
                    title="Account"
                    subTitle={username} />

                <AccountForm username={username}/>
            </div>
        );
    }
}