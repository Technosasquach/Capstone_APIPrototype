
import * as React from "react";


import 'antd/dist/antd.css';
import { Row, Col, Card, Input } from 'antd';

import "./Example_2.less";


export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="dashboardContainer">
                <Row>
                    <Col span={17}>
                        <h1>Learning Page Title</h1>
                        <hr/>
                        <h4>Last Updated on April 14, 2019 at 11:27 PM</h4>
                        <hr/>
                        <img src="http://placehold.it/900x300" alt="None" style={{width:"100%"}}/>
                        <hr/>
                        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>
                    </Col>
                    <Col span={6} push={1}>
                        <Card title="Search" style={{ width: '100%'}}>
                            <Input placeholder="Search for..." />
                        </Card>
                        <Card title="Related Components" extra={<a href="#">More</a>} style={{ width: '100%', marginTop: '5px'}}>
                            <p><a>Parent Component</a></p>
                            <p><a>Child Component</a></p>
                            <p><a>Sibling Component</a></p>
                        </Card>    
                        <Card title="Basic info - Side Widget" extra={<a href="#">More</a>} style={{ width: '100%', marginTop: '5px'}}>
                            <p>Example Description</p>
                            <p>Example Description</p>
                            <p>Example Description</p>
                        </Card>        
                    </Col>
                </Row>
            </div>
        );
    }
}