import React from "react";
import '../stylesheets/App.css';
import Select from './Select';

import { Divider, Card, List, Row, Col } from 'antd';
import {DeleteOutlined, EllipsisOutlined, EditOutlined} from '@ant-design/icons';

class TopicsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }

        //this.handleSelect = this.handleSelect.bind(this);
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
        const topic = e.currentTarget.value;
        this.props.delete(topic)
    }

    render() {
        const topics = this.props.topics;
        const loading = this.props.loading;

        return(
            <div className='topic-cards'>

                <Divider orientation="left">Topics</Divider>

                <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={topics}
                loading={loading}
                renderItem={topic => (
                <List.Item>
                    <Card
                    actions={[ 
                    // <selectContainer className="selectContainer" data-topic={topic} onClick={this.handleSelect.bind(this)}>
                    //                 <Select/>
                    // </selectContainer>, 
                    <DeleteOutlined value={topic} onClick={this.handleDelete.bind(this)} key="delete"/>
                    ]}
                    >
                        <Row align="top" justify="center">
                            <Col span={22}><h4>{topic}</h4></Col>
                            <Col span={2}>
                                <selectContainer 
                                    className="selectContainer"
                                    data-topic={topic}
                                    onClick={this.handleSelect.bind(this)}
                                >
                                    <Select/>
                                </selectContainer>
                            </Col>
                        </Row>
                    </Card>
                </List.Item>
                )}
                />

            </div>
        );
    }
}

export default TopicsList;


{/* <Card>
<Row justify="end">
    <selectContainer 
        className="selectContainer"
        data-topic={topic}
        onClick={this.handleSelect.bind(this)}
    >
        <Select/>
    </selectContainer>
</Row>
<Row>
    <h4>{topic}</h4>
</Row>
</Card> */}