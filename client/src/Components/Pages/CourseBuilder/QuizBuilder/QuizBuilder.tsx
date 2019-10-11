import React, {useState} from "react";

import Question from './Question';
import {Button} from 'antd';


import "./QuizBuilder.less";

export enum Answer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  NULL = "NULL"
}

interface IQuestion {
  question: string;
  answer: Answer;
  answers: string[];
  removeable: boolean;
}

const QuizBuilder = (props: any) => {
  const [Questions, setQuestions] = useState([{question: "", answer: "NULL", answers: [], removeable: false}] as IQuestion[]);

  const Save = (id: number, question: string, answer: Answer, answers: string[], removeable: boolean) => {
    const temp = [] as IQuestion[];
    for(let i = 0; i < Questions.length; i++) {
      temp.push({question: Questions[i].question, answer: Questions[i].answer, answers: Questions[i].answers, removeable: Questions[i].removeable});
    }
    temp[id] = {question: question, answer: answer, answers: answers, removeable: removeable};
    setQuestions(temp);
  }
  
  const Delete = (id: number) => {
    const temp = [] as IQuestion[];
    for(let i = 0; i < Questions.length; i++) {
      temp.push({question: Questions[i].question, answer: Questions[i].answer, answers: Questions[i].answers, removeable: Questions[i].removeable});
    }
    temp.splice(id, 1);
    setQuestions(temp);
  }

  const AddQuestion = () => {
    const temp = [] as IQuestion[];
    for(let i = 0; i < Questions.length; i++) {
      temp.push({question: Questions[i].question, answer: Questions[i].answer, answers: Questions[i].answers, removeable: Questions[i].removeable});
    }
    temp.push({question: "", answer: "NULL" as Answer, answers: [], removeable: true});
    setQuestions(temp);
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      {Questions.map((question: IQuestion, index: Number) => {
        return <Question 
        key={index} 
        id={index} 
        Save={Save} 
        Delete={Delete}
        Question={question.question}
        Answer={question.answer}
        Answers={question.answers}
        Removeable={question.removeable}
        />
      })}
      <div style={{margin: "0px auto",marginTop: "50px", width: "120px", height: "50px"}}>
        <Button onClick={AddQuestion}>Add Question</Button>
      </div>
    </div>
  );
}


export default QuizBuilder;