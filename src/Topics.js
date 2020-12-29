import React from 'react';


class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: ['hi'],
            trends: {}
        };
    }

    componentDidMount() {
        fetch('https://api.twitter.com/2/tweets/search/recent?query=python', {
            method: "GET",
            headers: {
                "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAACBJLAEAAAAA%2FiX%2BK2pChL0pizfYvZ8eE9xUI1A%3DfJ2JB5Oiu3JZEIUSAjijRPwQLD5fJkPpMHsGT4QdccrJmRgfiF",
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(console.log)
      }

    render(){
        return (
            <div></div>
        );
    }
}

export default Topics;