import * as React from "react";

import "./PageBuilder.less";

import Formfill from './Formfill';

export default class PageBuilderPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
      return (
        <div className="pageBuilder">
          <h1>Page Builder</h1>
          <Formfill nodeName={this.props.node.name} nodeID={this.props.node.id} save={this.props.save} pages={this.props.pages} submit={this.props.submit}/>
        </div>
      );
  }
}