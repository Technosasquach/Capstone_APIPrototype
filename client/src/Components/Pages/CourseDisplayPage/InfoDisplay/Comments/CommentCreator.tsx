import React, {useState} from 'react'
import {Button, Modal, Input} from 'antd';
import axios from 'axios';
const {TextArea} = Input;

const CommentCreator = (props: any) => {
    const [Visible, setVisible] = useState(false);
    const [Ref, setRef] = useState();


    const submitComment = async (nodeID: string, comment: string) => {
        console.log(nodeID);
        console.log(comment);
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation CreateCommentForNode($infoNodeId: String!, $comment: String!){
                    addComment(infoNodeId: $infoNodeId, contents: $comment) {
                        id
                        contents
                        userID {
                            id
                            username
                        }
                      }
                  }`,
                variables: {
                    infoNodeId: nodeID,
                    comment: comment,
                }
            }
        }).then((res: any) => {
            return {
                id: res.data.data.addComment.id,
                text: res.data.data.addComment.contents,
                userID: res.data.data.addComment.userID.id,
                username: res.data.data.addComment.userID.username
            };
        }).catch(() => {
            return null;
        });
    }

    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = async (e: any) => {
        if(Ref.textAreaRef.value) {
            const temp = await submitComment(props.nodeID, Ref.textAreaRef.value);
            if (temp) {
                props.addComment(temp.id, temp.text, temp.userID, temp.username);
                Ref.textAreaRef.value = "";
            } else {
                window.alert("Invalid Comment");
                Ref.textAreaRef.value = "";
            }
        }
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
        <Button type="primary" onClick={showModal} >Make Post</Button>
        <Modal
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            Input comment
            <TextArea
            ref={setRef} 
            style={{width: "500px", height:"auto"}}
            autosize={{ minRows: 6, maxRows: 6 }}
            />
        </Modal>
        </>
    );
}

export default CommentCreator;