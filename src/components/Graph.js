import React from "react";
import '../stylesheets/App.css';

import { ResponsiveLine } from '@nivo/line';

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
 
    render() {

        const selectedTopics = this.props.selected;
        const info = this.props.info;

        const test = formatData(selectedTopics, info);
        console.log("TEST DATA HERE ============ ", test);

        if (selectedTopics.length) {
        return(
            <div className='graph'>
      <ResponsiveLine
        data={test}
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
          format: "%b %d",
          //tickValues: "every 2 days",
          // tickRotation: -90,
          legend: "time scale",
          legendOffset: -12
        }}
        colors={{ scheme: "nivo" }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
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
      />
            </div>
        );
    } else {
        return(<div className="noGraph"></div>);
    }
    }
}

export default Graph;