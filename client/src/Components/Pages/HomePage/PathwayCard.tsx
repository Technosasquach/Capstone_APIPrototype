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

interface iProps {
    svgtype: string;
}
const PathwayCard: React.SFC<iProps> = (myProps) => {
    const svgTypes = ["database", "book", "car", "control", "environment", "deployment-unit", "gold", "heat-map", "sliders", "sketch"];

    const hashCode = (s: string) => {
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
      }

    const svgnum = hashCode(myProps.svgtype)%8 + 1;    
    const svg = svgTypes[svgnum];

    return (
        <div>
            <Icon type={svg} theme="twoTone" style={{ fontSize: '132px' }} />
        </div>
    )
}

export default PathwayCard


