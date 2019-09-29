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
  const [CheckedKeys, setCheckKeys] = useState();

  useEffect(() => {
    setLocalTree(renderTreeNodes(props.Tree));
  }, props.Tree)

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

  const onCheck = (checkedKeys: any, e: any) => {
    setCheckKeys({ checkedKeys });
    console.log(props);
    const structure = props.Structure as structure;
    e.checkedNodes.map((node: any) => {
      structure.cards.push({
        id: node.props.nodeID,
        name: node.props.title
      });
      structure.index.push(1);
    })
    props.setStructure(structure);
  };

  const onLoadData = (treeNode: any) =>
    new Promise(async resolve => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    treeNode.props.dataRef.children = await requestChildren(treeNode.props.nodeID, treeNode.props.eventKey);
    console.log(props.Tree);
    setLocalTree(renderTreeNodes(props.Tree));
    resolve();
  });

  const renderTwo = (data: any) => data.map((item: any) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} dataRef={item} />;
  })
  
  const renderTreeNodes = (data: any) => (
    <Tree loadData={onLoadData} checkable checkStrictly onCheck={onCheck} checkedKeys={CheckedKeys}>
        {data.map((item: any) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {renderTwo(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} {...item} dataRef={item} />;
      })}
    </Tree>
  )
  
  const [LocalTree, setLocalTree] = useState(renderTreeNodes(props.Tree));
  
  return (
    <div>
      {LocalTree}
    </div>
  );
}

export default CourseNodeAdder;