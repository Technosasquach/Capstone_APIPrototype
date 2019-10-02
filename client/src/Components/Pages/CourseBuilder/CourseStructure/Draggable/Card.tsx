import React from 'react';
import { Button } from 'antd';

const style = {
    border: '1px solid grey',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
  }


const Carder = (props: any) => {
    const select = () => {
      props.setSelected({index: 0, type: 0});
    }

    return (
        <div style={{ ...style }}>
        <span>
        {props.name}
        <Button onClick={select} className={"Selector"}>></Button>
        <Button className={"Selector"}>+</Button>
        </span>
      </div>
    );
}

export default Carder;