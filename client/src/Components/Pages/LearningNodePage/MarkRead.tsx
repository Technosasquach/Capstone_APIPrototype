import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

interface iProps {
    nodeId: string,
    // userName: string,
    // courseId: string
}

const MarkRead = (Props: iProps) => {

    const MarkAsRead = async () => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
            mutation AddLearnedNodeToUser($nodeId: String!){
                addLearnedNode(nodeId: $nodeId){
                    id
                }
            }`,
                variables: {
                    nodeId: Props.nodeId
                }
            }
        }).then(() => {
            console.log("User history updated");
        }).catch(() => {
            console.log("Something went wrong with updating the user document");
        });
    }




    return (
        <div>
            <Button type="primary" style={{ float: "right", marginLeft: "10px" }} onClick={MarkAsRead} >Mark as read</Button>

        </div>
    )
}

export default MarkRead
