import * as React from "react";
import "./Pathways.less";
import 'antd/dist/antd.css';
import axios from 'axios'
import { PathwayCard } from "./PathwayCard";

export interface iCourseQuery {
    id: string,
    name: string,
    nodes: [{
        id: string,
        name: string
    }],
    quizzes: [{
        id: string
    }]
}

export class Pathways extends React.Component<{user: any}, { courses: iCourseQuery[] }> {

    constructor(props: any) {
        super(props)
        this.state = {
            courses: [{
                id: "", name: "", nodes: [{ id: "", name: "" }], quizzes: [{ id: "" }]
            }]
        }
    }

    componentDidMount() {
        // console.log(this.props.user);
        ///@ts-ignore
        this.setState({
            courses: null
        })
        this.findUserCourseDetails(this.props.user.coursesTaken);
    }
    
    findUserCourseDetails(courseIDs: string[]) {
        // console.log("CourseIDs ", courseIDs);
        courseIDs.forEach((courseID: any) => {
            axios({
                url: '/graphql/',
                method: 'post',
                data: {
                    query: `
                        query {
                            course(id: "${courseID.id}") {
                                id
                                name
                                nodes {
                                    id
                                    name
                                }
                                quizzes {
                                    id
                                }
                            }
                        }
                    `
                }
            }).then((res) => {
                // console.log("Axios Res", res.data.data.course);
                let courses = this.state.courses;
                if(courses == null) courses = [];
                courses.push(res.data.data.course);
                this.setState({
                    courses: courses
                });
            }).catch((res) => {
                console.log("[PathWays] Something went wrong with finding userCourseDetails, res:", res);
            });
        }) 
    }

    render() {
        if (this.state.courses) {
            return <div className="LearningCardList">
                <h2>Courses</h2>
                <hr/>
                { this.state.courses.map((course: iCourseQuery) =>{
                    return <PathwayCard course={course}/>
                })}
            </div>
        } else {
            if (this.state.courses == null) {
                return <h2>No Assigned Courses</h2>
            } else {
                return <h2>Loading Courses</h2>
            }
        }
    }
}