import * as React from "react";

import "./NodePage.less";

import NodeInfo from './nodeInfo';
import NodeData from './nodeData';

export default class NodeDisplayPage extends React.Component<any, any> {

    render() {
        return (
            <div className="NodePage">
                <div className="contentregion">
                    <NodeInfo id={this.props.match.params.id}/>
                </div>
                <div className="dataregion">
                    <NodeData/>
                </div>
            </div>
        );
    }
}