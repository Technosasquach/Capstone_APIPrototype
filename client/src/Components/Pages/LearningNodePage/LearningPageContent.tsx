import * as React from "react";
import "./LearningPageContent.less";
import { Breadcrumb, Rate } from 'antd';
import MakePost from "./CommentCreate";
import CommentList from "./CommentList";
const ReactMarkdown = require('react-markdown')

interface iNode {
    id: string,
    createdAt: Date,
    depth: Number,
    name: string,
    json: string,
    keywords: string[],
    parents: string[],
    children: string[]
}

interface iComment {
    node: string;
    user: string;
    contents: string;
    date: Date;
}

interface iProps {
    theNode: iNode;
};

interface iState {
    myNode: iNode;
    myComments: iComment[];
};


export default class LearningPageContent extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        console.log("ctor learning page content");
        console.log(props);
    }
    
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
                <div className="right">
                    <MakePost nodeID={this.props.theNode.id}/>
                </div>
                <h1>{this.props.theNode.name}</h1>
                <hr />
                <h2>Description</h2>
                {this.props ? (<ReactMarkdown source={this.props.theNode.json} />) : (<ReactMarkdown source=" " />)}
                <h2>Data</h2>
                <h2>Image</h2>
                <hr />
                <h2>Comment Section</h2>
                <CommentList nodeID={this.props.theNode.id}/>
                {/* <CommentList nodeID="5d69ec97f8bb921aacd38d23"/> */}
                <Rate />
            </div>
        );
    }
}