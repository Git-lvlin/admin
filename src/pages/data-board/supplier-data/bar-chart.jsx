import React from 'react'
import {
	Chart,
	Coordinate,
	Interval,
  Interaction,
  Axis
} from "bizcharts"
import { Empty } from 'antd'

import { amountTransform } from '@/utils/utils'

const BarChart = ({data, unit}) => {
  data?.sort((a, b)=> a.amount - b.amount)

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

  return (
    data?.[0]?
    <Chart
      height={400}
      data={data}
      autoFit
      scale={{
        amount: {
          formatter: (v) => amountTransform(v, '/')
        },
        supplierName: {
          alias: unit
        }
      }}
    >
      <Axis
        name='supplierName'
        title={chartUnit}
      />
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
