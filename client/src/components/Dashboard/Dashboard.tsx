
import * as React from "react";

//import axios from "axios";
//import * as OSIConfig from "./../config/osiPiDetails";

import 'antd/dist/antd.css';
import { Tree } from 'antd';

const { TreeNode } = Tree;

import "./Dashboard.less";
//import { Node } from "./../../../../server/src/database";

export default class Dashboard extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() { 
        return (
            <div className="dashboardContainer">
                <h1 style={{textAlign: 'center'}}>PI Directory</h1>
                <hr/>

                <Tree>
                    
                </Tree>

                <Tree showLine defaultExpandedKeys={['0-0-0', '0-0-1']}>
                    <TreeNode title="Field 1" key="0-0">
                        <TreeNode title="Well 1" key="0-0-0">
                            <TreeNode title="Downhole Equipment 1" key="0-0-0-0" />
                            <TreeNode title="Downhole Equipment 2" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="Well 2" key="0-0-1">
                            <TreeNode title="PCP" key="0-0-1-0" />
                        </TreeNode>
                    </TreeNode>

                    <TreeNode title="Field 2" key="1-0">
                        <TreeNode title="Well 1" key="1-0-0">
                            <TreeNode title="Downhole Equipment 1" key="1-0-0-0" />
                            <TreeNode title="Downhole Equipment 2" key="1-0-0-1" />
                            <TreeNode title="Downhole Equipment 3" key="1-0-0-2" />
                        </TreeNode>
                        <TreeNode title="Well 2" key="1-0-1">
                            <TreeNode title="PCP" key="1-0-1-0" />
                        </TreeNode>
                        <TreeNode title="Well 3" key="1-0-2">
                            <TreeNode title="PCP" key="1-0-2-0" />
                            <TreeNode title="PCP" key="1-0-2-1" />
                        </TreeNode>
                    </TreeNode>
                </Tree>

            </div>
        );
    }
}