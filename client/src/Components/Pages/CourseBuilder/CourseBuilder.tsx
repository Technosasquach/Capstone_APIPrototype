import * as React from "react";
import axios from 'axios'
import CourseStructure from './CourseStructure';
import CourseNodeAdder from './CourseNodeAdder';
import Loader from './../../Utility/Loader';
import PageBuilder from './PageBuilder/PageBuilder';

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
      parent: [] as card[],
      structure: [],
      treeData: [],
      children: [] as string[],
      loading: true,
      building: false,
      pages: [],
      visible: false
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
    let data:any = {query:  "query{node(id: \"" + this.props.match.params.id + "\"){id name children}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return {
        id: res.data['data']['node']['id'],
        name: res.data['data']['node']['name'],
        children: res.data['data']['node']['children']
      };
    }).then((res) => {
      this.setUpTree(res.children).then(response => {
        this.setState({
          parent: [{id: res.id, name: res.name}],
          structure: [{id: res.id, name: res.name}],
          children: res.children,
          treeData: response,
          loading: false
        });
      });
    });
  }

  setUpTree(IDS: any[]) {
    return Promise.all(IDS.map((ID: string) => {
      let data = {query: "query{node(id: \"" + ID + "\"){name children}}\n\n"};
      return axios.post("http://localhost:3000/graphql/", data).then((res: any) => {
        return {
          name: res.data.data.node.name,
          children: res.data.data.node.children,
          nodeID: ID,
        };
      });
    })).then((res: any) => {
      let treeData = [] as any[];
      let key = 1;
      res.map((node: any) => {
        treeData.push({
          title: node.name,
          key: key++,
          childIDS: node.children,
          nodeID: node.nodeID
        })
      });
      return treeData;
    });
  }

  updateLoading = (treedata: any[]) => {
    this.setState({
      treeData: treedata
    })
  }

  updateStructure = (structure: card[]) => {
    this.setState({
      structure: this.state.parent.concat(structure)
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
      return (
        <Loader loading={this.state.loading}>
            <div className="coursepage">
                <div className="stuctureregion">
                  <CourseStructure showModal={this.showModal} structure={this.state.structure} />
                </div>
                <div className="selectregion">
                  <PageBuilder/> 
                </div>
            </div>
            <Modal
                title="Structure Select"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <CourseNodeAdder enabled={true} structure={this.state.structure} updateStructure={this.updateStructure} nodechildren={this.state.children} treeData={this.state.treeData} loader={this.updateLoading}/>
            </Modal>
        </Loader>
      );
  }
}