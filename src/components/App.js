import React from "react";
import '../stylesheets/App.css';
import Search from './Search';
import Logo from '../assets/logo.png';

import { PageHeader, Typography } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';

const content = (
    <>
      <Typography>
        Search for any topic you'd like and visualize sentiment changes in the twitter community.
        You can compare and contrast these trends. Maybe you will find interesting potential 
        correlations!
      </Typography>
    </>
  );

class App extends React.Component {

    render() {
        return(
            <div className="app-container">
                <PageHeader
                    title="Twitter Sentiment Trends Visualizer"
                    className="site-page-header" 
                    subTitle=""
                    avatar={{src:Logo, size:'large', shape:'square'}}
               >
                {content}
                </PageHeader>

                <div className="space"/> <div className="space"/>
                
                <Search/>
            </div>
        );
    }
}

export default App;

