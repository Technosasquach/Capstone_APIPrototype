import * as React from "react";
import axios from 'axios'
import CourseStructure from './CourseStructure';
import CourseNodeAdder from './CourseNodeAdder';

import "./CourseBuilder.less";

export default class CourseBuilderPage extends React.Component<any, any> {
  state = {
    structure: []
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
    let data:any = {query:  "query{node(id: \"" + this.props.match.params.id + "\"){name}}\n\n"};
    axios.post("http://localhost:3000/graphql/", data).then(res => {
      return res.data['data']['node']['name'];
    }).then((res) => {
      this.setState({
        structure: [res],
      });
      console.log(this.state.structure);
    });
  }

  render() {
      return (
          <div className="coursepage">
              <div className="stuctureregion">
                <CourseStructure structure={this.state.structure} />
              </div>
              <div className="selectregion">
                <CourseNodeAdder/>
              </div>
          </div>
      );
  }
}