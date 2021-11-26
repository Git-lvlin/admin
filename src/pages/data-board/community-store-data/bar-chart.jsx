import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction
} from "bizcharts"
import { Empty } from 'antd'

const BarChart = ({data}) => {

  data.sort((a, b) => a.value - b.value)
  return (
    data?.[0]?
    <Chart
      height={400}
      data={data}
      autoFit
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
    </Chart>:
    <Empty/>
  )
}

export default BarChart
