import * as React from "react";

import "./LearningPage.less";
import 'antd/dist/antd.css';

export default class NodeDisplayPage extends React.Component<any, any> {
    
    render() {
        return (
            <div className="learningpage">
                <div className="contentregion">
                </div>
                <div className="dualcontent">
                    <div className="directory">
                    </div>
                    <div className="links">
                    </div>
                </div>
            </div>
        );
    }
}