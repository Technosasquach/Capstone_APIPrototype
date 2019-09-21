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
    myNode: iNode | null;
    myComments: iComment[] | null;
};

export default class LearningPage extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            myNode: null,
            myComments: null
        }

    }

    componentDidMount() {
        // The node id is passed as a state? object via a 'Link' 
        // see 'const columns' in SearchResults.tsx
        if (this.props.location.state != undefined) {
            const { nodeID } = this.props.location.state;
            this.loadNodeData(nodeID);
        }
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
                    {this.state.myNode == null
                        ? <Alert
                            message="No nodes to display"
                            description="Please search for a node."
                            type="info"
                            showIcon />
                        : <LearningPageContent
                            theNode={this.state.myNode} />
                    }
                </div>
                <div className="dualcontent">
                    {/* <div className="directory">
                        <LearningPageDirectory/>
                    </div>
                    <div className="temp">
                        <LearningPageTemp/>
                    </div> */}
                </div>
            </div>
        );
    }
}