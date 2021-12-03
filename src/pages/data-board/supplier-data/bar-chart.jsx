import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction
} from "bizcharts"
import { Empty } from 'antd'

import { amountTransform } from '@/utils/utils'

const BarChart = ({data}) => {
  data?.sort((a, b)=> a.amount - b.amount)
  return (
    data?.[0]?
    <Chart
      height={400}
      data={data}
      autoFit
      scale={{
        amount: {
          formatter: (v) => amountTransform(v, '/')
        }
      }}
    >
      <Coordinate transpose />
      <Interval 
        position="supplierName*amount"
        label={[
          "amount",
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
