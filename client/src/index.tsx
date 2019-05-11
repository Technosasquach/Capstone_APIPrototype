import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import "./public/bootstrap.min.css";
import "./index.less";

export default class Root extends React.Component {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }

    render() {
        return (
            <Router>
                <Navbar>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/a" exact component={Dashboard} />
                    <Route path="/b" exact component={Dashboard} />
                    <Route path="/c" exact component={Dashboard} />
                </Navbar>
            </Router>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);