import * as React from "react";
import { Link } from "react-router-dom";

import {LinkContext} from "../../index";
import "./Button.less";

export default class sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
            path: this.props.pather,
            text: this.props.text,
            index: this.props.index,
         };
    }

    render() {
        return (
            <LinkContext.Consumer>
                {({index, setIndex}) => (<div className={ (index == this.state.index) ? 'highlight' : 'nohighlight'}>
                    <Link to={this.state.path} onClick={() => setIndex(this.state.index)}><span>{this.props.children}{this.state.text}</span></Link>
                </div>)}
            </LinkContext.Consumer>
        );
    }
}

