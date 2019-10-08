import React, {useState, useEffect} from 'react';
import './BlockStyleButton.less';

const BlockStyleButton = (props: any) => {
    const onToggle = (e: any) => {
        e.preventDefault()
        props.onToggle(props.style)
    }
    const [ClassName, setClassName] = useState("RichEditor-styleButton");
    useEffect(() => {
        if (props.active) {
            setClassName("RichEditor-styleButton RichEditor-activeButton")
        } else {
            setClassName("RichEditor-styleButton");
        }
    }, [props.active])

    return (
        <span className={ClassName} onClick={onToggle}>
            {props.label}
        </span>
    );
}

export default BlockStyleButton;