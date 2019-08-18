import * as React from "react";

import "./LearningPage.less";
import 'antd/dist/antd.css';

import LearningPageContent from './LearningPageContent';
import LearningPageDirectory from './LearningPageDirectory';
import LearningPageTemp from './LearningPageTemp';

export default class NodeDisplayPage extends React.Component<any, any> {
    
    render() {
        return (
            <div className="learningpage">
                <div className="contentregion">
                    <LearningPageContent/>
                </div>
                <div className="dualcontent">
                    <div className="directory">
                        <LearningPageDirectory/>
                    </div>
                    <div className="temp">
                        <LearningPageTemp/>
                    </div>
                </div>
            </div>
        );
    }
}