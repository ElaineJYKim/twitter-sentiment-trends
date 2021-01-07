import React from "react";
import '../stylesheets/App.css';

import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
    }

    handleClick(e) {
        this.setState(state => ({
            selected: !state.selected
        }));
    }

    render() {
        const selected = this.state.selected;

        if (selected) {
            return(
                <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={this.handleClick.bind(this)}/>
            )
        } else {
            return(
                <PlusCircleTwoTone onClick={this.handleClick.bind(this)}/>
            )
        }
    }
}


export default Select;