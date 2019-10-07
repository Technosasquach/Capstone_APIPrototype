import React, {useState} from 'react';
import { Button } from 'antd';

const style = {
    border: '1px solid grey',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
  }


  const quizstyle = {
    border: '1px solid grey',
    width: '90%',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
  }

const Carder = (props: any) => {
  const [Quiz, setQuiz] = useState(false);
    const select = () => {
      props.setSelected({index: 0, type: 0});
    }

    const updatequiz = () => {
      setQuiz(true);
    }

    return (
      <div>
        <div style={{ ...style }}>
          <span>
            {props.name}
            <Button onClick={select} className={"Selector"}>></Button>
            <Button onClick={updatequiz} className={"Selector"}>+</Button>
          </span>
        </div>
        {Quiz && <div style={{...quizstyle}}>
          {props.name} Quiz
        </div>}
      </div>
    );
}

export default Carder;