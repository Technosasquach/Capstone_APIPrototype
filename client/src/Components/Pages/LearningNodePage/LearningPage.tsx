import React, {useState, useEffect} from 'react';
import InfoDisplay from './../CourseDisplayPage/InfoDisplay/InfoDisplay';
import Loader from './../../Utility/Loader';
import axios from 'axios';

interface content {
    id: number;
    name: string;
    nodeID: string;
    text: string;
    images: string[];
}
  
interface who {
    id: string;
    username: string;
  }
  
  interface data {
    id: string;
    text: string;
    who: who;
    editable: boolean;
  }
  
  interface comment {
    id: number,
    nodeID: string;
    data: data[];
  }
const LearningPage = (props: any) => {
    const [Content, setContent] = useState({id: 0, name: "", nodeID: "", text: "", images: []} as content);
    const [Comments, setComments] = useState({id: 0, nodeID: "", data: []} as comment);
    const [Loading, setLoading] = useState(false);

    const addComment = (commentID: string, comment: string, id: string, username: string) => {
        const temp = {id: 0, nodeID: Comments.nodeID, data: [...Comments.data]};
        temp.data.push({id: commentID, text: comment, who: {id: id, username: username}, editable: true});
        setComments(temp);
    }

    const editComment = (index: number, data: any) => {
        const temp = {id: 0, nodeID: Comments.nodeID, data: [...Comments.data]};
        temp.data[index] = {...temp.data[index], ...data};
        setComments(temp);
    }

    const removeComment = (index: number) => {
        const temp = {id: 0, nodeID: Comments.nodeID, data: [...Comments.data]};
        temp.data.splice(index, 1);
        setComments(temp);
    }

    const CommentFunctions = [addComment, editComment, removeComment];

    const setUpContent = (name: string, info: any, comments: any) => {
        const content = {id: 0, name: "", nodeID: "", text: "", images: []} as content;
        const comment = {id: 0, nodeID: "", data: []} as comment;
        content.name = name;
        content.nodeID = props.match.params.id;
        for(let i = 0; i < info.length; i++) {
            if(info[i].type == "text") {
                content.text = info[i].data;
            } else {
                content.images = JSON.parse(info[i].data);
            }
        }
        for(let i = 0; i < comments.length; i++) {
            comment.data.push({id: comments[i].id, text: comments[i].contents, who: {id: comments[i].userID.id, username: comments[i].userID.username}, editable: comments[i].userID.editable});
        }
        setContent(content);
        setComments(comment);
    }

    useEffect(() => {
        getData();
    }, [props.match.params.id]);

    const getData = () => {
        setLoading(true);
        let data:any = {query:  "query{node(id: \"" + props.match.params.id + "\"){ name info { type data } comments { id contents userID { id username editable } } } }\n\n"};
        axios.post("http://localhost:3000/graphql/", data).then(res => {
          return {
            name: res.data.data.node.name,
            info: res.data.data.node.info,
            comments: res.data.data.node.comments
          };
        }).then(json => {
            setUpContent(json.name, json.info, json.comments);
            setLoading(false);
        })
    }

    if(Loading) {
        return <Loader/>
    } else {
        return <div style={{height: "100%", width: "100%", overflow: "auto"}}><InfoDisplay Content={Content} Comments={Comments} CommentFunctions={CommentFunctions}/></div>
    }
}

export default LearningPage;