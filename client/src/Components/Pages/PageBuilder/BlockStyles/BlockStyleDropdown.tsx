import React from 'react';

import './BlockStyleDropdown.less'

const BlockStyleDropdown = (props: any) => {
    const onToggle = (event: any) => {
        let value = event.target.value
        props.onToggle(value)
    }

    return (
        <select value={props.active} onChange={onToggle}>
          <option value="">Header Levels</option>
          {props.headerOptions.map((heading: any, index: number) => {
            return (
              <option key={index} value={heading.style}>
                {heading.label}
              </option>
            )})}
        </select>
    )
}

export default BlockStyleDropdown;