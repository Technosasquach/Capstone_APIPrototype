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
    _id?: string,
    comment: string,
}

const Post: React.FC<iProps> = (props) => {
   
    const post = JSON.parse(props.comment);
 
    //   const { _id, node, user, contents, date } = post;
    // const {userComment} = post;

    // console.log(post.userComment);
    
    const user = "Username";
    const data = <ReactMarkdown source={post.userComment} />;
    return (
        <div>
            <Comment
                author={user}
                content={data}
            />
        </div>

    );
};
export default Post;