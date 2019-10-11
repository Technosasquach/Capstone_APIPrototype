import * as React from "react";
import axios from 'axios'
import { Alert } from 'antd'
import { Rate } from 'antd';
import MakePost from "./CommentCreate";
import CommentList from "./CommentList";
import { Typography } from 'antd';
import "./LearningPage.less";
import 'antd/dist/antd.css';
const { Title } = Typography;
const ReactMarkdown = require('react-markdown');

import { RouteComponentProps } from "react-router-dom";


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

interface iInfoNode {
    id: string,
    createdAt: Date,
    nodeId: string,
    data: string,
    keywords: string[],
    type: string,
}

// interface iPageNode {
//     content: string;
//     text: string;
// }

interface iComment {
    id: string;
    infoNodeId: string;
    // user: string;
    contents: string;
    createdAt: Date;
}

interface iProps extends RouteComponentProps {
    nodeID: string;
};

interface iState {
    myInfoNode: iInfoNode[];
    myNode: iNode;
    myComments: iComment[];
    myPageNode: string;
};

export default class LearningPage extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
    }

    componentDidMount() {
        // The node id is passed as a state? object via a 'Link' 
        // see 'const columns' in SearchResults.tsx
        if (this.props.location.state != undefined) {
            const { nodeID } = this.props.location.state;
            this.loadInformationNodeData(nodeID);
        }
    }

    loadInformationNodeData = async (id: string) => {
        let data2: any = {};
        data2['query'] = "query{informationByNodeId(nodeId: \"" + id + "\"){ id createdAt data nodeId type }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data2).then(res => {
            this.setState({
            myInfoNode: res.data['data']['informationByNodeId']
        })
    }).then(
            () => this.state.myInfoNode
                ? this.loadCommentData(this.props.location.state.nodeID)
                : console.log("No InfoNode to display")
        );
    }

    loadCommentData = async (infoNodeid: string) => {
        let data: any = {};
        data['query'] = "query{commentsForNode(infoNodeId: \"" + infoNodeid + "\"){ id createdAt contents infoNodeId }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
            myComments: res.data['data']['commentsForNode']
        }));
    }

    generateText = () => {
        for(let i = 0; i < this.state.myInfoNode.length; i++) {
            if(this.state.myInfoNode[i].type === "text") {
                return <ReactMarkdown source={this.state.myInfoNode[i].data} />
            }
        }
        return undefined;
    }

    generateImages = () => {
        for(let i = 0; i < this.state.myInfoNode.length; i++) {
            if(this.state.myInfoNode[i].type === "images") {
                const images = JSON.parse(this.state.myInfoNode[i].data) as string[];
                return images.map((image: string, index: number) => {
                    return <img key={index} src={image}/>
                })
            }
        }
        return undefined;
    }

    returner = () => {
        const text = this.generateText();
        const images = this.generateImages();
        const temp = (
            <div className="content">
                {text && <div className="textregion">{text}</div>}
                {images && <div className="imageregion">{images}</div>}
            </div>
        )
        if(text || images) {
            return temp;
        } else {
            return (<Alert
                message="No information has been entered for this node"
                description="Please contact your supervisor."
                type="info"
                showIcon
            />)
        }
    }

    render() {
        return (
            <div className="learningpage">
                <div className="contentregion">
                    {
                        this.state
                            ?
                            <div style={{ overflowWrap: 'break-word' }}>
                                <div className="right">
                                    {this.state.myInfoNode && <MakePost infoNodeId={this.props.location.state.nodeID} triggerUpdate={this.loadCommentData} />}
                                </div>
                                {this.state.myNode && <Title level={2}>{this.state.myNode.name}</Title>}
                                <div>
                                    {this.state.myInfoNode
                                        ? (
                                            this.returner()
                                        )
                                        : (<Alert
                                            message="No information has been entered for this nodes"
                                            description="Please contact your supervisor."
                                            type="info"
                                            showIcon
                                        />)}
                                </div>
                                {this.state.myInfoNode && <Title style={{marginTop: "5px"}} level={4}>Comment Section</Title>}
                                <hr />
                                {this.state.myComments && <CommentList userComments={this.state.myComments} />}
                                <Rate />
                            </div>
                            :
                            <Alert
                                message="No nodes to display"
                                description="Please search for a node."
                                type="info"
                                showIcon
                            />
                    }
                </div>
            </div>
        );
    }
}