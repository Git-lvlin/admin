import React from 'react'
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	getTheme,
  Legend
} from "bizcharts"
import { Radio } from 'antd'

import styles from './styles.less'
import { amountTransform } from '@/utils/utils'
import { Empty } from 'antd'

const PieChart = ({
  data,
  payRate,
  value,
  onChange
}) => {

  if(payRate !== 0) {
    data = data?.map(item=> ({payRate: Number(item.payCount) / payRate, ...item}))
  } else {
    data = data?.map(item=> ({payRate: 0, ...item}))
  }
 
  const colors = data?.reduce((pre, cur, idx) => {
    pre[cur.item] = getTheme().colors10[idx]
    return pre
  }, {})

  const cols = {
    payRate: {
      formatter: (val) => {
        val = Math.round(amountTransform(Number(val), '*')) + "%"
        return val
      }
    }
  }

  return (
    <>
      <h3 className={styles.pieTitle}>商品分类占比</h3>
      <Radio.Group 
        onChange={(e)=>onChange(e)}
        value={value}
        size="large"
      >
        <Radio value={1}>订单数</Radio>
        <Radio value={2}>成交额</Radio>
      </Radio.Group>
      {
        data?.[0]?
        <Chart 
          height={400}
          data={data}
          scale={cols}
          interactions={['element-active']}
          autoFit
        >
          <Coordinate type="theta" radius={0.75} />
          <Tooltip showTitle={false} />
          <Axis visible={false} />
          <Interval
            position="payRate"
            adjust="stack"
            color="gcName"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
            label={[
              "gcName",
              (item) => {
                return {
                  offset: 20,
                  content: (data) => {
                    return `${data.gcName}\n ${Math.round(amountTransform(Number(data.payRate), '*'))}%`
                  },
                  style: {
                    fill: colors[item]
                  }
                }
              }
            ]}
          />
          <Legend
            layout="horizontal"
            padding={[60, 0, 0, 0]}
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

export default PieChart
