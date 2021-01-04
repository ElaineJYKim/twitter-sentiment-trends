import React from "react";
import '../stylesheets/App.css';
import Search from './Search';

import { PageHeader, Typography } from 'antd';

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
            <div>
                <PageHeader
                    title="Twitter Sentiment Trends Visualizer"
                    className="site-page-header" 
                    subTitle=""
                    avatar={{ src: '' }}
               >
                {content}
                </PageHeader>
                
                <Search/>
            </div>
        );
    }
}

export default App;

