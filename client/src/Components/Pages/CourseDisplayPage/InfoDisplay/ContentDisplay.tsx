import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageDisplayer from './ImageDisplayer';

import './ContentDisplay.less'

const ContentDisplay = (props: any) => {

    return props.Content ? 
        (
        <div className="contentContainer">
            <div className="markdownRegion">
                {props.Content.text && <ReactMarkdown source={props.Content.text}/>}
                {!props.Content.text && <div style={{width: "100%", textAlign: "center"}}><h1>No data set for this node</h1></div>}
            </div>
            <div className="imageRegion">
                <ImageDisplayer images={props.Content.images} />
            </div>
        </div>
        )
            : 
        <>Loading</>
}

export default ContentDisplay;