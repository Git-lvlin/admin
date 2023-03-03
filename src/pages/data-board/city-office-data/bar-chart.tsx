import {
	Chart,
	Coordinate,
	Interval,
  Interaction,
  Axis,
  Tooltip
} from "bizcharts"
import { Empty } from 'antd'

import type { DataProps } from './data'
import type { FC } from "react"

const BarChart: FC<DataProps> = ({data, type}) => {

  const arr = data.map(res=> ({
    userCityName: res.userCityName,
    valueData: Number(res.valueData)
  }))

  arr.sort((a: any, b: any) => a.valueData - b.valueData)

  const scale = {
    valueData: { 
      tickInterval: ' '
    }
  }

  return (
    arr?.[0]?
    <Chart
      height={400}
      data={arr}
      autoFit
      scale={scale}
    >
      <Axis 
        name='userCityName'
      />
      <Coordinate transpose />
      <Interval 
        position="userCityName*valueData"
        label={[
          "valueData",
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
          return (
            <div style={{padding: '10px 0'}}>
              <div style={{marginBottom: '15px'}}>{title}</div>
              <div>{type}：{items?.[0].value}</div>
            </div>
          )
        }}
      </Tooltip>
    </Chart>:
    <Empty/>
  )
}

export default BarChart
