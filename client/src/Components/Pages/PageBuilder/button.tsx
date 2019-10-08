import React, {useState, useEffect} from 'react';
import {Button} from 'antd'

import "./button.less"

const button = (props: any) => {
    const [Clicked, setClicked] = useState(false);
    const [Class, setClass] = useState("styleButton");

    const click = (e: any) => {
        e.preventDefault();
        setClicked(!Clicked);
        props.clicker(props.type);
    }

    useEffect(() => {
        if(Clicked) {
            setClass("styleButton");
        } else {
            setClass("styleButton");
        }
    }, [Clicked])

    return <Button className={Class} onMouseDown={click}>{props.children}</Button>
}

export default button;