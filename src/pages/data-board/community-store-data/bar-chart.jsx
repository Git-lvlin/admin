import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction
} from "bizcharts"

const BarChart = ({data}) => {

  data.sort((a, b) => a.value - b.value)
  return (
    <Chart
      height={400}
      data={data}
      autoFit
      padding={[40, 0, 20, 100]}
      scale={{
        value: {
          formatter: (v) => v
        }
      }}
    >
      <Coordinate transpose />
      <Interval 
        position="storeName*value"
        label={[
          "value",
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