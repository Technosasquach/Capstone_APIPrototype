import * as React from "react";
// import axios from "axios";
import Post from "./Post";
import "./CommentList.less";

import { List } from "antd";

const CommentList = (props: any) => {

    return (
        <div>
            {<List
                className="comment-list"
                header={`${props.Comments.data.length} replies`}
                itemLayout="horizontal"
                dataSource={props.Comments.data}
                renderItem={(item: any, index: number) => {return (
                    <List.Item key={index}>
                        <Post index={index} commentEdit={props.editComment} commentDelete={props.removeComment} who={item.who} text={item.text} editable={item.editable} id={item.id} />
                    </List.Item>
                )}}
            />}
        </div>
    );
}

export default CommentList;