import * as React from "react";
import axios from 'axios'

import "./LearningPage.less";
import 'antd/dist/antd.css';

import LearningPageContent from './LearningPageContent';
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

interface iProps {
    nodeID: string;
};

interface iState {
    myNode: iNode;
    myComments: iComment[];
};

export default class LearningPage extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        console.log("props");
        console.log(props);
    }
    public static defaultProps = {
        nodeID: "5cfc7581caac652374526d2d"
    }


    componentDidMount() {

        console.log("mounted: running GraphQL query");
        this.loadNodeData(this.props.nodeID);

    }

    loadNodeData = async (id: string) => {
        let data: any = {};
        // let nodeFromDB: iNode;

        data['query'] = "query{node(id: \"" + id + "\"){ id createdAt depth name json keywords parents children }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
            myNode: res.data['data']['node']
        }));
    }


    render() {
        return (
            <div className="learningpage">
                <div className="contentregion">
                    {this.state != null
                        ? <LearningPageContent theNode={this.state.myNode} />
                        : <p>Loading...</p>
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