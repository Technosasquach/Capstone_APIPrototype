import * as React from 'react'
import { Spin } from 'antd';


const Loader = (props: any) => {
    return (
      <div style={{width: "100%", height: "100%", textAlign: "center", lineHeight: "75vh"}}>
        <Spin tip="Loading..."/>
      </div>
    );
}

export default Loader;