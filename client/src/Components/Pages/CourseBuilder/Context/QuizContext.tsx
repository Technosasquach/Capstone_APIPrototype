import React, {useState} from 'react';

import {IQuestion} from './../QuizBuilder/QuizBuilder'

const initialState = {
    Quiz: [] as IQuestion[][],
    setQuiz(_data: any): any {},
};

export const QuizContext = React.createContext(initialState);

const quizProvider = (props:any) => {
  const [Quiz, setQuiz] = useState([[{question: "", answer: "NULL", answers: [], removeable: false}]] as IQuestion[][])

  return (
    <QuizContext.Provider value={{
      Quiz: Quiz,
      setQuiz: setQuiz,
    }}>
      {props.children}
    </QuizContext.Provider>
  )
};

export default quizProvider;