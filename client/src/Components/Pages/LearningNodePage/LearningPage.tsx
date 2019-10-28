
import React, { useState, useEffect } from 'react';
import InfoDisplay from './../CourseDisplayPage/InfoDisplay/InfoDisplay';
import Loader from './../../Utility/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import MarkRead from './MarkRead';
import IsAdmin from "./../../Utility/IsAdmin"

import "./LearningPage.less";

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
    createdAt: string;
}

interface comment {
    id: number,
    nodeID: string;
    data: data[];
}

const LearningPage = (props: any) => {
    const [Content, setContent] = useState({ id: 0, name: "", nodeID: "", text: "", images: [] } as content);
    const [Comments, setComments] = useState({ id: 0, nodeID: "", data: [] } as comment);
    const [Loading, setLoading] = useState(false);
    const [Parents, setParents] = useState([] as any[]);
    const [Children, setChildren] = useState([] as any[]);

    const addComment = (commentID: string, comment: string, id: string, username: string, createdAt: string) => {
        const temp = { id: 0, nodeID: Comments.nodeID, data: [...Comments.data] };
        temp.data.push({ id: commentID, text: comment, who: { id: id, username: username }, editable: true , createdAt: createdAt});
        setComments(temp);
    }

    const editComment = (index: number, data: any) => {
        const temp = { id: 0, nodeID: Comments.nodeID, data: [...Comments.data] };
        temp.data[index] = { ...temp.data[index], ...data };
        setComments(temp);
    }

    const removeComment = (index: number) => {
        const temp = { id: 0, nodeID: Comments.nodeID, data: [...Comments.data] };
        temp.data.splice(index, 1);
        setComments(temp);
    }

    const CommentFunctions = [addComment, editComment, removeComment];

    const setUpContent = (name: string, info: any, comments: any) => {
        console.log("Comments: " + JSON.stringify(comments));
        const content = { id: 0, name: "", nodeID: "", text: "", images: [] } as content;
        const comment = { id: 0, nodeID: "", data: [] } as comment;
        content.name = name;
        content.nodeID = props.match.params.id;
        for (let i = 0; i < info.length; i++) {
            if (info[i].type == "text") {
                content.text = info[i].data;
            } else {
                content.images = JSON.parse(info[i].data);
            }
        }
        comment.data = comments.map((comment: any) => {
            return { 
                id: comment.id || 0,
                text: comment.contents, 
                who: { 
                    id: comment.userID.id,
                    username: comment.userID.username
                }, 
                editable: comment.userID.editable,
                createdAt: comment.createdAt
            }
        })
        setContent(content);
        setComments(comment);
    }

    useEffect(() => {
        getData();
    }, [props.match.params.id]);

    const getData = () => {
        setLoading(true);
        let data: any = { query: "query{node(id: \"" + props.match.params.id + "\"){ name info { type data } comments { id contents createdAt userID { id username editable } } parents { id name } children { id name } } }\n\n" };
        axios.post("/graphql/", data).then(res => {
            console.log(res);
            return {
                name: res.data.data.node.name,
                info: res.data.data.node.info,
                comments: res.data.data.node.comments,
                parents: res.data.data.node.parents,
                children: res.data.data.node.children
            };
        }).then(json => {
            setUpContent(json.name, json.info, json.comments);
            setParents(json.parents);
            setChildren(json.children);
            setLoading(false);
        })
    }

    if (Loading) {
        return <Loader />
    } else {
        return (
            <div className="learningpage">

                <Row gutter={16}>
                    <Col span={20}>
                        <InfoDisplay Content={Content} Comments={Comments} CommentFunctions={CommentFunctions} />
                        <MarkRead nodeId={Content.nodeID} />
                    </Col>
                    <Col span={4} style={{ position: "sticky" }}>
                        {Parents.length > 0 &&
                            <Card title="Parents" style={{ marginBottom: "15px" }}>
                                {Parents.map(res => {
                                    return <Link key={res.id} to={"/learning/" + res.id}>{res.name}</Link>
                                })}
                            </Card>
                        }
                        {Children.length > 0 &&
                            <Card title="Children">
                                {Children.map(res => {
                                    return <Link key={res.id} to={"/learning/" + res.id} style={{ display: "block" }}>{res.name}</Link>
                                })}
                            </Card>
                        }
                        
                        <IsAdmin>
                            <Card title="Admin">
                                <Link to={"/node/" + Content.nodeID + "/coursebuilder/"}><Button type="primary">Course Builder</Button></Link>
                                <br/>
                                <Link to={"/node/" + Content.nodeID + "/builder/"}><Button type="primary">Page Builder</Button></Link>
                            </Card>
                        </IsAdmin>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LearningPage;