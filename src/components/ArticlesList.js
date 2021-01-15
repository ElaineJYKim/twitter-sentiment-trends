import React from "react";
import '../stylesheets/App.css';

import { List, Alert, Divider, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const formatDate = (date) => {
    return date.replaceAll('-', '');
}

const isEmpty = (obj) => {
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
            responseReceived: false,
            showAbstract: false
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.id !== prevProps.id)
        {
          this.fetchArticles();
        }
      }
    
    componentDidMount() {
        this.fetchArticles();      
    }

    fetchArticles() {

        console.log("fetching!");

        this.setState({
            loading: true,
        });

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
        const date = formatDate(this.props.date);
        const query = this.props.query;
        
        let url = '/api/articles?date=' + date + '&q=' + query;
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        
        const loading = this.state.loading;
        const data = this.state.response

        return (
            <div className="articles" >

                {this.state.errorMsg 
                    && <Alert
                    message={this.state.errorMsg}
                    type="error"
                    onClose={() => this.props.onClose()}
                    closable showIcon/> 
                }

                {!this.state.errorMsg && this.state.responseReceived && isEmpty(this.state.response)
                    && <Alert 
                    message="Found no results"
                    type="warning"
                    onClose={() => this.props.onClose()}
                    closable showIcon/>
                }
                
                {!isEmpty(this.state.response) && 
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={data}
                        size='small'
                        pagination={{
                            simple: true,
                            size: 'small',
                            pageSize: 3,
                          }}
                        header={
                            <div className='articles-header'>
                            <h4>
                            <CloseOutlined 
                               className='close-articles'
                               onClick={() => this.props.onClose()}
                            />
                                Relevant New York Times Headlines for <b>{this.props.query}</b>
                            </h4>
                            <h5>
                                Date: <b>{this.props.date}</b>
                                <Divider type="vertical"/>
                                <Button 
                                   type="text"
                                   size="small"
                                   onClick={() => this.setState({showAbstract: !this.state.showAbstract})}
                                >
                                    <h5>{this.state.showAbstract? "hide abstract" : "show abstract"}</h5>
                                </Button>
                            </h5>
                            </div>
                        }
                        bordered={true}
                        renderItem={item => (
                            <List.Item>
                                {this.state.showAbstract ? 
                                  <List.Item.Meta
                                  title={<a href={item['web_url']}>{item['headline']['main']}</a>}
                                  description={item['abstract']}
                                  /> :
                                  <List.Item.Meta
                                  title={<a href={item['web_url']}>{item['headline']['main']}</a>}
                                  />
                                }
                            </List.Item>
                        )}
                    />} 

            </div>
        );
    }
}

export default ArticlesList;