import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction,
  Axis,
  Tooltip
} from "bizcharts"
import { Empty } from 'antd'

const BarChart = ({data, unit, type}) => {
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
    value: { 
      alias: unit,
      tickInterval: ' '
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
        name='value'
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
      <Tooltip>
        {(title,items) => {
          const color = items[0].color;
          return (
            <div style={{padding: '10px 0'}}>
              <div style={{marginBottom: '15px'}}>{title}</div>
              <div>{type}：{items[0].value}</div>
            </div>
          )
        }}
      </Tooltip>
    </Chart>:
    <Empty/>
  )
}

export default BarChart
