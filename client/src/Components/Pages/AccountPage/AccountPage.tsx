import * as React from "react";
import AccountDetails from "./AccountDetails";
import AccountPathways from "./AccountPathways";
import "./AccountPage.less";
import 'antd/dist/antd.css';

//import { Form } from 'antd';
//import { FormComponentProps } from 'antd/es/form';

//interface UserFormProps extends FormComponentProps {
//    age: number;
//    name: string;
//}

import { PageHeader, Tabs } from 'antd';

const { TabPane } = Tabs;


export default class AccountPage extends React.Component<any, any> {

    render() {
        return (
            <div className="AccountPage">
                <PageHeader
                    title="Account"
                    subTitle="Person Name"
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Personal Details" key="1">
                                <AccountDetails/>
                            </TabPane>
                            <TabPane tab="Learning Pathways" key="2">
                                <AccountPathways/>
                            </TabPane>
                        </Tabs>
                    }
                >
                    
                </PageHeader>

            </div>
        );
    }
}