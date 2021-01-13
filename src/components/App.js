import React from "react";
import '../stylesheets/App.css';
import Search from './Search';
import Logo from '../assets/logo.png';

import { PageHeader, Typography } from 'antd';

const content = (
    <>
      <Typography>
        Search for a topic and visualize sentiment changes in the Twitter community.
        Search for multiple topics to compare and contrast these trends. 
        Click on datapoints to see if there are any relavent New York Times articles.
        Maybe you will find interesting potential correlations!
      </Typography>
    </>
  );

class App extends React.Component {

    render() {
        return(
            <div className="">
                <PageHeader
                    title="Twitter Sentiment Trends Visualizer"
                    className="site-page-header" 
                    subTitle=""
                    avatar={{src:Logo, size:'large', shape:'square'}}
                    className='slim-container'
               >
                {content}
                </PageHeader>
                
                <Search/>
            </div>
        );
    }
}

export default App;

