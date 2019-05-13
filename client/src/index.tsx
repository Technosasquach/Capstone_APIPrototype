import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Example_1 from "./components/Example_1/Example_1";
import Example_2 from "./components/Example_2/Example_2";
import Example_3 from "./components/Example_3/Example_3";
import Sidebar from "./components/Navigation/Sidebar";

import "./public/bootstrap.min.css";
import "./index.less";


export default class Root extends React.Component<any, any> {

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
                    <Route path="/"  exact render={(routeProps) => (<Sidebar {...routeProps} pather={0} ><Dashboard/></Sidebar>)}/>
                    <Route path="/a" exact render={(routeProps) => (<Sidebar {...routeProps} pather={1} ><Example_1/></Sidebar>)}/>
                    <Route path="/b" exact render={(routeProps) => (<Sidebar {...routeProps} pather={2} ><Example_2/></Sidebar>)}/>
                    <Route path="/c" exact render={(routeProps) => (<Example_3 {...routeProps} ></Example_3>)}/>
                </Navbar>
            </Router>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);