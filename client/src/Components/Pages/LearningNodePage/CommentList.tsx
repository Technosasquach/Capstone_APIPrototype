import * as React from "react";
// import axios from "axios";
import Post from "./Post";
import "./CommentList.less";

import { List } from "antd";

// interface iProps {
//     infoNodeId: string;
// };
// interface iComments {
//     id: string;
//     contents: string;
// }
interface iProps {
    userComments: iComment[];
};
interface iComment {
    id: string;
    infoNodeId: string;
    // user: string;
    contents: string;
    createdAt: Date;
}

// interface iState {
//     userComments: iComments[];
// };

export default class CommentList extends React.Component<iProps, {}> {
    constructor(props: iProps) {
        super(props);
        // this.state = { userComments: [] };
    }

    // componentDidMount() {
    //     this.loadCommentData(this.props.infoNodeId);
    // }

    // loadCommentData = async (id: string) => {
    //     let data: any = {};
    //     data['query'] = "query{commentsForNode(infoNodeId: \"" + id + "\"){ id createdAt contents infoNodeId }}\n\n";
    //     await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
    //         userComments: res.data['data']['commentsForNode']
    //     }));
    // }

    render() {
        return (
            <div>
                {<List
                    className="comment-list"
                    header={`${this.props.userComments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={this.props.userComments}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Post comment={item.contents} />
                        </List.Item>
                    )}
                />}
            </div>
        );
    }
}
