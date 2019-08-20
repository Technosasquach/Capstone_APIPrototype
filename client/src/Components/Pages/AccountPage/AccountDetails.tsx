import * as React from "react";
import "./AccountDetails.less";
import 'antd/dist/antd.css';
import { Input, Button, Row, Col, Icon } from 'antd';

//import { Form } from 'antd';
//import { FormComponentProps } from 'antd/es/form';

//interface UserFormProps extends FormComponentProps {
//    age: number;
//    name: string;
//}




export default class AccountDetails extends React.Component<any, any> {

    render() {


        return (
            <div className="AccountDetailsPage">
                <div className="FormSectionTitle">
                    <div>
                        <h3>My Account details</h3>
                    </div>
                    <div>
                        <Icon type="edit" />
                    </div>
                </div>
                <hr />

                <Row className="myRow">
                    <Col span={6}>
                        <p>First Name:</p>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="First Name" size="large" />
                    </Col>
                </Row>
                <Row className="myRow">
                    <Col span={6}>
                        <p>Last Name:</p>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="Last Name" size="large" />
                    </Col>
                </Row>
                <Row className="myRow">
                    <Col span={6}>
                        <p>Email Address:</p>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="Email Address" size="large" />
                    </Col>
                </Row>
                <Row className="myRow">
                    <Col span={6}>
                        <p>Job Title:</p>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="Position in organisation" size="large" />
                    </Col>
                </Row>
                <Row className="myRow">
                    <Col span={6}>
                        <p>Phone Number:</p>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="Phone Number" size="large" />
                    </Col>
                </Row>
                <Row type="flex" justify="end" className="myRow">
                    <Col span={6}>
                    </Col>
                    <Col span={10}>
                        <Button type="primary">Submit</Button>
                    </Col>
                </Row>

                <div className="FormSectionTitle">
                    <div>
                        <h3>Update Password</h3>
                    </div>
                    <div>
                        <Icon type="edit" />
                    </div>
                </div>
                <hr />

                <Row className="myRow">
                    <Col span={6}>
                        <p>New Password:</p>
                    </Col>
                    <Col span={10}>
                        <Input.Password placeholder="New Password" visibilityToggle={true} size="large" />
                    </Col>
                </Row>
                <Row className="myRow">
                    <Col span={6}>
                        <p>Confirm Password:</p>
                    </Col>
                    <Col span={10}>
                        <Input.Password placeholder="Confirm Password" visibilityToggle={true} size="large" />
                    </Col>
                </Row>
                <Row type="flex" justify="end" className="myRow">
                    <Col span={6}>
                    </Col>
                    <Col span={10}>
                        <Button type="primary">Submit</Button>
                    </Col>
                </Row>


            </div>
        );
    }
}



