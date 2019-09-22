import * as React from "react";
import { Comment } from "antd";

// import "../post.css";

// const ReactDOM = require('react-dom')
const ReactMarkdown = require('react-markdown')

// interface iPost {
//     _id: string,
//     node: string,
//     user: string,
//     contents: string,
//     date: Date
// }
interface iProps {
    comment: string,
}

const Post: React.FC<iProps> = (props, {}) => {
    
    //const post = JSON.parse(props.comment);
 
    //   const { _id, node, user, contents, date } = post;
    // const {userComment} = post;

    // console.log(post.userComment);
    
    const user = "Username";
    const data = <ReactMarkdown source={props.comment} />;
    return (
        <React.Fragment>
            <Comment
                author={user}
                content={data}
            />
        </React.Fragment>

    );
};
export default Post;