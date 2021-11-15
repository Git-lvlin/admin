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
      padding={[40, 0, 20, 120]}
      scale={{
        ct: {
          formatter: (v) => v
        }
      }}
    >
      <Coordinate transpose />
      <Interval 
        position="companyName*ct"
        label={[
          "ct",
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
