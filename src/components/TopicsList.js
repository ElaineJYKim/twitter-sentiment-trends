import React from "react";
import '../stylesheets/App.css';
import GraphSelect from './GraphSelect';

import { Divider, Card, Row, Col, Spin } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import { Redirect } from "react-router-dom";

class TopicsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }

    handleSelect(e) {

        const selected = this.state.selected;
        const topic = e.currentTarget.dataset.topic;
        var newSelected = [];

        if (selected.includes(topic)) {
            newSelected = selected.filter(function(t) { return t !== topic; });
        } else {
            newSelected = [...selected, topic];
        };

        this.setState({selected: newSelected});

        this.props.onChange(newSelected);
    }

    handleDelete(e) {
        const topic = e.currentTarget.dataset.topic;
        console.log("AYAY: ", topic)
        this.props.delete(e)
    }

    render() {
        const topics = this.props.topics;
        const loading = this.props.loading;

        return(
            <div className='topic-cards'>

                <Divider orientation="left"><h4>Topics</h4></Divider>

                <Spin size="small" spinning={loading} tip="look at the spinny thing and it shall load in no time...">
                <Row gutter={[16, 16]}>
                { topics.map((topic) => (
                <Col className="gutter-row" span={6} >
                    <Card
                        actions={[
                            <div className="selectContainer" data-topic={topic} onClick={this.handleSelect.bind(this)}>
                                    <GraphSelect/>
                            </div>, 
                            <DeleteOutlined data-topic={topic} onClick={this.handleDelete.bind(this)} key="delete"/>
                        ]}
                    >
                        <h4>{topic}</h4>
                    </Card>
                </Col>
                )) }
                </Row>
                </Spin>

            </div>
        );
    }
}

export default TopicsList;