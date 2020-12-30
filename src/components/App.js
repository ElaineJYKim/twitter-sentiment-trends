import React from "react";


class App extends React.Component {

    constructor(props) {
        super(props);
        var Sentiment = require('sentiment');
        this.sentiment = new Sentiment();
    }

    render() {
        return(
            <h1>hi</h1>
        );
    }
}

export default App;

