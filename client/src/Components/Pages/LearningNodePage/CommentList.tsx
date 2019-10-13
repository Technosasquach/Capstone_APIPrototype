import * as React from "react";
// import axios from "axios";
import Post from "./Post";
import "./CommentList.less";

import { List } from "antd";

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


export default class CommentList extends React.Component<any, {}> {
    constructor(props: iProps) {
        super(props);
        // this.state = { userComments: [] };
    }


    render() {
        return (
            <div>
                {<List
                    className="comment-list"
                    header={`${this.props.userComments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={this.props.userComments}
                    renderItem={(item: any) => (
                        <List.Item key={item.key}>
                            <Post comment={item.name} />
                        </List.Item>
                    )}
                />}
            </div>
        );
    }
}
