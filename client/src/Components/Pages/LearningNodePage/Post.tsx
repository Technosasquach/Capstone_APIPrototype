import * as React from "react";
import { Comment } from "antd";

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

const Post: React.FC<iProps> = (props, { }) => {

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