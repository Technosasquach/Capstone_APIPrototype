import React, {useEffect, useState} from "react";
import {Button} from 'antd';
import Loader from './../../Utility/Loader';
import axios from 'axios';

import InfoDisplay from './InfoDisplay/InfoDisplay';
import QuizDisplay from './QuizDisplay/QuizDisplay';

import "./CourseDisplayPage.less"

interface card {
  id: number;
  name: string;
  type: number;
}

interface content {
  id: number;
  name: string;
  nodeID: string;
  text: string;
  images: string[];
}

interface comment {
  id: number,
  nodeID: string;
  text: string[];
}

enum Answer {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

interface quiz {
  id: number;
  nodeID: string;
  question: string[];
  answer: Answer[];
  answers: string[][];
}

interface map {
  index: number;
  type: number;
}

const CourseDisplayPage = (props: any) => {
  const [Loading, setLoading] = useState(false);
  const [CourseName, setCourseName] = useState("");
  const [IndexMap, setIndexMap] = useState([{index: 0, type: 0}] as map[]);
  const [Cards, setCards] = useState([] as card[]);
  const [Content, setContent] = useState([] as content[]);
  const [Comments, setComments] = useState([] as comment[]);
  const [Quizzes, setQuizzes] = useState([] as quiz[]);
  const [Selected, setSelected] = useState({id: 0, type: 0});
  const [Progress, setProgress] = useState();

  useEffect(() => {
    getData();
  }, [props.match.params.id])

  const searchForQuiz = (id: string, quizzes: quiz[]) => {
    for(let i = 0; i < quizzes.length; i++) {
      if(quizzes[i].nodeID == id) {
        return quizzes[i];
      }
    }
    return null;
  }

  const setUpCards = (nodes: any[], data: any[], quizzes: quiz[]) => {
    const cards = [] as card[];
    const index = [] as map[];
    const content = data[0];
    const comments = data[1];
    for(let j = 0; j < content.length; j++) {
      const cont = content[j];
      index.push({index: cont.id, type: 0} as map);
      let temp = searchForQuiz(cont.nodeID, quizzes);
      if(temp) {
        index.push({index: temp.id, type: 1});
      }
    }
    for(let i = 0; i < index.length; i++) {
      cards.push({id: i, name: index[i].type == 0 ? findName(content[index[i].index].nodeID, nodes) : findName(quizzes[index[i].index].nodeID, nodes) + " Quiz" , type: index[i].type });
    }
    setIndexMap(index);
    setCards(cards);
    setContent(content);
    setComments(comments);
    setQuizzes(quizzes);
  }

  const findName = (nodeID: string, nodes: any[]) => {
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].id == nodeID) {
        return nodes[i].name;
      }
    }
    return "";
  }

  const findInfoForNodeID = (nodeID: string, info: any) => {
    const temp = ["", []];
    for(let i = 0; i < info.length; i++) {
      let done = false;
      for(let j = 0; j < info[i].length; j++) {
        if(info[i][j].nodeId == nodeID) {
          if(info[i][j].type == "text") {
            temp[0] = info[i][j].data;
          } else {
            temp[1] = JSON.parse(info[i][j].data);
          }
          done = true;
        } else {
          break;
        }
      }
      if (done) {
        break;
      }
    }
    return temp;
  }

  const findCommentForNode = (nodeID: string, comment: any): string[] => {
    const temp = [] as string[];
    for (let i = 0; i < comment.length; i++) {
      for(let j = 0; j < comment[i].length; j++) {
        if (comment[i][j].infoNodeId == nodeID) {
          temp.push(comment[i][j].contents);
        } else {
          break;
        }
      }
    }
    return temp;
  }

  const setUpContent = (nodes: any, info: any, comments: any) => {
    const content = [] as content[];
    const comment = [] as comment[];
    for(let i = 0; i < nodes.length; i++) {
      const info4node = findInfoForNodeID(nodes[i].id, info);
      content.push({id: i, nodeID: nodes[i].id, text: (info4node[0] as string), images: (info4node[1] as string[]), name: nodes[i].name})
      const comment4node = findCommentForNode(nodes[i].id, comments);
      comment.push({id: i, nodeID: nodes[i].id, text: comment4node} as comment);
    }
    return [content, comment];
  }

  const setUpQuizzes = (quizzes: any) => {
    const quiz = [] as quiz[];
    for(let i = 0; i < quizzes.length; i++) {
      quiz.push({id: i, nodeID: quizzes[i].nodeID, question: quizzes[i].questions, answer: quizzes[i].answer, answers: quizzes[i].answers} as quiz)
    }
    return quiz;
  }

  const setUpProgress = () => {

  }

  const getData = () => {
    setLoading(true);
    setCourseName("Loading Data");
    let data:any = {query:  "query{course(id: \"" + props.match.params.id + "\"){name nodes {id name} quizzes {nodeID questions answers answer} info { nodeId type data } comments {infoNodeId contents}}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        name: res.data.data.course.name,
        nodes: res.data.data.course.nodes,
        quizzes: res.data.data.course.quizzes,
        info: res.data.data.course.info,
        comments: res.data.data.course.comments
      };
    }).then(json => {
      setCourseName(json.name);
      setUpCards(json.nodes, setUpContent(json.nodes, json.info, json.comments), setUpQuizzes(json.quizzes));
      setUpProgress();
      setLoading(false);
    })
  }

  const addComment = (comment: string) => {
    const temp = [...Comments];
    temp[IndexMap[Selected.id].index].text.push(comment);
    setComments(temp);
  }

  const card = (name: string, index: number, type: number) => {
    const setselected = () => {
      setSelected({id: index, type: type});
    }
    return (<div key={index} className={type ? "quizcardMain" : "cardMain"}>
      <span>
        {name}
        <Button onClick={setselected} className={"Selector"}>></Button>
      </span>
    </div>);
  }

  if(Loading) {
    return <Loader />
  } else {
    return (
      <div className="coursepage">
        <div className="stuctureregion">
          <h1>{CourseName}</h1>
            <div className="cardRegion">
              {Cards && Cards.map(Card => {
                return card(Card.name, Card.id, Card.type);
              })}
          </div>
        </div>
        <div className="selectregion">
          {Selected.type ? 
            <QuizDisplay Quiz={Quizzes[IndexMap[Selected.id].index]} setProgress={setProgress} Progress={Progress}/>
            :
            <InfoDisplay Content={Content[IndexMap[Selected.id].index]} Comments={Comments[IndexMap[Selected.id].index]} addComment={addComment} setProgress={setProgress} Progress={Progress}/> }
        </div>
      </div>
    );
  }
}


export default CourseDisplayPage;