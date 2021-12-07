import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction,
  Axis
} from "bizcharts"
import { Empty } from 'antd'

const BarChart = ({data, unit}) => {
  data.sort((a, b) => a.value - b.value)

  const chartUnit = {
    style: {
      fontSize: 14,
      textAlign: 'center',
      fill: '#E66101'
    },
    position: 'end',
    rotate: 0,
		offset: 80
  }

  const scale = {
    storeName: { 
      alias: unit
    }
  }

  return (
    data?.[0]?
    <Chart
      height={400}
      data={data}
      autoFit
      scale={scale}
    >
      <Axis
        name='storeName'
        title={chartUnit}
      />
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
