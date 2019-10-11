import * as React from 'react'
import { Spin } from 'antd';


export default class Loader extends React.Component<any, any> {

  render() {
      if(this.props.loading === true) {
        return (
            <Spin>
                {this.props.children}
            </Spin>
        );
      } else {
          return this.props.children;
      }
    }
}