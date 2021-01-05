import React from "react";
import '../stylesheets/App.css';

import { Input, Divider, Row, Col, Card } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';


class Graph extends React.Component {

    render() {

        const selectedTopics = this.props.selected;

        return(
            <div className='graph'>
                { selectedTopics.map((topics) => (
                    <p>{topics}</p>
                ))
                }
            </div>
        );
    }
}

export default Graph;