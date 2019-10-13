import React, {useState} from 'react'
import {Button, Modal, Input} from 'antd';
import axios from 'axios';
const {TextArea} = Input;

const CommentCreator = (props: any) => {
    const [Visible, setVisible] = useState(false);
    const [Ref, setRef] = useState();
    const submitComment = async (nodeID: string, comment: string) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation CreateCommentForNode($infoNodeId: String!, $comment: String!){
                    addComment(infoNodeId: $infoNodeId, contents: $comment) {
                        infoNodeId
                        contents
                      }
                  }`,
                variables: {
                    infoNodeId: nodeID,
                    comment: comment
                }
            }
        }).then(() => {
            return 1;
        }).catch(() => {
            return -1;
        });
    }

    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = (e: any) => {
        if(Ref.textAreaRef.value) {
            const temp = submitComment(props.nodeID, Ref.textAreaRef.value);
            if (temp) {
                props.addComment(Ref.textAreaRef.value);
            }
        }
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
        <Button onClick={showModal} >Make Post</Button>
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