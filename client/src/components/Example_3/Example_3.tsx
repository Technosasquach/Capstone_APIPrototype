
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
                <h1>Builder</h1>
                <hr/>
            </div>
        );
    }
}