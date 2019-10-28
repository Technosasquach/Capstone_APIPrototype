import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./index.less";

import HeaderBar from "./Components/Top Level/HeaderBar/HeaderBar";
import ContentArea from "./Components/Top Level/ContentArea/ContentArea";

import NodeDisplay from "./Components/Pages/NodeDisplayPage/NodePage";
import LearningPage from "./Components/Pages/LearningNodePage/LearningPage";
import AccountPage from "./Components/Pages/AccountPage/AccountPage";
import CourseBuilder from "./Components/Pages/CourseBuilder/CourseBuilder";
import HomePage from './Components/Pages/HomePage/HomePage';
import SearchResultPage from "./Components/Pages/Search/SearchResult";
import TreePage from "./Components/Pages/TreePage/TreePage";

import CourseDisplayPage from "./Components/Pages/CourseDisplayPage/CourseDisplayPage";
import PageBuilder from "./Components/Pages/PageBuilder/PageBuilder";

import SearchState from './Context/Search/SearchState'
import AuthProvider from "./Components/Utility/AuthProvider"

import {AuthContext} from './Components/Utility/AuthProvider';
import AdminPanel from './Components/Pages/AdminPanel/AdminPanel';
import UserPanel from './Components/Pages/AdminPanel/UserPanel/UserPanel';

function PrivateRoute ({component: Component, authed, ...rest}: any) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }

export default class Root extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }


    render() {
        return (
            <SearchState>
                <Router>
                    <div>
                        <HeaderBar />
                        <div className="contentarea">
                            <ContentArea>
                                <AuthContext.Consumer>
                                    {consumer => (
                                        <Switch>
                                            <PrivateRoute authed={consumer.isAdmin} exact path='/Admin' component={AdminPanel}/>
                                            <PrivateRoute authed={consumer.isAdmin} path='/Admin/EditUser/:id' component={UserPanel}/>
                                            <PrivateRoute authed={consumer.isAdmin} path='/Admin/EditPage/:id' component={PageBuilder}/>
                                            <PrivateRoute authed={consumer.isAdmin} path='/node/:id/coursebuilder' component={CourseBuilder}/>
                                            <PrivateRoute authed={consumer.isAdmin} path='/node/:id/builder' component={PageBuilder}/>
                                            <PrivateRoute authed={consumer.isAdmin} path='/node/:id' component={NodeDisplay}/>
                                            <Route path="/searchresults" component={SearchResultPage} />
                                            <Route path="/learning/:id" component={LearningPage} />
                                            <Route path="/course/:id" component={CourseDisplayPage} />
                                            <Route path="/account" component={AccountPage} />
                                            <Route path="/tree" component={TreePage} />
                                            <Route path="/" exact component={HomePage} />
                                        </Switch>
                                    )}
                                </AuthContext.Consumer>
                            </ContentArea>
                        </div>
                    </div>
                </Router>
            </SearchState>
        );
    }
}

render(
    <AuthProvider><Root /></AuthProvider>,
    document.getElementById("root")
);