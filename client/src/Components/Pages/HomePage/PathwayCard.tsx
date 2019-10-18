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

interface iProps{
    svgtype: number;
}
function PathwayCard(myProps:iProps) {
    const svgTypes = ["database", "book", "car", "control", "environment", "deployment-unit", "gold", "heat-map", "sliders", "sketch"];
    // console.log(myProps.svgtype);
    
    function getRandomIndex(max:number) {
        const index = Math.floor(Math.random() * Math.floor(max));
        return svgTypes[index];
      }
      

    
    return (
        <div>
            <Icon type={getRandomIndex(myProps.svgtype)}theme="twoTone" style={{ fontSize: '132px' }}/>
        </div>
    )
}

export default PathwayCard


