import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction
} from "bizcharts"

const BarChart = ({data}) => {
  return (
    <Chart
      height={400}
      data={data}
      autoFit
      padding={[40, 0, 20, 60]}
      scale={{
        population: {
          formatter: (v) => v
        }
      }}
    >
      <Coordinate transpose />
      <Interval 
        position="country*population"
        label={[
          "population",
          ()=>({
            position: "middle",
            style: {
              fill: "#fff"
            }
          })
        ]}
      />
      <Interaction type="active-region" />
    </Chart>
  )
}

export default BarChart
