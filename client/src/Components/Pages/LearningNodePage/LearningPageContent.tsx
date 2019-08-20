
import * as React from "react";

import "./LearningPageContent.less";
import { Breadcrumb, Rate } from 'antd';

export default class LearningPageContent extends React.Component<any, any> {
    
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Parent Parent</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Parent</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>PCP Pumps</Breadcrumb.Item>
                </Breadcrumb>
                <h1>PCP Pumps (updates title for node)</h1>
                <hr/>
                <h2>Description</h2>
                <p>This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. </p>
                <h2>Data</h2>
                <h2>Image</h2>
                <hr/>
                <h2>Comment Section</h2>
                <Rate />
            </div>
        );
    }
}