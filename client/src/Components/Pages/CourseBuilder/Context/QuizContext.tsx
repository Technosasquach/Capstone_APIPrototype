import React, {useState, useContext} from 'react';

export enum Answer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface IQuestion {
  question: string;
  answer: Answer;
  answers: string[];
  removeable: boolean;
}

const initialState = {
    Quiz: [] as IQuestion[][],
    QuizSelected: [] as IQuestion[],
    Indexing: [] as any[],
    Save(id: number, question: string, answer: Answer, answers: string[], removeable: boolean): any {},
    Delete(id: number): any {},
    AddQuestion(): any {},
    AddQuiz(_index: number): any{},
    DeleteQuiz(_index: number): any{},
    checkIfRemove(_index: number): any{},
    getQuiz(_index: number): any{},
    findIndex(_index: number): any{}
};

import {StructureContext} from './StructureContext';

export const QuizContext = React.createContext(initialState);

interface quizindex {
  indexstructure: number;
  index: number;
}

const quizProvider = (props:any) => {
  const [Quiz, setQuiz] = useState([] as IQuestion[][]);
  const [Indexing, setIndexing] = useState([] as quizindex[]);
  const structureContext = useContext(StructureContext);

  const getQuiz = (index: number) => {
    const indexr = findIndex(index);
    if(indexr != -1) {
      return Quiz[indexr];
    } else {
      return [];
    }
  }

  const checkIfRemove = (index: number) => {
    if(findIndex(index) != -1) {
      DeleteQuiz(index);
    }
  }

  const AddQuiz = (index: number) => {
    const temp = [...Quiz];
    temp.push([{question: "", answer: Answer.A, answers: ["", "", "", ""], removeable: false}]);
    setQuiz(temp);
    const tempindex = [...Indexing];
    tempindex.push({index: tempindex.length, indexstructure: index});  
    setIndexing(tempindex);
  }

  const findIndex = (index: number) => {
    for(let i = 0; i < Indexing.length; i++) {
      if(Indexing[i].indexstructure === index) {
        return Indexing[i].index;
      }
    }
    return -1;
  }

  const DeleteQuiz = (index: number) => {
    const realIndex = findIndex(index);
    const temp = [...Quiz];
    temp.splice(realIndex, 1);
    setQuiz(temp);
    const tempindex = [];
    for(let i = 0; i < Indexing.length; i++) {
      tempindex.push({index: Indexing[i].index, indexstructure: Indexing[i].indexstructure});
    }
    for(let i = realIndex+1; i < tempindex.length; i++) {
      tempindex[i].index--;
    }
    tempindex.splice(realIndex, 1);
    setIndexing(tempindex);
    if(structureContext.Selected.index === index) {
      if(structureContext.Selected.type === 1) {
        structureContext.setSelected({index: index, type: 0});
      }
    }
  }

  const setQuestions = (data: IQuestion[]) => {
    const temp = [...Quiz];
    temp[findIndex(structureContext.Selected.index)] = data;
    setQuiz(temp);
  }

  const Save = (id: number, question: string, answer: Answer, answers: string[], removeable: boolean) => {
    const temp = [] as IQuestion[];
    const index = findIndex(structureContext.Selected.index);
    for(let i = 0; i < Quiz[index].length; i++) {
      temp.push({question: Quiz[index][i].question, answer: Quiz[index][i].answer, answers: Quiz[index][i].answers, removeable: Quiz[index][i].removeable});
    }
    temp[id] = {question: question, answer: answer, answers: answers, removeable: removeable};
    setQuestions(temp); 
  }
  
  const Delete = (id: number) => {
    const temp = [] as IQuestion[];
    const index = findIndex(structureContext.Selected.index);
    for(let i = 0; i < Quiz[index].length; i++) {
      temp.push({question: Quiz[index][i].question, answer: Quiz[index][i].answer, answers: Quiz[index][i].answers, removeable: Quiz[index][i].removeable});
    }
    temp.splice(id, 1);
    setQuestions(temp);
  }

  const AddQuestion = () => {
    const temp = [] as IQuestion[];
    const index = findIndex(structureContext.Selected.index);
    for(let i = 0; i < Quiz[index].length; i++) {
      temp.push({question: Quiz[index][i].question, answer: Quiz[index][i].answer, answers: Quiz[index][i].answers, removeable: Quiz[index][i].removeable});
    }
    temp.push({question: "", answer: Answer.A, answers: ["","","",""], removeable: true});
    setQuestions(temp);
  }

  return (
    <QuizContext.Provider value={{
      Quiz: Quiz,
      QuizSelected: Quiz[findIndex(structureContext.Selected.index)],
      Indexing: Indexing,
      Save,
      Delete,
      AddQuestion,
      AddQuiz,
      DeleteQuiz,
      checkIfRemove,
      getQuiz,
      findIndex,
    }}>
      {props.children}
    </QuizContext.Provider>
  )
};

export default quizProvider;