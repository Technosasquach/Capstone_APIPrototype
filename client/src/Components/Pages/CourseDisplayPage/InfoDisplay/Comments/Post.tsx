import * as React from "react";
import { Comment } from "antd";

import CommentDeletor from './CommentDeletor';
import CommentEditor from './CommentEditor';

import IsAdmin from "./../../../../Utility/IsAdmin";

const ReactMarkdown = require('react-markdown')

// interface iPost {
//     _id: string,
//     node: string,
//     user: string,
//     contents: string,
//     date: Date
// }
interface iProps {
    index: number,
    who: {id: string, username: string},
    text: string,
    editable: boolean,
    id: string,
    commentEdit?: () => void,
    commentDelete?: () => void
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" }

const Post: React.FC<iProps> = (props, { }) => {
    const user = props.who.username;
    const data = <ReactMarkdown source={props.text} />;
    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%", backgroundColor: "white"}}>
                <Comment
                    author={user}
                    content={data}
                    datetime={<span>{new Date(12030512).toLocaleDateString('en-GB', options)}</span>}
                />
                {props.editable && <div style={{display: "flex"}}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent:"right", padding: "15px", borderRadius: "15px"}}>
                        <CommentEditor index={props.index} editComment={props.commentEdit} Comment={props.text} id={props.id} userID={props.who.id}/>
                        <IsAdmin>
                            <CommentDeletor index={props.index} removeComment={props.commentDelete} id={props.id} userID={props.who.id}/>
                        </IsAdmin>
                    </div>
                </div>}
            </div>
        </React.Fragment>
    );
};
export default Post;