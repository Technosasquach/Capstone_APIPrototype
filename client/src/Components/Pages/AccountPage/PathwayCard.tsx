import * as React from "react";
import "./PathwayCard.less";
import 'antd/dist/antd.css';
import { Icon } from "antd";

// var divStyle = {
//     background: 'blue',
//     WebkitTransition: 'all', // note the capital 'W' here
//     msTransition: 'all' // 'ms' is the only lowercase vendor prefix
//   };
// style={divStyle}



// export default class PathwayCard extends React.Component<any, any> {
//     constructor(props: any) {
//         super(props);
//     }

    
//     render() {
//         return (
//             <div style={divStyle}>
//                 <Icon type="code" theme="twoTone" style={{ fontSize: '192px' }}/>
//             </div>
//         );
//     }
// }


function PathwayCard(myProps:any) {

    return (
        <div>
            <Icon type={myProps.svgType} theme="twoTone" style={{ fontSize: '192px' }}/>
        </div>
    )
}

export default PathwayCard


