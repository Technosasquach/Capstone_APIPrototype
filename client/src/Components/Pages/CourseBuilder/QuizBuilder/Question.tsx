import React, {useState} from "react";

import {Input, Radio, Button} from 'antd';

import "./Question.less";
import {Answer} from './QuizBuilder';

const Question = (props: any) => {
    const [Question, setQuestion] = useState("");
    const [Answer, ] = useState("NULL" as Answer);
    const [AnswerA, setAnswerA] = useState("");
    const [AnswerB, setAnswerB] = useState("");
    const [AnswerC, setAnswerC] = useState("");
    const [AnswerD, setAnswerD] = useState("");
    
    const Save = () => {
        props.Save(props.id, Question, Answer, [AnswerA, AnswerB, AnswerC, AnswerD]);
    }

    const Delete = () => {
        props.Delete(props.id);
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
                            <Radio />
                        </span>
                        <span className="answercontainer">
                            B:<Input defaultValue={props.Answers[1]} onChange={res => setAnswerB(res.target.value)}/>
                            <Radio />
                        </span>
                    </span>
                    <span className="bottomanswers">
                        <span className="answercontainer">
                            C:<Input defaultValue={props.Answers[2]} onChange={res => setAnswerC(res.target.value)}/>
                            <Radio />
                        </span>
                        <span className="answercontainer">
                            D:<Input defaultValue={props.Answers[3]} onChange={res => setAnswerD(res.target.value)}/>
                            <Radio />
                        </span>
                    </span>
                </div>
                <Button onClick={Save}>Save</Button>
            </div>
        </div>
    );
}


export default Question;