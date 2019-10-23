import React, {useState, useContext} from 'react';
import { Button } from 'antd';
import './Card.less';

import {QuizContext} from './../../Context/QuizContext';

const Carder = (props: any) => {
  const [Quiz, setQuiz] = useState(false);

  const quizContext = useContext(QuizContext);
  const select = () => {
    props.setSelected({index: 0, type: 0});
  }

  const selectquiz = () => {
    props.setSelected({index: 0, type: 1});
  }

  const updatequiz = () => {
    if(!Quiz) {
      quizContext.AddQuiz(0);
    } else {
      quizContext.DeleteQuiz(0);
    }
    setQuiz(!Quiz);
  }

    return (
      <div>
        <div className="cardMain">
          <span>
            {props.name}
            <Button onClick={select} className={"Selector"} style={props.Selected.index == 0 && props.Selected.type == 0 ? {backgroundColor: "#ADD8E6"} : {}}>></Button>
            <Button onClick={updatequiz} className={"Selector"}>{Quiz ? 'x' : '+'}</Button>
          </span>
        </div>
        {Quiz && <div className="quizcardMain">
          {props.name} Quiz
          <Button onClick={selectquiz} className={"Selector"} style={props.Selected.index == 0 && props.Selected.type == 1 ? {backgroundColor: "#ADD8E6"} : {}}>></Button>
        </div>}
      </div>
    );
}

export default Carder;