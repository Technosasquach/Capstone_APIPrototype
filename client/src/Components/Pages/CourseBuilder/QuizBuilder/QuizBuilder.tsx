import React, {useContext, useState, useEffect} from "react";

import Question from './Question';
import {Button} from 'antd';

import {QuizContext, IQuestion} from './../Context/QuizContext';

import "./QuizBuilder.less";

const QuizBuilder = (props: any) => {
  const [Render, setRender] = useState(true);
  const quizContext = useContext(QuizContext);

  useEffect(() => {
    setRender(false);
  }, [quizContext.QuizSelected]);

  useEffect(() => {
    setRender(true);
  }, [Render])

  return (
    <div style={{width: "100%", height: "100%"}}>
      {Render && quizContext.QuizSelected.map((question: IQuestion, index: Number) => {
        return <Question 
        key={index} 
        id={index} 
        Question={question.question}
        Answer={question.answer}
        Answers={question.answers}
        Removeable={question.removeable}
        />
      })}
      <div style={{margin: "0px auto",marginTop: "50px", width: "120px", height: "50px"}}>
        <Button onClick={quizContext.AddQuestion}>Add Question</Button>
      </div>
    </div>
  );
}


export default QuizBuilder;