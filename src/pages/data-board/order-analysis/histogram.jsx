import React from 'react'
import {
  Legend,
  Chart,
  Tooltip,
  Interval,
  Slider
} from "bizcharts"
import { Empty } from 'antd'

const Histogram = ({data}) => {
  return (
    <>
      {
        data?.[0]?
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
            color="reportName"
            position="cityName*value"
            label= {[
              'value',
              () => {
                return {
                  position: "middle",
                  style: {
                    fill: '#fff',
                    fontSize: 12
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
        </Chart>:
        <Empty/>
      }
    </>
  )
}

export default Histogram
