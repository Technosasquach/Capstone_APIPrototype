import * as React from "react";
import axios from 'axios'
import { Alert } from 'antd'

import "./LearningPage.less";
import 'antd/dist/antd.css';

import LearningPageContent from './LearningPageContent';
import { RouteComponentProps } from "react-router-dom";
// import LearningPageDirectory from './LearningPageDirectory';
// import LearningPageTemp from './LearningPageTemp';

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
    keywords: string[]
}

interface iComment {
    node: string;
    user: string;
    contents: string;
    date: Date;
}

interface iProps extends RouteComponentProps {
    nodeID: string;
};

interface iState {
    myInfoNode: iInfoNode | null;
    myNode: iNode | null;
    myComments: iComment[] | null;
};

export default class LearningPage extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            myNode: null,
            myInfoNode: null,
            myComments: null
        }        
    }

    componentDidMount() {
        // The node id is passed as a state? object via a 'Link' 
        // see 'const columns' in SearchResults.tsx
        if (this.props.location.state != undefined) {
            const { nodeID } = this.props.location.state;
            this.loadInformationNodeData(nodeID);
            this.loadNodeData(nodeID);
        }        
    }

    loadInformationNodeData = async (id: string) => {
        let data2: any = {};
        data2['query'] = "query{informationByNodeId(nodeId: \"" + id + "\"){ id createdAt text nodeId }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data2).then(res => this.setState({
            myInfoNode: res.data['data']['informationByNodeId']
        }));
    }

    loadNodeData = async (id: string) => {
        let data: any = {};
        data['query'] = "query{node(id: \"" + id + "\"){ id createdAt depth name json keywords parents children }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
            myNode: res.data['data']['node']
        }));
    }

    render() {        
        return (
            <div className="learningpage">
                <div className="contentregion">
                    {
                        this.state.myNode != null && this.state.myInfoNode != null
                        ? <LearningPageContent
                        myInfoNode={this.state.myInfoNode}
                        myNode={this.state.myNode} />
                        :  <Alert
                            message="No nodes to display"
                            description="Please search for a node."
                            type="info"
                            showIcon />
                    }
                </div>
            </div>
        );
    }
}