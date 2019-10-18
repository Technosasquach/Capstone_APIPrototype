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
                {!props.Content.text && <h3>No data set for this node</h3> }
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