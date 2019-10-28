import * as React from "react";
import "./PathwayCard.less";
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import { Steps } from "antd";

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

export class PathwayCard extends React.Component<{course: iCourseQuery}, any> {

    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.course);
    }

    render() {

        const { Step } = Steps;

        return <div className="LearningCard">
            <Link to={"/course/" + this.props.course.id}><h2>{this.props.course.name}</h2></Link>
            <hr/>
            {/* <Button.Group>
                { this.props.course.quizzes.map((quiz: { id: string} ) => {
                    return <Link to={"/course/" + quiz.id}><Button type={"primary"}>ID: {quiz.id}</Button></Link>
                })}
            </Button.Group> */}
            <Steps direction="vertical" size="small" current={1}>
                { this.props.course.nodes.map((item: {id: string, name: string}) => {
                    return <Step title={<Link to={"/learning/" + item.id}>{"Node: " + item.name}</Link>}/>
                })}
            </Steps>
        </div>
    }
}