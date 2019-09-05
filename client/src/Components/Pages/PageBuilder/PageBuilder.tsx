import * as React from "react";

import "./PageBuilder.less";

import Formfill from './Formfill';
import PageSelector from './PageSelector';

export default class PageBuilderPage extends React.Component<any, any> {
    constructor(props: any){
      super(props);
      this.state = {
        test: this.props.location.state.test
      };
    }
    render() {
      console.log(this.state.test);
        return (
            <div className="coursepage">
                <div className="contentregion">
                  <PageSelector/>
                </div>
                <div className="dataregion">
                  <Formfill/>
                </div>
            </div>
        );
    }
}