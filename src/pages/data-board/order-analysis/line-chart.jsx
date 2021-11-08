import React from 'react'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend,
  Slider
} from 'bizcharts'
import { Empty } from 'antd'

const LineChart = ({
  data,
  scale
}) => {
  return (
    <>
      {
        data?.[0]?
        <Chart
          scale={scale}
          padding={[80, 40, 60, 80]}
          autoFit
          height={440}
          data={data}
          interactions={['element-active']}
          forceUpdate
        >
          <Point
            position="dateTime*value"
            color="reportName"
            shape='circle' 
          />
          <Line 
            shape="line"
            position="dateTime*value"
            color="reportName"
            label="value"
          />
          <Tooltip
            shared
            showCrosshairs
          />
          <Legend
            position="top-right"
            itemName={{
              style: {
                fontSize: 16
              }
            }}
          />
          <Slider />
        </Chart>:
        <Empty/>
      }
    </>
  )
}

export default LineChart
