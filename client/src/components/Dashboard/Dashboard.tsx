
import * as React from "react";

//import axios from "axios";
//import * as OSIConfig from "./../config/osiPiDetails";

import "./Dashboard.less";

export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);
        this.state = {
            resp: ""
        }
    }

    // componentDidMount() {

    //     console.log("[API] Requesting data");

    //     axios.get(OSIConfig.default.url, {
    //         url: OSIConfig.default.url,
    //         withCredentials: true,
    //         auth: {
    //             username: OSIConfig.default.credentials.username,
    //             password: OSIConfig.default.credentials.password
    //         }
    //     }).then((rep: any) => {
    //         console.log("[API] Data received");
    //         console.log(JSON.stringify(rep));
    //         this.setState({resp: rep});
    //     });
    // }

    render() {
        return (
            <div className="dashboardContainer">
                <h1>Dashboard</h1>
                <hr/>
                <p>{JSON.stringify(this.state.resp.data, null, "\t")}</p>
            </div>
        );
    }
}