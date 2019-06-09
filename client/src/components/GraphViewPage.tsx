
import * as React from "react";

import axios, { AxiosResponse } from "axios";
// import * as graphlib from "graphlib";
import * as dagre from "dagre";
//import * as OSIConfig from "./../config/osiPiDetails";

const CytoscapeComponent = require('react-cytoscapejs');

import "./GraphViewPage.less";

export default class Dashboard extends React.Component<{},{graphObjFinished: any}> {

    coreResponse: any[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            graphObjFinished: []
        };
    }

    componentDidMount() {
        // Request the massive graph file
        axios.post("/fuckingmassivegraphdeffile")
            .then((response: AxiosResponse) => {

                let g = new dagre.graphlib.Graph();
                g.setGraph({ width: 600, height: 100 });
                g.setDefaultEdgeLabel(() => { return ""; });
                g = dagre.graphlib.json.read(response.data);
                console.log("Graph facts | Edge Count " + g.edgeCount() + ", Node Count " + g.nodeCount());
                dagre.layout(g, { width: 600 });

                // For all the nodes
                g.nodes().forEach((v) => {
                    const item = g.node(v);
                    this.coreResponse.push({ data: { id: v.toString(), label: item.label }, position: { x: item.x, y: item.y } });
                });
                // For all the edges
                g.edges().forEach((edge) => {
                    this.coreResponse.push({ data: { source: edge.v, target: edge.w, label: "Edge from " + edge.v + " to " + edge.w }});
                });

                this.setState({graphObjFinished: this.coreResponse});
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    render() {

        // For every node

        
        // For every edge


        // Few top level elements
        // const elements = [
        //     { data: { id: 'ObjectId("5cf61ad06a7f231412872df2")', label: 'OEPISRV' }, position: { x: 0, y: 0 } }, // Depth 0
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df3")', label: 'Configuration'        }, position: { x: 100, y: 0 } },
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df4")', label: 'Database1'            }, position: { x: 100, y: 100 } },
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df5")', label: 'Origin_RTO_dev'       }, position: { x: 100, y: 200 } },
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df6")', label: 'Origin_RTO_dev_wip'   }, position: { x: 100, y: 300 } }, 
        //             { data: { id: 'ObjectId("5cf61ad16a7f231412872dfc")', label: 'Origin'               }, position: { x: 200, y: 0 } },
        //                 { data: { id: 'ObjectId("5cf61ad16a7f231412872e05")', label: 'Generation'           }, position: { x: 300, y: 0 } },
        //                     { data: { id: 'ObjectId("5cf61ad26a7f231412872e11")', label: 'Eraring'              }, position: { x: 400, y: 0 } },
        //                         { data: { id: 'ObjectId("5cf61ad26a7f231412872e38")', label: 'Unit 2'               }, position: { x: 500, y: 0 } },
        //                         { data: { id: 'ObjectId("5cf61ad26a7f231412872e37")', label: 'Unit 1'               }, position: { x: 500, y: 100 } },
        //                             { data: { id: 'ObjectId("5cf61ad46a7f231412872e94")', label: 'Auxiliary Systems'    }, position: { x: 600, y: 0 } },
        //                             { data: { id: 'ObjectId("5cf61ad46a7f231412872e95")', label: 'Generator'            }, position: { x: 600, y: 100 } },
        //                             { data: { id: 'ObjectId("5cf61ad46a7f231412872e96")', label: 'Steam Turbine'        }, position: { x: 600, y: 200 } },
        //                         { data: { id: 'ObjectId("5cf61ad26a7f231412872e39")', label: 'Unit 3'               }, position: { x: 500, y: 200 } },
        //                         { data: { id: 'ObjectId("5cf61ad26a7f231412872e3a")', label: 'Unit 4'               }, position: { x: 500, y: 300 } },
        //             { data: { id: 'ObjectId("5cf61ad16a7f231412872dfd")', label: 'z_PI Data Archive'    }, position: { x: 200, y: 100 } },
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df7")', label: 'OriginAF'             }, position: { x: 100, y: 400 } },
        //         { data: { id: 'ObjectId("5cf61ad06a7f231412872df8")', label: 'pcp_example'          }, position: { x: 100, y: 500 } },

        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df3")', label: 'Edge from OEPISRV to Configuration' } },
        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df4")', label: 'Edge from OEPISRV to Database1' } },
        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df5")', label: 'Edge from OEPISRV to Origin_RTO_dev' } },
        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df6")', label: 'Edge from OEPISRV to Origin_RTO_dev_wip' } },
        //         { data: { source: 'ObjectId("5cf61ad06a7f231412872df6")', target: 'ObjectId("5cf61ad16a7f231412872dfc")', label: 'Edge from Origin_RTO_dev_wip to Origin' } },    
        //             { data: { source: 'ObjectId("5cf61ad16a7f231412872dfc")', target: 'ObjectId("5cf61ad16a7f231412872e05")', label: 'Edge from Origin to Generation' } },
        //                 { data: { source: 'ObjectId("5cf61ad16a7f231412872e05")', target: 'ObjectId("5cf61ad26a7f231412872e11")', label: 'Edge from Generation to Eraring' } },
        //                     { data: { source: 'ObjectId("5cf61ad26a7f231412872e11")', target: 'ObjectId("5cf61ad26a7f231412872e38")', label: 'Edge from Eraring to Unit 2' } },
        //                     { data: { source: 'ObjectId("5cf61ad26a7f231412872e11")', target: 'ObjectId("5cf61ad26a7f231412872e37")', label: 'Edge from Eraring to Unit 1' } },
        //                         { data: { source: 'ObjectId("5cf61ad26a7f231412872e37")', target: 'ObjectId("5cf61ad46a7f231412872e94")', label: 'Edge from Unit 1 to Auxiliary Systems' } },
        //                         { data: { source: 'ObjectId("5cf61ad26a7f231412872e37")', target: 'ObjectId("5cf61ad46a7f231412872e95")', label: 'Edge from Unit 1 to Generator' } },
        //                         { data: { source: 'ObjectId("5cf61ad26a7f231412872e37")', target: 'ObjectId("5cf61ad46a7f231412872e96")', label: 'Edge from Unit 1 to Steam Turbine' } },
        //                     { data: { source: 'ObjectId("5cf61ad26a7f231412872e11")', target: 'ObjectId("5cf61ad26a7f231412872e39")', label: 'Edge from Eraring to Unit 3' } },
        //                     { data: { source: 'ObjectId("5cf61ad26a7f231412872e11")', target: 'ObjectId("5cf61ad26a7f231412872e3a")', label: 'Edge from Eraring to Unit 4' } },
        //         { data: { source: 'ObjectId("5cf61ad06a7f231412872df6")', target: 'ObjectId("5cf61ad16a7f231412872dfd")', label: 'Edge from Origin_RTO_dev_wip to z_PI Data Archive' } }, 
        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df7")', label: 'Edge from OEPISRV to OriginAF' } },
        //     { data: { source: 'ObjectId("5cf61ad06a7f231412872df2")', target: 'ObjectId("5cf61ad06a7f231412872df8")', label: 'Edge from OEPISRV to pcp_example' } }
        //  ];

        return (
            <div className="dashboardContainer">
                <h1>Graph Viewer</h1>
                <hr/>
                <CytoscapeComponent elements={this.state.graphObjFinished} style={ { width: '100%', height: '100%' } } />
            </div>
        );
    }
}