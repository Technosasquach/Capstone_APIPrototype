import React, { useState, useEffect } from 'react';
import './QuizDisplay.less';
import {Button} from 'antd';
enum Answer {
    A = 0,
    B = 1,
    C = 2,
    D = 3
}

enum Result {
    No = 0,
    Yes = 1,
    None = -1,
}

interface quiz {
    id: number;
    nodeID: string;
    question: string[];
    answer: Answer[];
    answers: string[][];
}

interface Iprops {
    Quiz: quiz;
    setProgress: (any: any) => any;
    Progress: any;
}


const defaultState = () => {
    return [Result.None, Result.None, Result.None, Result.None];
}

const QuizDisplay = (props: Iprops) => {
    const [Position, setPosition] = useState(0);
    const [CardState, setCardState] = useState(defaultState() as Result[]);
    const [Answers, setAnswers] = useState([-1]);

    console.log(props.Quiz);

    useEffect(() => {
        setUpQuiz();
    }, [props.Quiz]);

    const setUpQuiz = () => {
        setPosition(0);
        setCardState(defaultState());
    }

    const setAnswer = (state: number) => {
        const temp = Answers;
        Answers[Position] = state;
        setAnswers(temp);
    }

    const submitAnswer = (index: number) => {
        const cards = defaultState();
        if(index == +Answer[props.Quiz.answer[Position]]) {
            cards[index] = Result.Yes;
            setAnswer(1);
            setCardState(cards);
        } else {
            cards[index] = Result.No;
            setAnswer(0);
            setCardState(cards);
        }
    }

    const checkState = (index: number) => {
        switch (CardState[index]) {
            case Result.No:
                return {backgroundColor: "#ffcccc"}
            case Result.Yes:
                return {backgroundColor: "#ccffcc"}
            default:
                return {}
        }
    }

    const answer = (text: string, index: number) => {
        return (
            <div key={index} onClick={submitAnswer.bind(null, index)} className="quizQuestion" style={checkState(index)}>
                <h2>{text}</h2>
            </div>
        )
    }

    const ProgressState = (index: number, num: number) => {
        switch(Answers[index]) {
            case 0:
                return {backgroundColor: "#ffcccc", width: 100/num+"%"}
            case 1:
                return {backgroundColor: "#ccffcc", width: 100/num+"%"}
            default:
                return {width: 100/num+"%"}
        }
    }

    const Progress = (num: number) => {
        const array = Array.from(Array(num).keys()).map(x => x+1);
        return (
            <div className="ProgressContainer">
                {array.map(value => {
                    return <div key={value} className="ProgressItem" style={ProgressState(value-1, num)}>
                        {value}
                    </div>  
                })}
            </div>
        );
    }

    const Next = () => {
        setPosition(Position+1);
        setCardState(defaultState());
    }

    const Previous = () => {
        setPosition(Position-1);
        setCardState(defaultState());
    }

    return (
        props.Quiz && 
            <div className="QuizContainer">
            <h1 style={{marginLeft: "10%"}}>Quiz</h1>
            <div className="QuizContentContainer">
                <div className="quizHeader">
                    <h1>{props.Quiz.question[Position]} {Position > 0 && <Button onClick={Previous} style={{float: "right", marginRight:"5px"}}>Previous</Button>} {Position < props.Quiz.question.length-1 && Answers[Position] != -1 && <Button onClick={Next} style={{float: "right", marginRight: "5px"}}>Next ></Button>}</h1>
                </div>
                <div className="quizQuestionCenter">
                    {
                        props.Quiz.answers[Position].map((answerforquestion, index: number) => {
                            return answer(answerforquestion, index);
                        })
                    }        
                </div>
                {Progress(props.Quiz.question.length)}
            </div>
        </div>
    );
}

export default QuizDisplay;