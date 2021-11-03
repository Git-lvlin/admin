import React from 'react'
import {
  Legend,
  Chart,
  Tooltip,
  Interval,
} from "bizcharts";

const Histogram = ({
  data
}) => {
  return (
    <Chart
      height={400}
      padding="auto"
      data={data}
      autoFit
    >
      <Interval
        adjust={[
         {
            type: 'dodge',
            marginRatio: 0,
          },
        ]}
        color="name"
        position="月份*月均降雨量"
        label= {[
          '月均降雨量',
          () => {
            return {
              position: "middle",
              style: {
                fill: '#fff',
                fontSize: 16
              }
            }
          }
        ]}
      />
      <Tooltip shared />
      <Legend
        layout="horizontal"
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

export default Histogram
