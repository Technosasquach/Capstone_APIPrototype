import React from "react";
import axios, { AxiosResponse } from 'axios';
import * as dagre from "dagre";
const CytoscapeComponent = require('react-cytoscapejs');

import "./TreePage.less";

export default class Treepage extends React.Component<{},{ graphObjFinished: any, nodes: number, edges: number }> {
    coreResponse: any[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            nodes: 0,
            edges: 0,
            graphObjFinished: []
        };
    }

    g = new dagre.graphlib.Graph();

    componentDidMount() {
        // Request the massive graph file
        axios.post("/graph")
            .then((response: AxiosResponse) => {

                this.g = dagre.graphlib.json.read(response.data);
                
                this.g.setGraph({width: 600});
                this.g.setDefaultEdgeLabel(() => { return ""; });
                
                console.log("Graph facts | Edge Count " + this.g.edgeCount() + ", Node Count " + this.g.nodeCount());
                dagre.layout(this.g);

                // For all the nodes
                this.g.nodes().forEach((v) => {
                    const item = this.g.node(v);
                    this.coreResponse.push({ data: { id: v.toString(), label: item.label }, position: { x: item.x, y: item.y } });
                });
                // For all the edges
                this.g.edges().forEach((edge) => {
                    this.coreResponse.push({ data: { source: edge.v, target: edge.w, label: "Edge from " + edge.v + " to " + edge.w }});
                });

                this.setState({
                    graphObjFinished: this.coreResponse,
                    nodes: this.g.nodeCount(),
                    edges: this.g.edgeCount()
                });
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="treePage">
                <div className="treeTitle">
                    <h2>Syn|Tree</h2>
                    <span>Click and drag to move around, mouse wheel to zoom</span>
                    <span>Edges: {this.state.nodes}, Nodes: {this.state.edges}</span>
                </div>
                <div className="treeRender">
                    <CytoscapeComponent elements={this.state.graphObjFinished} style={ { width: '100%', height: '100%' } } />
                </div>
            </div>
        );
    }
}