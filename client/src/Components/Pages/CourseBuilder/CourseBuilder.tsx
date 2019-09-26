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

export interface pageData {
  id: number;
  data: {};
}

export default class CourseBuilderPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      parent: [] as card[],
      structure: [],
      treeData: [],
      selectedPage: {},
      indexes: 1,
      pages: {},
      loading: true,
      visible: false,
      submit: false
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
          loading: false,
          selectedPage: {
            name: res.name,
            nodeid: res.id,
            id: 0
          }
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

  switchPage = (id: any) => {
    const node = this.state.structure[id];
    this.setState({
      selectedPage: {
        name: node.name,
        nodeid: node.id,
        id: id
      }
    });
  }

  savePageState = (input: any, id: number) => {
    let temp = this.state.pages;
    temp[id] = input;
    this.setState({
      pages: temp
    });
  }

  submitCourse = (name: string) => {
    this.setState({
      submit: true
    })
    let data = { coursename: name, data: this.state.pages, amount: this.state.indexes};
    axios.post("http://localhost:3000/CourseCreate", data);
  }

  render() {
      return (
        <Loader loading={this.state.loading}>
            <div className="coursepage">
                <div className="stuctureregion">
                  <CourseStructure showModal={this.showModal} structure={this.state.structure} switcher={this.switchPage} submitter={this.submitCourse}/>
                </div>
                <div className="selectregion">
                  <PageBuilder node={this.state.selectedPage} save={this.savePageState} pages={this.state.pages} submit={this.state.submit} /> 
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