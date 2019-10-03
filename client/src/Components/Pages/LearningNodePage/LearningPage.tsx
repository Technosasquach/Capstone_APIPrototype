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
    text: string,
    keywords: string[],
    order: number,
    image: string
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
            //this.loadPageNodeData(nodeID);
            //this.loadNodeData(nodeID);
        }
    }

    loadInformationNodeData = async (id: string) => {
        let data2: any = {};
        data2['query'] = "query{informationByNodeId(nodeId: \"" + id + "\"){ id createdAt text nodeId image order }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data2).then(res => {
            this.setState({
            myInfoNode: res.data['data']['informationByNodeId']
        })
    }).then(
            () => this.state.myInfoNode
                ? this.loadCommentData(this.state.myInfoNode[0].id)
                : console.log("No InfoNode to display")
        );
    }

    // loadPageNodeData = async (id: string) => {
    //     let data2: any = {};
    //     data2['query'] = "query{pageForNodeId(NodeId: \"" + id + "\"){ content }}\n\n";
    //     await axios.post("http://localhost:3000/graphql/", data2).then(res => this.setState({
    //         myPageNode: res.data['data']['pageForNodeId']['content']
    //     })).then(()=> console.log(JSON.parse(this.state.myPageNode))
    //     );
    // }

    // loadNodeData = async (id: string) => {
    //     let data: any = {};
    //     data['query'] = "query{node(id: \"" + id + "\"){ id createdAt depth name json keywords parents children }}\n\n";
    //     await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
    //         myNode: res.data['data']['node']
    //     }));
    // }

    loadCommentData = async (infoNodeid: string) => {
        let data: any = {};
        data['query'] = "query{commentsForNode(infoNodeId: \"" + infoNodeid + "\"){ id createdAt contents infoNodeId }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
            myComments: res.data['data']['commentsForNode']
        }));
    }


    generateinfo = () => {
        const temp = [] as any[];
        for(let i = 0; i < this.state.myInfoNode.length; i++) {
            for(let j = 0; j < this.state.myInfoNode.length; j++) {
                if(this.state.myInfoNode[j].order == i) {
                    const item = this.state.myInfoNode[j];
                    temp.push(<div key={j} style={{display: "flex"}}><ReactMarkdown source={(item)['text']} />{item['image'] ? <img src={item['image']} style={{width: "100px", height: "100px"}}/> : ""}</div>)
                }
            }
        }
        return temp;
    }

    render() {
        //let convertedText : string;
        //{this.state ? (convertedText = this.state.myPageNode.content.stringify.toString()):(convertedText = " no data ") } 
        return (
            <div className="learningpage">
                <div className="contentregion">
                    {
                        this.state
                            ?
                            <div style={{ overflowWrap: 'break-word' }}>
                                <div className="right">
                                    {this.state.myInfoNode && <MakePost infoNodeId={this.state.myInfoNode[0].id} triggerUpdate={this.loadCommentData} />}
                                </div>
                                {this.state.myNode && <Title level={2}>{this.state.myNode.name}</Title>}
                                <div>
                                    {this.state.myInfoNode
                                        ? (
                                            this.generateinfo()
                                        )
                                        : (<Alert
                                            message="No information has been entered for this nodes"
                                            description="Please contact your supervisor."
                                            type="info"
                                            showIcon
                                        />)}
                                </div>
                                {this.state.myInfoNode && <Title level={4}>Comment Section</Title>}
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