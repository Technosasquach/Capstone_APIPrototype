import * as React from "react";

import "./CourseBuilder.less";

import Timeline from './Timeline';
import Tree from './Tree';

export default class CourseBuilderPage extends React.Component<any, any> {
    render() {
        return (
            <div className="coursepage">
                <div className="contentregion">
                  <Timeline/>
                </div>
                <div className="dataregion">
                  <Tree/>
                </div>
            </div>
        );
    }
}