
import * as React from "react";

//import axios from "axios";
//import * as OSIConfig from "./../config/osiPiDetails";

import "./Example_2.less";

export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="dashboardContainer">
                <h1>Example_2</h1>
                <hr/>
            </div>
        );
    }
}