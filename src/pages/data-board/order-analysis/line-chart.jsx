import React from 'react'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'

const LineChart = ({
  data,
  scale
}) => {
  return (
    <Chart
      scale={scale}
      padding={[30, 20, 60, 40]}
      autoFit
      height={440}
      data={data}
      interactions={['element-active']}
      forceUpdate
    >
      <Point
        position="month*temperature"
        color="city"
        shape='circle' 
      />
      <Line 
        shape="line"
        position="month*temperature"
        color="city"
        label="temperature"
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
    </Chart>
  )
}

export default LineChart
