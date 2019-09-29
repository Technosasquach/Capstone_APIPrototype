import * as React from "react";
import axios from 'axios'
import CourseStructure from './CourseStructure';
import CourseNodeAdder from './CourseNodeAdder';
import Loader from './../../Utility/Loader';
//import PageBuilder from './PageBuilder/PageBuilder';

import "./CourseBuilder.less";

import { Modal } from 'antd';

interface card {
  id: string;
  text: string;
}

export default class CourseBuilderPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      parent: {} as card,
      structure: {index: [], cards: []},
      treeData: [],
      loading: true,
      visible: false,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  componentDidUpdate(previous: any) {
    if(previous.match.params.id !== this.props.match.params.id) {
      this.requestData();
    }
  }

  requestData = () => {
    let data:any = {query:  "query{node(id: \"" + this.props.match.params.id + "\"){id name children { id name } }}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        id: res.data['data']['node']['id'],
        name: res.data['data']['node']['name'],
        children: res.data['data']['node']['children']
      };
    }).then((res) => {
      const tree = this.setUpTree(res.children)
      this.setState({
        parent: {id: res.id, name: res.name},
        structure: {index: [0], cards: [{id: res.id, name: res.name}]},
        children: res.children,
        treeData: tree,
        loading: false,
      });
    });
  }

  setUpTree(data: any[]) {
    let treeData = [] as any[];
    let key = 1;
    data.map((node: any) => {
      treeData.push({
        title: node.name,
        nodeID: node.id,
        key: key++
      })
    });
    return treeData;
  }

  updateLoading = (treedata: any[]) => {
    this.setState({
      treeData: treedata
    })
  }

  updateStructure = (structure: card[]) => {
    this.setState({
      structure: this.state.parent.concat(structure),
      indexes: this.state.indexes + 1
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  render() {
      return (
        <Loader loading={this.state.loading}>
            <div className="coursepage">
                <div className="stuctureregion">
                  <CourseStructure showModal={this.showModal} structure={this.state.structure}/>
                </div>
                <div className="selectregion">
                </div>
            </div>
            <Modal
                title="Structure Select"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <CourseNodeAdder enabled={true} structure={this.state.structure} updateStructure={this.updateStructure} treeData={this.state.treeData} loader={this.updateLoading}/>
            </Modal>
        </Loader>
      );
  }
}