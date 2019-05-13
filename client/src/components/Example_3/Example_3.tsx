
import * as React from "react";

//import axios from "axios";
//import * as OSIConfig from "./../config/osiPiDetails";

import "./Example_3.less";

export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div className="dashboardContainer">
                <h1>Example_1</h1>
                <div className="sl-sideNav" id="sidebar-wrapper">
                    <div className="sidebar-heading bg-light sl-logo">Syneng|Learn </div>
                    <div className="list-group list-group-flush">
                        <a className="list-group-item active list-group-item-action"><i className="fas fa-desktop mr-3"></i>Dashboard</a>
                        <a className="list-group-item list-group-item-action"><i className="fas fa-sitemap mr-3"></i>Equipment Detail</a>
                        <a className="list-group-item list-group-item-action"><i className="fas fa-project-diagram mr-3"></i>Pathways</a>
                        <a className="list-group-item list-group-item-action"><i className="fas fa-graduation-cap mr-3"></i>Course</a>
                        <a className="list-group-item list-group-item-action"><i className="fas fa-user mr-3"></i>Profile</a>
                        <a className="list-group-item list-group-item-action"><i className="fas fa-cog mr-3"></i>Status</a>
                    </div>
                </div>
            </div>
        );
    }
}