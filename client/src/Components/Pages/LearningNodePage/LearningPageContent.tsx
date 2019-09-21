import * as React from "react";
import "./LearningPageContent.less";
import { Rate } from 'antd';
import MakePost from "./CommentCreate";
import CommentList from "./CommentList";
import { Typography } from 'antd';

const { Title } = Typography;
const ReactMarkdown = require('react-markdown');

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
    }
    
    render() {
        return (
            <div style={{ overflowWrap: 'break-word' }}>
                <div className="right">
                    <MakePost nodeID={this.props.theNode.id}/>
                </div>
                <Title level={2}>{this.props.theNode.name}</Title>
                <div>
                    {this.props ? (<ReactMarkdown source={this.props.theNode.json} />) : (<ReactMarkdown source=" " />)}
                </div>
                <Title level={4}>Comment Section</Title>
                <hr />
                <CommentList nodeID={this.props.theNode.id}/>
                <Rate />
            </div>
        );
    }
}