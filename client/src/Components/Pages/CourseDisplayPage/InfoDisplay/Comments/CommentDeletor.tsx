import React from 'react'
import {Button} from 'antd';
import axios from 'axios';

const CommentDeletor = (props: any) => {

    const deleteCall = async (id: string, userID: string) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                mutation CreateCommentForNode($id: String!, $userID: String!){
                    deleteComment(id: $id, userID: $userID) {
                        contents
                        userID {
                            id
                            username
                        }
                      }
                  }`,
                variables: {
                    id: id,
                    userID: userID
                }
            }
        }).then((res: any) => {
            return true;
        }).catch(() => {
            return null;
        });
    }

    const deleteClick = () => {
        const temp = deleteCall(props.id, props.userID);
        if(temp) {
            props.removeComment(props.index);
        }
    }
    
    return (
        <Button type="primary" style={{float: "right", marginLeft: "10px"}} onClick={deleteClick} >Delete Comment</Button> 
    );
}

export default CommentDeletor;