import * as React from "react";
import axios from "axios";
import Post from "./Post";
import "./CommentList.less";

import { List } from "antd";

interface iProps {
    infoNodeId: string;
};

interface iComments{
    id: string;
    contents: string;
}

interface iState {
    userComments: iComments[];
};

export default class CommentList extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = { userComments: [] };
    }

    componentDidMount() {
        // axios.get("/api/postings").then(res => {
        //     const temp = res.data.filter(obj => obj.node === this.props.nodeID);
        //     this.setState({ posts: temp });
        // });
        this.loadCommentData(this.props.infoNodeId);
    }

    loadCommentData = async (id: string) => {
        let data: any = {};
        data['query'] = "query{commentsForNode(infoNodeId: \"" + id + "\"){ id createdAt contents infoNodeId }}\n\n";
        await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
            userComments: res.data['data']['commentsForNode']
        }));
    }


    // componentWillMount() {
    //     let posts: string[] = new Array;
    //     posts.push('{ "_id": "1", "userComment": "## My comment 1 \\n\\n --- \\n\\n A list \\n\\n* Item 1\\n* Item 2\\n* Item 3" }');
    //     posts.push('{ "_id": "2", "userComment": "### An h3 header ### \\n\\n --- \\n\\n A table \\n\\n ID | Name | Country \\n --- | --- | --- \\n 1 | Alice | Australia \\n 2 | Barry | Bangladesh \\n 3 | Charles | Canary Islands \\n" }');
    //     posts.push('{ "_id": "3", "userComment": "## My comment 3 \\n\\n ---" }');
    //     posts.push('{ "_id": "4", "userComment": "## My comment 4 \\n\\n ---" }');
    //     this.setState({ userComments: posts });

    // }

    render() {
        console.log(this.state.userComments);
        console.log(this.props.infoNodeId);
        
        return (
            <div>
                {<List
                    className="comment-list"
                    header={`${this.state.userComments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={this.state.userComments}
                    renderItem={item => (
                        <List.Item key={item.id}>
                          <Post comment={item.contents} />
                        </List.Item>
                    )}
                />}
                {/* <ul>
                    {this.state && this.state.posts.map(post => (
                        <Post key={post} comment={post} />
                        // <li key={post._id}>{post.contents}</li>
                    ))}
                </ul> */}
            </div>
        );
    }
}
