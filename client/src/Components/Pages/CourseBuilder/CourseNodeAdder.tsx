import * as React from "react";

import { Tree, Input } from 'antd';

const { TreeNode } = Tree;

const treeData = [
  {
    title: 'OEPISRV',
    key: '0-0',
    children: [
      {
        title: 'Configuration',
        key: '0-0-0',
      },
      {
        title: 'Database1',
        key: '0-0-1',
      },
      {
        title: 'Origin_RTO_dev',
        key: '0-0-2',
      },
      {
        title: 'Origin_RTO_dev_wip',
        key: '0-0-3',
      },
      {
        title: 'OriginAF',
        key: '0-0-4',
      },
      {
        title: 'pcp_example',
        key: '0-0-5',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

export default class CourseNodeAdder extends React.Component<any, any> {
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0'],
        selectedKeys: [],
      };
    
      onExpand = (expandedKeys: any) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      };
    
      onCheck = (checkedKeys: any) => {
        this.setState({ checkedKeys });
      };
    
      onSelect = (selectedKeys: any, info: any) => {
        this.setState({ selectedKeys });
      };
    
      renderTreeNodes = (data: any) =>
      data.map((item: any) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} {...item} />;
      });

    render() {
        return (
            <div>
                <h1>Structure Select</h1>
                <Input placeholder="Search" />
                <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                >
                {this.renderTreeNodes(treeData)}
                </Tree>
            </div>
        );
    }
}