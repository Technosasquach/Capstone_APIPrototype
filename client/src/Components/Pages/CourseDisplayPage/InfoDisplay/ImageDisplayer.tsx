import React from 'react';

import './ImageDisplayer.less'

const ImageDisplayer = (props: any) => {

    return (
    <div className="ImageContainer">
        <div className="CenterImages">
            {props.images && props.images.map((image: any, index: number) => {
                return <img key={index} src={image} />
            })}
            {props.images.length == 0 &&
                <h3>No images saved</h3>
            }
        </div>
    </div>
    );
}

export default ImageDisplayer;