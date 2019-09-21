import * as React from "react";
import axios from 'axios'
import CourseStructure from './CourseStructure';
import CourseNodeAdder from './CourseNodeAdder';
import Loader from './../../Utility/Loader';


import "./CourseBuilder.less";

interface card {
  id: string;
  text: string;
}

export default class CourseBuilderPage extends React.Component<any, any> {
  state = {
    parent: [] as card[],
    structure: [],
    treeData: [],
    children: [] as string[],
    loading: true
  }

  componentDidMount() {
    this.requestData();
  }

  componentDidUpdate(previous: any) {
    if(previous !== this.props) {
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
      this.setState({
        parent: [{id: res.id, name: res.name}],
        structure: [{id: res.id, name: res.name}],
        children: res.children,
      });
    });
  }

  updateLoading = (treedata: any[]) => {
    if(this.state.loading === true) {
      this.setState({
        treeData: treedata,
        loading: false
      })
    } else {
      this.setState({
        treeData: treedata
      })
    }
  }

  updateStructure = (structure: card[]) => {
    this.setState({
      structure: this.state.parent.concat(structure)
    });
  }

  render() {
      return (
        <Loader loading={this.state.loading}>
          <div className="coursepage">
              <div className="stuctureregion">
                <CourseStructure structure={this.state.structure} />
              </div>
              <div className="selectregion">
                <CourseNodeAdder structure={this.state.structure} updateStructure={this.updateStructure} children={this.state.children} treeData={this.state.treeData} loading={this.updateLoading}/>
              </div>
          </div>
        </Loader>
      );
  }
}