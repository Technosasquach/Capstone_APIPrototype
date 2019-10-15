import * as React from "react";
// import AccountDetails from "./AccountDetails";
// import AccountPathways from "./AccountPathways";
import "./AccountPage.less";
import 'antd/dist/antd.css';

//import { Form } from 'antd';
//import { FormComponentProps } from 'antd/es/form';

//interface UserFormProps extends FormComponentProps {
//    age: number;
//    name: string;
//}

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