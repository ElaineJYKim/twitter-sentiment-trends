import React from "react";
import '../stylesheets/App.css';

import { List, Alert, Spin, Typography } from 'antd';

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

class ArticlesList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            date: "",
            errorMsg: "",
            response: {},
            loading: false,
            responseReceived: false
        };
    }

    componentDidMount() {

        this.setState({loading: true})

        const value = this.state.curValue;
        const topics = this.state.topics;

        this.callApi()
           .then(
               res => {
                   this.setState({
                       response: res["body"]["response"]["docs"],
                       loading: false,
                       responseReceived: true
                    })
                })
           .catch(err => {
               // Error message is empty
                   console.log("im HEREEE <3: ", err);
                   this.setState({
                    errorMsg: "Pulling articles. " + err,
                    loading: false,
                    responseReceived: true
                 })
                });

    };

    callApi = async () => {
        const date = this.state.date;
        const query = this.state.query;
        
        let url = '/api/articles' + "?date=" + date + "&q=" + query;
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {

        const loading = this.state.loading;
        const data = this.state.response

        return (
            <div className="articles-list" >

                {this.state.errorMsg 
                    && <Alert
                    message={this.state.errorMsg}
                    type="error"
                    closable showIcon/> 
                }

                {!this.state.errorMsg && this.state.responseReceived && isEmpty(this.state.response)
                    && <Alert 
                    message="Found no results"
                    type="warning"
                    closable showIcon/>
                }
                
                {!isEmpty(this.state.response) && 
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={<a href={item['web_url']}>{item['headline']['main']}</a>}
                                description={item['abstract']}
                                />
                            </List.Item>
                        )}
                    />} 

            </div>
        );
    }
}

export default ArticlesList;