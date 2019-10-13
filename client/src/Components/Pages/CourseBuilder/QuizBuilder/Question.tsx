import React, { useState, useContext, useEffect } from "react";

import {Input, Radio, Button} from 'antd';

import "./Question.less";
import {QuizContext} from './../Context/QuizContext';

enum IDTOINDEX{
    A = 0,
    B = 1,
    C = 2,
    D = 3
}

const Question = (props: any) => {
    const [Question, setQuestion] = useState(props.Question);
    const [AnswerState, setAnswerState] = useState(props.Answer);
    const [Checked, setChecked] = useState([false, false, false, false]);
    const [AnswerA, setAnswerA] = useState(props.Answers[0]);
    const [AnswerB, setAnswerB] = useState(props.Answers[1]);
    const [AnswerC, setAnswerC] = useState(props.Answers[2]);
    const [AnswerD, setAnswerD] = useState(props.Answers[3]);

    useEffect(() => {
        const temp = [...Checked];
        temp[+IDTOINDEX[props.Answer as IDTOINDEX]] = true;
        setChecked(temp);
    }, []);

    const quizContext = useContext(QuizContext);
    
    const Save = () => {
        quizContext.Save(props.id, Question, AnswerState, [AnswerA, AnswerB, AnswerC, AnswerD], props.Removeable);
    }

    const Delete = () => {
        quizContext.Delete(props.id);
    }

    const radioUpdate = (e: any) => {
        const temp = [false, false, false, false];
        temp[+IDTOINDEX[e.target.id]] = true;
        setChecked(temp);
        setAnswerState(e.target.id);
    }

    return (
        <div>
            {props.Removeable && <Button onClick={Delete} style={{float: "right"}}>X</Button>}
            <div className="questioncontainer">
                <div className="question">
                Question: <Input defaultValue={props.Question} onChange={res => setQuestion(res.target.value)}/>
                </div>
                <div className="answers">
                    <span className="topanswers">
                        <span className="answercontainer">
                            A:<Input defaultValue={props.Answers[0]} onChange={res => setAnswerA(res.target.value)}/>
                            <Radio checked={Checked[0]} onChange={radioUpdate} id="A" />
                        </span>
                        <span className="answercontainer">
                            B:<Input defaultValue={props.Answers[1]} onChange={res => setAnswerB(res.target.value)}/>
                            <Radio checked={Checked[1]} onChange={radioUpdate} id="B" />
                        </span>
                    </span>
                    <span className="bottomanswers">
                        <span className="answercontainer">
                            C:<Input defaultValue={props.Answers[2]} onChange={res => setAnswerC(res.target.value)}/>
                            <Radio checked={Checked[2]} onChange={radioUpdate} id="C" />
                        </span>
                        <span className="answercontainer">
                            D:<Input defaultValue={props.Answers[3]} onChange={res => setAnswerD(res.target.value)}/>
                            <Radio checked={Checked[3]} onChange={radioUpdate} id="D" />
                        </span>
                    </span>
                </div>
                <Button onClick={Save}>Save</Button>
            </div>
        </div>
    );
}


export default Question;