import * as React from "react";

import "./PageBuilder.less";

import Formfill from './Formfill';

export default class PageBuilderPage extends React.Component<any, any> {
    constructor(props: any){
      super(props);

    }
    render() {
        return (
          <div className="coursepage">
            <h1>Page Builder</h1>
            <Formfill/>
          </div>
        );
    }
}