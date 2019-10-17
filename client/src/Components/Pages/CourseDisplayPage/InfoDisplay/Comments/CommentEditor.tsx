import React, {useState, useEffect} from 'react'
import {Button, Modal, Input} from 'antd';
import axios from 'axios';
const {TextArea} = Input;

const CommentEditor = (props: any) => {
    const [Visible, setVisible] = useState(false);
    const [Ref, setRef] = useState();

    useEffect(() => {
        if(Ref) {
            Ref.textAreaRef.value = props.Comment;
        }
    }, [props.Comment])

    const submitComment = async (id: string, comment: string, userID: string) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation EditCommentForNode($id: String!, $comment: String!, $userID: String!){
                    updateComment(id: $id, contents: $comment, userID: $userID) {
                        contents
                        userID {
                            id
                            username
                        }
                      }
                  }`,
                variables: {
                    id: id,
                    comment: comment,
                    userID
                }
            }
        }).then((res: any) => {
            return {
                text: res.data.data.updateComment.contents,
                id: res.data.data.updateComment.userID.id,
                username: res.data.data.updateComment.userID.username
            };
        }).catch((res) => {
            console.log(res);
            return null;
        });
    }

    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = async (e: any) => {
        if(Ref.textAreaRef.value) {
            const temp = await submitComment(props.id, Ref.textAreaRef.value, props.userID);
            if(temp) {
                props.editComment(props.index, {text: temp.text, who: {id: temp.id, username: temp.username}})
            }
        } else {
            Ref.textAreaRef.value = props.Comment;
        }
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
        <Button type="primary" style={{float: "right", marginLeft: "10px"}} onClick={showModal} >Edit Comment</Button>
        <Modal
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            Edit comment
            <TextArea
                ref={setRef} 
                style={{width: "500px", height:"auto"}}
                autosize={{ minRows: 6, maxRows: 6 }}
                defaultValue={props.Comment}
            />
        </Modal>
        </>
    );
}

export default CommentEditor;