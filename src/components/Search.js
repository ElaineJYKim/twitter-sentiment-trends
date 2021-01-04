// https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-rule
import React from "react";
import '../stylesheets/App.css';

import { Input, Divider, Row, Col, Card } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            curValue: '',
            topics: ["whales"]
        };
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter() {
        const newTopics = [...this.state.topics, this.state.curValue]
        this.setState({
            curValue: '',
            topics: newTopics
        });
    }

    render() {
        const topics = this.state.topics;

        return(
            <div>
                <Input 
                placeholder="Search Topic" 
                value={this.state.curValue}
                onChange={(e) => this.setState({curValue: e.target.value})}
                onPressEnter={this.handleEnter}
                />

                <div className='topic-cards'>
                <Divider orientation="left">Topics</Divider>
                    <Row gutter={16}>
                    { topics.map((topic) => (
                        <Col className="gutter-row" span={6} >
                           <Card title={topic} bordered={true} extra={<PlusCircleTwoTone twoToneColor="#52c41a" onClick={()}/>}>
                           </Card>
                        </Col>
                    )) }
                    </Row>
                </div>
            </div>
        );
    }
}

export default Search;