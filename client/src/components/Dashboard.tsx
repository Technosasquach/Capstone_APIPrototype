
import * as React from "react";

import axios from "axios";
import * as OSIConfig from "./../config/osiPiDetails";

export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);
        this.state = {
            resp: ""
        }
    }

    componentDidMount() {

        console.log();

        axios.get(OSIConfig.default.url, {
            url: OSIConfig.default.url,
            withCredentials: true,
            auth: {
                username: OSIConfig.default.credentials.username,
                password: OSIConfig.default.credentials.password
            }
        }).then((rep: any) => {
            console.log(JSON.stringify(rep));
            this.setState({resp: rep});
        });
    }

    render() {
        return (
            <div>
                <h1>OSI PI Web Demo</h1>
                <hr/>
                <p>{this.state.resp}</p>
            </div>
        );
    }
}