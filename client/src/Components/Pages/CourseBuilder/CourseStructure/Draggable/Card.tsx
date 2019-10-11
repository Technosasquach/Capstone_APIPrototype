import React, {useState} from 'react';
import { Button } from 'antd';
import './card.less';

const Carder = (props: any) => {
  const [Quiz, setQuiz] = useState(false);
    const select = () => {
      props.setSelected({index: 0, type: 0});
    }

    const selectquiz = () => {
      props.setSelected({index: 0, type: 1});
    }

    const updatequiz = () => {
      setQuiz(!Quiz);
    }

    return (
      <div>
        <div className="cardMain">
          <span>
            {props.name}
            <Button onClick={select} className={"Selector"}>></Button>
            <Button onClick={updatequiz} className={"Selector"}>{Quiz ? 'x' : '+'}</Button>
          </span>
        </div>
        {Quiz && <div className="quizcardMain">
          {props.name} Quiz
          <Button onClick={selectquiz} className={"Selector"}>></Button>
        </div>}
      </div>
    );
}

export default Carder;