import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Tree } from 'antd';

const { TreeNode } = Tree;

import { structure } from './../Types';

import {StructureContext} from './../Context/StructureContext';
import {ContentContext} from './../Context/ContentContext';
import {QuizContext} from './../Context/QuizContext';

import { EditorState, convertFromRaw } from 'draft-js';
const draftandmark = require('./../PageBuilder/markdownDraftjs/index');

const CourseNodeAdder = (props: any) => {
  const [CheckedKeys, setCheckedKeys] = useState({checked: []} as any);
  const [TreeData, setTreeData] = useState([] as any);
  const structureContext = useContext(StructureContext);
  const contentContext = useContext(ContentContext);
  const quizContext = useContext(QuizContext);

  useEffect(() => {
    if(structureContext.Children.length > 0) {
      setUpTree(structureContext.Children);
    } else {
      setTreeData([]);
    }
  }, [structureContext.Children]);

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
    return axios.post("/graphql/", data).then((res: any) => {
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

  const loadData = (id: string) => {
    let data = {query:  "query{informationByNodeId(nodeId: \"" + id + "\"){data type id}}"};
    axios.post("/graphql/", data).then((res: any) => {
      return ([...res.data.data.informationByNodeId]);
    }).then((json: any) => {
      const IDS = [] as any[];
      const tempContent = [...contentContext.Content];
      const tempImages = [...contentContext.Images]
      const tempIDS = [...contentContext.IDS]
      tempContent.push(EditorState.createEmpty());
      tempImages.push([]);
      tempIDS.push([]);

      json.forEach((element: any) => {
        if(element.type === "text") {
          tempContent[tempContent.length-1] = (EditorState.createWithContent(convertFromRaw(draftandmark.markdownToDraft(element.data))));
        } else {
          const data = JSON.parse(element.data);
          tempImages[tempImages.length-1] = ([...data]);
        }
        IDS.push({id: element.id, type: element.type});
      });
      tempIDS[tempIDS.length-1] = (IDS);
      contentContext.setContent(tempContent);
      contentContext.setImages(tempImages);
      contentContext.setIDS(tempIDS);
    });
  }

  const onCheck = (CheckedKeysNew: any, e: any) => {
    const change = changed(CheckedKeysNew.checked, CheckedKeys.checked);
    const structure = {cards: structureContext.Structure.cards, index: structureContext.Structure.index, treeIndex: structureContext.Structure.treeIndex} as structure;
    if(CheckedKeysNew.checked.length > CheckedKeys.checked.length) {
      setCheckedKeys(CheckedKeysNew);
      const index = structureContext.Structure.index.length;
      e.checkedNodes.forEach((element: any) => {
        if(element.key === change) {
          structure.cards.push({
            id: element.props.dataRef.nodeID,
            name: element.props.dataRef.title
          });
          structure.index.push(index);
          structure.treeIndex.push(change);
          loadData(element.props.dataRef.nodeID);
          structureContext.setStructure(structure);
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

      const temp2 = [...contentContext.Content];
      temp2.splice(remove + 1, 1);
      contentContext.setContent(temp2);
      quizContext.checkIfRemove(remove+1);

      structure.cards.splice(remove, 1);
      structure.treeIndex.splice(remove, 1);
      const findIndex = structure.index.indexOf(remove);
      structure.index.splice(findIndex, 1);
      structureContext.setStructure(structure);

      if(structureContext.Selected.index === remove + 1) {
        structureContext.setSelected({index: 0, type: 0});
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
  
  ///@ts-ignore
  return <Tree loadData={onLoadData} checkable checkStrictly onCheck={onCheck} checkedKeys={CheckedKeys}>
        {renderTreeNodes(TreeData)}
    </Tree>
}

export default CourseNodeAdder;