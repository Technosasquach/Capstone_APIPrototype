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
  cards: [card];
  treeIndex: [string];
}

interface content {
  key: number;
  content: any;
  removeable: boolean;
  imageSet: boolean;
  imageData?: string;
}

const CourseNodeAdder = (props: any) => {
  const [CheckedKeys, setCheckedKeys] = useState({checked: []} as any);
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
    let key = 0;
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
        let childkey = 0;
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

  const changed = (a1: any[], a2: any[]) => {
    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }
    return diff[0];
}

  const onCheck = (CheckedKeysNew: any, e: any) => {
    const change = changed(CheckedKeysNew.checked, CheckedKeys.checked);
    const structure = {cards: props.Structure.cards, index: props.Structure.index, treeIndex: props.Structure.treeIndex} as structure;
    if(CheckedKeysNew.checked.length > CheckedKeys.checked.length) {
      setCheckedKeys(CheckedKeysNew);
      const index = props.Structure.index.length;
      e.checkedNodes.forEach((element: any) => {
        if(element.key === change) {
          structure.cards.push({
            id: element.props.nodeID,
            name: element.props.title
          });
          structure.index.push(index);
          structure.treeIndex.push(change);
          props.setStructure(structure);

          const temp = [...props.Content];
          temp[props.Selected].push([{key: 0, content: "", removeable: false, imageSet: false}] as content[]);
          props.setContent(temp);
        }
      });
    } else if (CheckedKeysNew.checked.length < CheckedKeys.checked.length) {
      setCheckedKeys(CheckedKeysNew);
      const remove = structure.treeIndex.indexOf(change);
      if (remove < structure.cards.length-1) {
        for(let i = remove+1; i < structure.cards.length; i++) {
          const temp = structure.index.indexOf(i);
          structure.index[temp] -= 1;
        }
      }
      structure.cards.splice(remove, 1);
      structure.treeIndex.splice(remove, 1);
      const findIndex = structure.index.indexOf(remove);
      structure.index.splice(findIndex, 1);
      props.setStructure(structure);

      const temp2 = [...props.Content];
      temp2.splice(remove, 1);
      props.setContent(temp2);
      if(props.Selected === remove) {
        props.setSelected(0);
      }
    }
  };

  const onLoadData = (treeNode: any) =>
    new Promise(async resolve => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    treeNode.props.dataRef.children = await requestChildren(treeNode.props.nodeID, treeNode.props.eventKey);
    const temp = [...TreeData];
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