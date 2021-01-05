import React from "react";
import '../stylesheets/App.css';

import { Input, Divider, Row, Col, Card, Title } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';


class TopicsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }

    handleSelect(topic) {
        const selected = this.state.selected;

        if (selected.includes(topic)) {
            const newSelected = selected.filter(function(t) { return t !== topic; })
            this.setState({selected: newSelected})
        } else {
            this.setState({selected: [...selected, topic]})
        }

        this.props.onChange(this.state.selected);
    }

    render() {
        const topics = this.props.topics;
        const loading = this.props.loading;

        return(
            <div className='topic-cards'>
                <Divider orientation="left">Topics</Divider>
                <Row gutter={16}>
                { topics.map((topic) => (
                <Col className="gutter-row" span={6} >
                    <Card title={topic} bordered={true} extra={<PlusCircleTwoTone twoToneColor="#52c41a"/>}>
                        <button onClick={this.handleSelect(topic)}>See Trends</button>
                    </Card>
                </Col>
                )) }
            
                </Row>
            </div>
        );
    }
}

export default TopicsList;
