import * as React from "react";
import "./AccountPathways.less";
import 'antd/dist/antd.css';

import { Steps, Card } from 'antd';
import PathwayCard from "./PathwayCard";

const { Meta } = Card;
const { Step } = Steps;


export default class AccountPathways extends React.Component<any, any> {

    render() {
        return (
            <div className="AccountDetailsPage">
                <div className="FormSectionTitle">
                    <div>
                        <h3>Current Study Paths</h3>
                    </div>
                </div>
                <hr />
                <div className="LearningCardList">
                <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<PathwayCard svgType="security-scan"/>}
                    >
                        <Meta title="Learning area one" description="This is the description for learning area one." />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<PathwayCard svgType="code"/>}
                    >
                        <Meta title="Learning area two" description="This is the description for learning area two." />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<PathwayCard svgType="book"/>}
                    >
                        <Meta title="Learning area three" description="This is the description for learning area three." />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<PathwayCard svgType="rest"/>}
                    >
                        <Meta title="Learning area four" description="This is the description for learning area four." />
                    </Card>
                </div>
                <hr />
                <div className="steparea">
                    <Steps direction="vertical" current={1}>
                        <Step title="Read initial documents" description="This section will require you to read the associated documentation." />
                        <Step title="Quiz" description="Complete the quiz." />
                        <Step title="Submit report" description="Submit a report to your supervisor." />
                    </Steps>
                </div>


            </div>
        );
    }
}



