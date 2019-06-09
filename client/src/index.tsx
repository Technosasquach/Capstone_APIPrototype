import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {withRouter} from 'react-router-dom';

import Dashboard from "./components/Dashboard/Dashboard";
import GraphViewPage from "./components/GraphViewPage";

import Sidebar from "./components/Navigation/Sidebar";
import Header from "./components/Navigation/Header";

import "./public/bootstrap.min.css";
import "./index.less";

export const LinkContext = React.createContext(
    {
        index: 0,
        setIndex: (index: number) => {}}
    );

import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Content } = Layout;

export default class Root extends React.Component<any, any> {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }


    render() {
        const ShowTheLocationWithRouter = withRouter(Sidebar);
        return (
            <Router>
                <Layout>
                    <ShowTheLocationWithRouter/>
                    <Layout>
                        <Header/>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <Route path="/"  exact component={Dashboard}/>    
                            <Route path="/a"  exact component={GraphViewPage}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );

    }
}



render(
    <Root />,
    document.getElementById("root")
);