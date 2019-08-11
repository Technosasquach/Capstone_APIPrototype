import * as React from "react";
import { render } from "react-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.less";
import 'antd/dist/antd.css';


export default class Root extends React.Component<any, any> {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }


    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);