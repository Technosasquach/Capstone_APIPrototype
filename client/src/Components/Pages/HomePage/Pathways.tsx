import * as React from "react";
import "./Pathways.less";
import 'antd/dist/antd.css';
import axios from 'axios'
import { Steps, Card, Anchor } from 'antd';
import PathwayCard from "./PathwayCard";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { Empty } from 'antd';
import { Link as Links } from "react-router-dom";
// import Typography from "antd/lib/typography/Typography";
// import { useState, useEffect } from "react";
const { Link } = Anchor;

const { Step } = Steps;


interface iQuiz {
    id: string;
}
interface iLink {
    title: React.ReactNode;
    href: string;
}
interface iNode {
    id: string;
    name?: string;
}
interface iCourse {
    createdAt: string;
    id: string;
    name: string;
    nodes: [];
    quizzes: [];
}
interface iCourseDetail {
    id: string;
    name: string;
    nodes: iNode[];
    quizzes: iQuiz[];
}
const Pathways = (Props: any, { }) => {

    const [Courses, setCourses] = useState([] as iCourse[]);
    const [CourseDetails, setCourseDetails] = useState({} as iCourseDetail);
    const [ViewedNodes, setViewedNodes] = useState([] as iNode[]);

    useEffect(() => {
        let temp: iCourse[] = Props.user.coursesTaken;
        setCourses(temp);
        let viewed: iNode[] = Props.user.viewed;
        setViewedNodes(viewed);

        return () => {
        };
    }, [])


    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, link: iLink) => {
        e.preventDefault();
        findUserCourseDetails(link.href);
    }
    
    const findUserCourseDetails = async (CourseId: string) => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                query Course($courseId: String) {
                    course(id: $courseId) {
                        id
                        name
                        nodes {
                          id
                          name
                        }
                        quizzes{
                            id
                        }
                    }
                  }`,
                variables: {
                    courseId: CourseId
                }
            }
        }).then((res) => {
            const courseDetail: iCourseDetail = res.data.data.course;
            if (courseDetail) {
                setCourseDetails(courseDetail);
            }
        }).catch((res) => {
            console.log("Something went wrong with finding userCourseDetails, res:", res);
        });
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Current Study Paths</h3>
                </div>

            </div>
            <hr />
            <div className="LearningCardList">
                <div className="LearningCardList">

                    {Courses ?
                        Courses.map(x =>
                            <Card key={x.id} style={{ width: 140 }} cover={<PathwayCard svgtype={x.id} />}>
                                <Anchor onClick={handleClick}>
                                    <Link title={x.name} href={x.id} />
                                </Anchor>
                            </Card>
                        )
                        :
                        <Title level={4}>You have no courses</Title>}
                </div>

                <div className="LearningCardList">
                    <Steps direction="vertical" >
                        {CourseDetails.nodes &&
                            CourseDetails.nodes.map(x =>
                                ViewedNodes.includes(x)
                                    ? <Step key={x.id} status="finish" title={x.name} />
                                    : <Step key={x.id} status="process" title={<Links to={"/learning/" + x.id}>{x.name}</Links>} />
                            )
                        }
                    </Steps>
                    {!CourseDetails.nodes && <Empty />}
                </div>

            </div>
        </div>
    )
}

export default Pathways