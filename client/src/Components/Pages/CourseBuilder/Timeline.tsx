import * as React from "react";
import { Timeline, Button } from 'antd';
import { Link } from "react-router-dom";

export default class TimelineCourse extends React.Component<any, any> {

    render() {
        return (
            <div>
                <h1>Current Course Structure</h1>
                <Timeline>
                    <Timeline.Item>OEPISRV</Timeline.Item>
                    <Timeline.Item>Configuration</Timeline.Item>
                    <Timeline.Item>Database1</Timeline.Item>
                    <Timeline.Item>Origin_RTO_dev</Timeline.Item>
                    <Timeline.Item>Origin_RTO_dev_wip</Timeline.Item>
                    <Timeline.Item>OriginAF</Timeline.Item>
                    <Timeline.Item>pcp_example</Timeline.Item>
                </Timeline>
                <Link to={{pathname: "../PageBuilder", state: {
                    test: "aye",
                }}}><Button type="primary" style={{float: "right"}}>Page Builder</Button></Link>
            </div>
        );
    }
}