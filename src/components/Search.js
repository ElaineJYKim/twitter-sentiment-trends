// https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-rule
import React from "react";
import '../stylesheets/App.css';
import TopicsList from './TopicsList';
import Graph from './Graph';

import { Input, Alert } from 'antd';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            curValue: '',
            topics: ["bumblebee"],
            selected: [],
            info: {},
            errorMsg: "",
            loading: false,
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectedListChange = this.handleSelectedListChange.bind(this);

    }

    renderError() {
        return (
            <div>
            {console.log("HERE TOOO <#")}
            <Alert
                message="Opsies: Error time"
                description={this.state.errorMsg}
                type="error"
                closable
            />
            </div>
        )
    }

    handleSearch() {
        const newTopics = [...this.state.topics, this.state.curValue]
        this.setState({loading: true})

        this.callApi()
           .then(
               res => {
                   const updateInfo = this.state.info;
                   updateInfo[this.state.curValue] = res;
                   this.setState({
                       info: updateInfo,
                       curValue: '',
                       topics: newTopics,
                       loading: false,
                    })
                })
           .catch(err => {
               // Error message is empty
                   console.log("im HEREEE <3: ", err);
                   this.setState({
                    curValue: '',
                    errorMsg: "Yuppers. big fail. sad. big sad.",
                    loading: "false"
                 })
                });

    };

    callApi = async () => {
        let url = '/api/searchSentiment/' + this.state.curValue;
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    handleEnter() {
        const newTopics = [...this.state.topics, this.state.curValue]
        this.handleSearch()
        this.setState({
            curValue: '',
            topics: newTopics
        });
    }

    onErrorClose() {
        this.setState({errorMsg: ''})
    }

    handleSelectedListChange(s) {
        this.setState({selected: s});
    }

    render() {
        return(
            <div>

                {this.state.errorMsg && <Alert
                    message="Opsies: Error time"
                    description={this.state.errorMsg}
                    type="error"
                    onClose={() => this.setState({errorMsg: ''})}
                    closable showIcon/>
                }

                <Input 
                placeholder="Search Topic" 
                value={this.state.curValue}
                onChange={(e) => this.setState({curValue: e.target.value})}
                onPressEnter={this.handleSearch}
                />

                <Graph info={this.state.info} selected={this.state.selected}>
                </Graph>

                <TopicsList 
                topics={this.state.topics} 
                selected={this.state.selected} 
                info={this.state.info}
                onChange={this.handleSelectedListChange}
                />

            </div>
        );
    }
}

export default Search;