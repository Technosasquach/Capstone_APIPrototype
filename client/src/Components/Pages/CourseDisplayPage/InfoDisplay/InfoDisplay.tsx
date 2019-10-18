  
import React from 'react';
import ContentDisplay from './ContentDisplay';
import CommentList from './Comments/CommentList';
import CommentCreator from './Comments/CommentCreator';
import { Typography} from 'antd';
const { Title } = Typography;
import './InfoDisplay.less'

const InfoDisplay = (props: any) => {
    return props.Content ? (
        <div className="infoContainer">
            <Title level={1}>{props.Content.name}</Title>
            <hr style={{marginBottom: "15px"}}/>
            <ContentDisplay Content={props.Content}/>
            <hr style={{marginTop: "15px", marginBottom: "30px"}}/>
            {props.Comments ? (
                <div className="commentRegion">
                    <Title level={4}>Comment Section</Title>
                    <CommentList editComment={props.CommentFunctions[1]} removeComment={props.CommentFunctions[2]} Comments={props.Comments} />
                    <CommentCreator addComment={props.CommentFunctions[0]} nodeID={props.Content.nodeID} />
                </div>
            ) : "" }
        </div>
    ) : <span>Loading</span>
    
}

export default InfoDisplay;