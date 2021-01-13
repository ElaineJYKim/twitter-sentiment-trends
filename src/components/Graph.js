import React from "react";
import '../stylesheets/App.css';
import ArticlesList from './ArticlesList';

import { Divider, Alert } from 'antd';
import { ResponsiveLine } from '@nivo/line';
import { InfoCircleTwoTone } from '@ant-design/icons';

function formatData(selected, info) {
    var formatted = [];

    selected.forEach((topic) => {
        let data = info[topic]

        var dataRefactored = []
        Object.keys(data).forEach((key) => (
            dataRefactored.push({"x": key, "y": data[key]})
        ));

        formatted.push({"id": topic, "data": dataRefactored})
    });

    return formatted
}

class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewArticles: false,
      date: '',
      query: '',
      point_id: '',
      showTip: true,
    };

    this.closeArticles = this.closeArticles.bind(this);
  }

  renderArticlesList() {
    console.log("renderArticlesList called!");
    return (
      <ArticlesList 
          date={this.state.date} 
          query={this.state.query} 
          id={this.state.point_id}
          onClose={this.closeArticles}
      />
    );
  }

  handlePointClick(point) {
    console.log(point);
    const date = point['data']['xFormatted']  // 2021-01-06
    const query = point['serieId']
    const point_id = point['id']

    this.setState({
      viewArticles: true,
      date: date,
      query: query,
      point_id: point_id
    })

  }

  closeArticles() {
    console.log("closing articles view");
    this.setState({
      viewArticles: false,
   })
  }
 
    render() {

        const selectedTopics = this.props.selected;
        const info = this.props.info;

        const data = formatData(selectedTopics, info);

        if (selectedTopics.length) {
        return(
          <div>
            <div className='graph-header'>
              <Divider orientation="left"><h4>Sentiment Trends &nbsp;&nbsp;
                  <InfoCircleTwoTone onClick={() => this.setState({showTip: !this.state.showTip})}/> 
                  </h4>
              </Divider>
              {this.state.showTip && 
               <Alert 
                className='slim-container'
                  message="Click on different points on the graph to see NYT 
                          headlines relavent to the topic on that date" 
                  type="info" 
                  showIcon
                  closable
                  onClose={() => this.setState({showTip: false})} />
              }
              
            </div>

            <div className='graph-article-container'>

      <div className={this.state.viewArticles ? 'graph' : 'graphCenter'}>
        <ResponsiveLine
        curve={"monotoneX"}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%m/%d/%Y"
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Average Sentiment",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        axisBottom={{
          orient: 'bottom',
          format: "%b %d",
          legend: "Date",
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        onClick={(point) => this.handlePointClick(point)}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        markers={[
            {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: '#b0413e', strokeWidth: 1 },
                legend: '',
                legendOrientation: 'vertical',
            },
        ]}
      />
      </div>

             {this.state.viewArticles && this.renderArticlesList()}
            </div>
            </div>
        );
    } else {
        if (this.state.viewArticles !== false) {this.setState({viewArticles: false})}
        return(
          <div className="noGraph"></div>
        );
    }
    }
}

export default Graph;