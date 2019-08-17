import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.less";

import HeaderBar from "./Components/Top Level/HeaderBar/HeaderBar";
import SideBar from "./Components/Top Level/SideBar/SideBar";
import ContentArea from "./Components/Top Level/ContentArea/ContentArea";

import NodeDisplay from "./Components/Pages/NodeDisplayPage/NodePage";
import LearningPage from "./Components/Pages/LearningNodePage/LearningPage";
import ExamPage from "./Components/Pages/ExamPage/ExamPage";
import AccountPage from "./Components/Pages/AccountPage/AccountPage";
import SignInPage from "./Components/Pages/SignInPage/SignIn";

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
                <div>
                    <HeaderBar/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <SideBar/>
                        <ContentArea>
                            <Switch>
                                <Route path="/" exact component={NodeDisplay}/>    
                                <Route path="/learning" component={LearningPage}/>   
                                <Route path="/exam" component={ExamPage}/>   
                                <Route path="/account" component={AccountPage}/> 
                                <Route path="/signin" component={SignInPage}/> 
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