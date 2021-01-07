// https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-rule
import React from "react";
import '../stylesheets/App.css';
import TopicsList from './TopicsList';
import Graph from './Graph';

import { Input, Alert, Typography } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';

const tips = (
    <>
    <h3> Tips for better results! - Specify your search</h3>
    <br/>

    <p>I am going to search twitter for a bunch of tweets using the search phrase you give me. </p>
    <p>This means, if you search "Donald Trump", I will collect a bunch of tweets that contains the keyword "Donald Trump".</p>
    <p>I recommend you <b>narrowing</b> your search using the tools below to get the best results.</p>

    <ul>
       <li>AND operators: <b>snow day #NoSchool</b> == "snow AND day AND #NoSchool"</li>
       <li>OR operators: <b>grumpy OR cat OR #meme</b></li>
       <li>Group operators: <b>(grumpy cat) OR (#meme has:images)</b></li>
       <li>Negate: <b>cat #meme -grumpy</b> means contains key word "cat", hashtag "meme", but NOT the keyword "grumpy"</li>
    </ul> 
    </>
  ); 

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            curValue: '',
            topics: ["helloooo"],
            selected: [],
            info: {},
            errorMsg: "",
            showTips: true,
            loading: false,
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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

        const value = this.state.curValue;
        const topics = this.state.topics;

        if (topics.includes(value)) {
            this.setState({
                errorMsg: "You have already searched for this topic",
                curValue: ''
            })
        } else {
        const newTopics = [...this.state.topics, value]
        this.setState({loading: true})

        this.callApi()
           .then(
               res => {
                   const updateInfo = this.state.info;
                   updateInfo[value] = res;
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
                    errorMsg: "Something went wrong with the server",
                    loading: false
                 })
                });
        }

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

    handleSelectedUpdate(newSelected) {
        this.setState({selected: newSelected});
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

                {this.state.showTips && <div className="space"/> && <Alert
                    message={tips}
                    type="info"
                    onClick={() => this.setState({showTips: false})}
                    closeable/>
                }

                <div className="space"/>

                <Input 
                placeholder="Search Topic" 
                value={this.state.curValue}
                onChange={(e) => this.setState({curValue: e.target.value})}
                onPressEnter={this.handleSearch}
                suffix={<InfoCircleTwoTone onClick={() => this.setState({showTips: true})}/>}
                />

                <div className="space"/>

                <Graph info={this.state.info} selected={this.state.selected}>
                </Graph>

                <div className="space"/>

                <TopicsList 
                topics={this.state.topics} 
                selected={this.state.selected} 
                info={this.state.info}
                loading={this.state.loading}
                onChange={this.handleSelectedUpdate.bind(this)}
                />

            </div>
        );
    }
}

export default Search;