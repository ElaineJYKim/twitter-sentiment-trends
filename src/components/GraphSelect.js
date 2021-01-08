import React from "react";
import '../stylesheets/App.css';

import { MinusCircleTwoTone, StockOutlined } from '@ant-design/icons';

class GraphSelect extends React.Component {

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
        const tooltipText = "See sentiment trends"

        if (selected) {
            return(
                <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={this.handleClick.bind(this)}/>
            )
        } else {
            return(
                <StockOutlined onClick={this.handleClick.bind(this)}/>
            )
        }
    }
}


export default GraphSelect;