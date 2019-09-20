import * as React from "react";
// import axios from "axios";
import Post from "./Post";
import "./CommentList.less";

// import { List } from "antd";

interface iProps {
    nodeID: string;
};

interface iState {
    posts: string[];
};

export default class CommentList extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = { posts: [] };
    }

    //   componentDidMount() {
    //     axios.get("/api/postings").then(res => {
    //       const temp = res.data.filter(obj => obj.node === this.props.nodeID);
    //       this.setState({ posts: temp });
    //     });
    //   }

    componentWillMount() {
        let posts : string[] = new Array;
        posts.push('{ "_id": "1", "userComment": "## My comment 1 \\n\\n --- \\n\\n A list \\n\\n* Item 1\\n* Item 2\\n* Item 3" }'); 
        posts.push('{ "_id": "2", "userComment": "### An h3 header ### \\n\\n --- \\n\\n A table \\n\\n ID | Name | Country \\n --- | --- | --- \\n 1 | Alice | Australia \\n 2 | Barry | Bangladesh \\n 3 | Charles | Canary Islands \\n" }'); 
        posts.push('{ "_id": "3", "userComment": "## My comment 3 \\n\\n ---" }'); 
        posts.push('{ "_id": "4", "userComment": "## My comment 4 \\n\\n ---" }');
        this.setState({posts: posts});
        
    }

    render() {
        return (
            <div>
                {/* <List
          className="comment-list"
          header={`${this.state.posts.length} replies`}
          itemLayout="horizontal"
          dataSource={this.state.posts}
          renderItem={item => (
            <li>
              <Post key={item._id} comment={item} />
            </li>
          )}
        /> */}
        <ul>
                    {this.state && this.state.posts.map(post => (
                        <Post key={post} comment={post} />
                        // <li key={post._id}>{post.contents}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
