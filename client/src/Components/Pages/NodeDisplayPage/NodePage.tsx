import * as React from "react";

import "./NodePage.less";

import NodeInfo from './nodeInfo';

export default class SearchPage extends React.Component<any, any> {

    render() {
        console.log(this.state);
        
        return (
            <div className="NodePage">
                <div className="contentregion">
                    <NodeInfo id={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}