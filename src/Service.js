import React from 'react';
import Topics from './Topics';
import Trends from './Trends';
import {Input, Alert} from 'antd';

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: ['hi'],
            trends: {}
        };

        this.onSearch = this.onSearch.bind(this)
    }

    onSearch(event) {
        const newTopic = event.target.value;
        const topics = this.state.topics;

        if (topics === undefined || !topics.includes(newTopic)) {
            this.setState({topics: [...topics, newTopic]})

        } else {
            console.log("its a repeat");
           // return(<Alert banner closable message="Topic has already been analyzed!" type="info" />);
        }
    }

    // handleTrends(newTrends) {
    //     this.setState({trends: newTrends})
    // }

    render(){

        return (
            <div>
                <Input
                    placeholder="topic" 
                    onPressEnter={this.onSearch} 
                    style={{ width: 200, margin: '0 10px' }}
                />

                <Topics/>
            </div>
        );
    }
}

export default Service;