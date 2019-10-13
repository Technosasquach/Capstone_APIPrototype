import React from 'react';
import ContentDisplay from './ContentDisplay';
import CommentList from './Comments/CommentList';
import CommentCreator from './Comments/CommentCreator';
import {Button, Typography} from 'antd';
const { Title } = Typography;
import './InfoDisplay.less'

const InfoDisplay = (props: any) => {

    return props.Content ? 
        (
        <div className="infoContainer">
            <Title style={{marginBottom: "10px"}} level={1}>{props.Content.name}</Title>
            <ContentDisplay Content={props.Content}/>
            {props.Comments ?
                (<div className="commentRegion">
                    <Title style={{marginTop: "10px"}} level={4}>Comment Section</Title>
                    <div style={{display: "flex", width: "100%"}}>
                        <div style={{width: "95%"}}>
                            <CommentList userComments={props.Comments} />
                        </div>
                        <CommentCreator addComment={props.addComment} nodeID={props.Content.nodeID} />
                    </div>
                </div>)
                 : 
                <></>
            }
            <Button className="nextButton" >Next</Button>
        </div>
        )
            : 
        <>Loading</>
    
}

export default InfoDisplay;