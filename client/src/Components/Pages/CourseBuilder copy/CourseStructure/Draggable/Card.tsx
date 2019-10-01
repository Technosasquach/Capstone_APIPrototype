import React from 'react';
import { Button } from 'antd';

const style = {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
  }

const Carder = (props: any) => {
    return (
        <div style={{ ...style }}>
        <span>
        {props.name}
        <Button className={"Selector"}>></Button>
        <Button className={"Selector"}>+</Button>
        </span>
      </div>
    );
}

export default Carder;