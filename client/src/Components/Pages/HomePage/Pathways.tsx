import * as React from "react";
import "./Pathways.less";
import 'antd/dist/antd.css';
// import axios from 'axios'
import { Steps, Card } from 'antd';
import PathwayCard from "./PathwayCard";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
// import Typography from "antd/lib/typography/Typography";
// import { useState, useEffect } from "react";

const { Meta } = Card;
const { Step } = Steps;


// interface iProps {
//     user: string;
// }

interface iCourse {
    createdAt: string;
    id: string;
    name: string;
    nodes: [];
    quizzes: [];
}

const Pathways = (Props: any, { }) => {



    const [Courses, setCourses] = useState([] as iCourse[]);

    useEffect(() => {
        let temp: iCourse[] = Props.user.currentCourses;
        setCourses(temp);
        return () => {
            console.log(temp);

            // setCourses(temp);
        };
    }, [])

    // useEffect(() => {
    //     let temp:iCourse[] = Props.user.currentCourses;
    //     ).then(console.log("Courses", Courses));
    // }, []);

    // for (let index = 0; index < Props.user.currentCourses.length; index++) {
    //     const element = JSON.parse(Props.user.currentCourses[index]);

    // }

    console.log("pros before render", Props.user.currentCourses);
    console.log("courses before render", Courses);

    return (
        <div>
            <div>
                <div>
                    <h3>Current Study Paths</h3>
                </div>

            </div>
            <hr />
            <div className="LearningCardList">
                {/* {Courses as iCourse[] ?

                    

                    Props.user.currentCourses.forEach((element: iCourse) => {
                        <Card

                            hoverable
                            style={{ width: 140 }}
                            cover={<PathwayCard svgType="security-scan" />}
                        >
                            <Meta title={element.name} />
                        </Card>
                    })

                    : <Title level={4}>You have no courses</Title>} */}
                {/* <p>
                    Props.user.currentCourses
                    {JSON.parse(Props.user.currentCourses).toString()}
                </p> */}
                <div className="LearningCardList">
                    
                {Courses ? 
                        Courses.map(x => 
                            <Card
                            key={x.id}
                            hoverable
                            style={{ width: 140 }} cover={<PathwayCard svgtype={11} />}
                            >
                                <Meta title={x.name}/>
                            </Card>) 
                            : 
                        <Title level={4}>You have no courses</Title>}
                </div>







            </div>
            <hr />
            <div className="steparea">
                <Steps direction="vertical">
                    <Step status="wait" title="Read initial documents" description="This section will require you to read the associated documentation." />
                    <Step status="process" title="Quiz" description="Complete the quiz." />
                    <Step status="finish" title="Submit report" description="Submit a report to your supervisor." />
                    <Step status="error" title="Go home" description="Go home now." />
                </Steps>
            </div>

        </div>
    )
}

export default Pathways



// export default class Pathways extends React.Component<any, any> {

//     render() {
//         return (
//             <div>
//                 <div>
//                     <div>
//                         <h3>Current Study Paths</h3>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="LearningCardList">
//                 <Card
//                         hoverable
//                         style={{ width: 240 }}
//                         cover={<PathwayCard svgType="security-scan"/>}
//                     >
//                         <Meta title="Learning area one" description="This is the description for learning area one." />
//                     </Card>
//                     <Card
//                         hoverable
//                         style={{ width: 240 }}
//                         cover={<PathwayCard svgType="code"/>}
//                     >
//                         <Meta title="Learning area two" description="This is the description for learning area two." />
//                     </Card>
//                     <Card
//                         hoverable
//                         style={{ width: 240 }}
//                         cover={<PathwayCard svgType="book"/>}
//                     >
//                         <Meta title="Learning area three" description="This is the description for learning area three." />
//                     </Card>
//                     <Card
//                         hoverable
//                         style={{ width: 240 }}
//                         cover={<PathwayCard svgType="rest"/>}
//                     >
//                         <Meta title="Learning area four" description="This is the description for learning area four." />
//                     </Card>
//                 </div>
//                 <hr />
//                 <div className="steparea">
//                     <Steps direction="vertical" current={1}>
//                         <Step title="Read initial documents" description="This section will require you to read the associated documentation." />
//                         <Step title="Quiz" description="Complete the quiz." />
//                         <Step title="Submit report" description="Submit a report to your supervisor." />
//                     </Steps>
//                 </div>


//             </div>
//         );
//     }
// }



