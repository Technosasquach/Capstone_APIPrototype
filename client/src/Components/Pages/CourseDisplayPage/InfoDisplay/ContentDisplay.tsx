import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageDisplayer from './ImageDisplayer';

import './ContentDisplay.less'

const ContentDisplay = (props: any) => {

    return props.Content ? 
        (
        <div className="contentContainer">
            <div className="markdownRegion">
                <ReactMarkdown source={props.Content.text}/>
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