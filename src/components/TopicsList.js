import React from "react";
import '../stylesheets/App.css';

import { Divider, Card, List, Button } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';


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
        const topic = e.target.value;
        var newSelected = [];

        if (selected.includes(topic)) {
            newSelected = selected.filter(function(t) { return t !== topic; });
        } else {
            newSelected = [...selected, topic];
        };

        this.setState({selected: newSelected});

        this.props.onChange(newSelected);
    }

    render() {
        const topics = this.props.topics;
        const loading = this.props.loading;

        return(
            <div className='topic-cards'>

                <Divider orientation="left">Select Topics</Divider>

                <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                dataSource={topics}
                renderItem={topic => (
                <List.Item>
                    <Card title={topic}>
                    <Button type="primary" value={topic} onClick={this.handleSelect.bind(this)}>See Trends</Button>
                    </Card>
                </List.Item>
                )}
                />,

            </div>
        );
    }
}

export default TopicsList;
