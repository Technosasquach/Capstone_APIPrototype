import React from 'react';

import {ContentBlock} from 'draft-js';
import BlockStyleButton from './BlockStyleButton';
import BlockStyleDropdown from './BlockStyleDropdown'


export const BLOCK_TYPES = [
	{ label: " “ ” ", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
	{ label: "{ }", style: "code-block" }
];

export const HEADER_TYPES = [
	{ label: "(None)", style: "unstyled" },
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" },
	{ label: "H4", style: "header-four" },
	{ label: "H5", style: "header-five" },
	{ label: "H6", style: "header-six" }
];

export function getBlockStyle(block: ContentBlock) {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote" as string;
        default:
            return "" as string;
    }
}

const BlockStyleToolBar = (props: any) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

    return (
            <div>
                <span className="RichEditor-controls">
                    <BlockStyleDropdown
                        headerOptions={HEADER_TYPES}
                        active={blockType}
                        onToggle={props.onToggle}
                    />
                    
                    {BLOCK_TYPES.map((type) => {
                        return (
                            <BlockStyleButton
                                active={type.style === blockType}
                                label={type.label}
                                onToggle={props.onToggle}
                                style={type.style}
                                key={type.label}
                                type={type}
                                />
                            );
                        })}
                </span>
            </div>
       );
}

export default BlockStyleToolBar;