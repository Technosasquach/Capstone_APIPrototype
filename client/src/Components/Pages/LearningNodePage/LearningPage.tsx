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
  
interface comment {
    id: number,
    nodeID: string;
    text: string[];
}

const LearningPage = (props: any) => {
    const [Content, setContent] = useState({id: 0, name: "", nodeID: "", text: "", images: []} as content);
    const [Comments, setComments] = useState({id: 0, nodeID: "", text: []} as comment);
    const [Loading, setLoading] = useState(false);

    const addComment = (Comment: string) => {
        const temp = {id: 0, nodeID: Comments.nodeID, text: Comments.text};
        temp.text.push(Comment);
        setComments(temp);
    }

    const setUpContent = (name: string, info: any, comments: any) => {
        const content = {id: 0, name: "", nodeID: "", text: "", images: []} as content;
        const comment = {id: 0, nodeID: "", text: []} as comment;
        content.name = name;
        for(let i = 0; i < info.length; i++) {
            if(info[i].type == "text") {
                content.text = info[i].data;
            } else {
                content.images = JSON.parse(info[i].data);
            }
        }
        for(let i = 0; i < comments.length; i++) {
            comment.text.push(comments[i].contents);
        }
        setContent(content);
        setComments(comment);
    }

    useEffect(() => {
        getData();
    }, [props.match.params.id]);

    const getData = () => {
        setLoading(true);
        let data:any = {query:  "query{node(id: \"" + props.match.params.id + "\"){name info { type data } comments { contents }}}\n\n"};
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
        return <div style={{height: "100%", width: "100%", overflow: "auto"}}><InfoDisplay Content={Content} Comments={Comments} addComment={addComment}/></div>
    }
}

export default LearningPage;