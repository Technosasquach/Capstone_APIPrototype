import * as React from "react";
import axios from "axios";
import { Tree } from 'antd';

const { TreeNode } = Tree;

interface selector {
  treeData: any[];
  structure: any[];
  enabled?: boolean;
  updateStructure(input: any[]): void;
  loader(input: any[]): void;
}

export default class CourseNodeAdder extends React.Component<selector, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      checkedKeys: [],
      treeData: this.props.treeData
    }
  }   

  requestChildren(IDS: any[], key: number) {
    if(IDS.length > 0) {
      return Promise.all(IDS.map((ID: string) => {
        let data = {query: "query{node(id: \"" + ID + "\"){name children}}\n\n"};
        return axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
          return {
            name: res.data.data.node.name,
            children: res.data.data.node.children,
            nodeID: ID
          };
        });
      })).then((res: any) => {
        let treeData = [] as any[];
        let childkey = 1;
        res.map((node: any) => {
          treeData.push({
            title: node.name,
            key: `${key}-${childkey++}`,
            childIDS: node.children,
            nodeID: node.nodeID
          });
        });
        return treeData;
      });
    } else {
      return [];
    }
  }

  onCheck = (checkedKeys: any, e: any) => {
    this.setState({ checkedKeys });
    let structure = [] as any[];
    e.checkedNodes.map((node: any) => {
      structure.push({
        id: node.props.nodeID,
        name: node.props.title
      });
    })
    this.props.updateStructure(structure);
  };

  onLoadData = (treeNode: any) =>
  new Promise(async resolve => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    treeNode.props.dataRef.children = await this.requestChildren(treeNode.props.childIDS, treeNode.props.eventKey);
    this.props.loader(this.state.treeData);
    resolve();
  });


  renderTreeNodes = (data: any) =>
  data.map((item: any) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} dataRef={item} />;
  });

  render() {
    return (
      <div>
          <Tree loadData={this.onLoadData} checkable checkStrictly onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}>
            {this.renderTreeNodes(this.props.treeData)}
          </Tree>
      </div>
    );
  }
}