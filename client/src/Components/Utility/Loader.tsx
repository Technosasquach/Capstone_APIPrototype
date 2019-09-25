import * as React from 'react'
import { Spin } from 'antd';

export default class Loader extends React.Component<any, any> {

  render() {
      if(this.props.loading === true) {
        return (
            <div id={"vis"}>
                <Spin className={"Spinner"}>
                    {this.props.children}
                </Spin>
            </div>
        );
      } else {
          return this.props.children;
      }
    }
}