import React, {useState, useEffect} from "react";
import axios from "axios";
import { Tree } from 'antd';

const { TreeNode } = Tree;

interface card {
  id: string;
  name: string;
}

interface structure {
  index: [number];
  cards: [card]
}

const CourseNodeAdder = (props: any) => {
  const [CheckedKeys, setCheckedKeys] = useState([] as any);
  const [TreeData, setTreeData] = useState([] as any);

  useEffect(() => {
    if(props.Children.length > 0) {
      setUpTree(props.Children);
    } else {
      setTreeData([]);
    }
  }, [props.Children]);

  const setUpTree = (data: any[]) => {
    let treeData = [] as any[];
    let key = 1;
    data.map((node: any) => {
      treeData.push({
        title: node.name,
        nodeID: node.id,
        key: key++
      })
    });
    setTreeData(treeData);
  }

  const requestChildren = (ID: any, key: number) => {
    let data = {query:  "query{node(id:\"" + ID + "\"){children { id name }}}"};
    return axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
      return res.data.data.node.children;
    }).then((res: any[]) => {
        let treeData = [] as any[];
        let childkey = 1;
        res.map((node: any) => {
          treeData.push({
            title: node.name,
            key: `${key}-${childkey++}`,
            nodeID: node.id
          });
        });
        return treeData;
    }).catch((e: any) => {
      console.log(e);
    });
  }

  const onCheck = (CheckedKeys: any, e: any) => {
    setCheckedKeys(CheckedKeys);
    console.log(props.Structure);
    let structure = Object.create(props.Structure) as structure;
    e.checkedNodes.map((node: any) => {
      structure.cards.push({
        id: node.props.nodeID,
        name: node.props.title
      });
      structure.index.push(1);
    });
    props.setStructure(structure);
    console.log(props.Structure);
  };

  const onLoadData = (treeNode: any) =>
    new Promise(async resolve => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    treeNode.props.dataRef.children = await requestChildren(treeNode.props.nodeID, treeNode.props.eventKey);
    const temp = Object.create(TreeData);
    setTreeData(temp);
    resolve();
  });
 
  const renderTreeNodes = (data: any) => 
    data.map((item: any) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} dataRef={item} />;
  });
  
  
  return (
    <div>
      <Tree loadData={onLoadData} checkable checkStrictly onCheck={onCheck} checkedKeys={CheckedKeys}>
        {renderTreeNodes(TreeData)}
      </Tree>
    </div>
  );
}

export default CourseNodeAdder;