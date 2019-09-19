import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.less";

import HeaderBar from "./Components/Top Level/HeaderBar/HeaderBar";
import SideBar from "./Components/Top Level/SideBar/VersionCreator/SideBar";
import ContentArea from "./Components/Top Level/ContentArea/ContentArea";

import NodeDisplay from "./Components/Pages/NodeDisplayPage/NodePage";
import LearningPage from "./Components/Pages/LearningNodePage/LearningPage";
import ExamPage from "./Components/Pages/ExamPage/ExamPage";
import AccountPage from "./Components/Pages/AccountPage/AccountPage";
import SearchPage from "./Components/Pages/SearchPage/SearchPage";
import CourseBuilder from "./Components/Pages/CourseBuilder/CourseBuilder";
import HomePage from './Components/Pages/HomePage/HomePage';

export default class Root extends React.Component<any, any> {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }

    state = {
        sidestate: true,
    };

    ToggleState = () => {
        this.setState({
            sidestate: !this.state.sidestate,
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <HeaderBar/>
                    <div className="contentarea">
                        <SideBar sidestate={this.state.sidestate}/>
                        <ContentArea sidestate={this.state.sidestate} toggler={this.ToggleState}>
                            <Switch>
                                <Route path="/learning" component={LearningPage}/>   
                                <Route path="/exam" component={ExamPage}/>   
                                <Route path="/account" component={AccountPage}/> 
                                <Route path="/search" component={SearchPage}/> 
                                <Route path="/node/:id/builder" component={CourseBuilder}/>
                                <Route path="/node/:id" component={NodeDisplay}/>
                                <Route path="/" exact component={HomePage}/>
                            </Switch>
                        </ContentArea>
                    </div>
                </div>
            </Router>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);