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

import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const PieChart = ({data}) => {

  const colors = data?.reduce((pre, cur, idx) => {
    pre[cur.item] = getTheme().colors10[idx]
    return pre
  }, {})

  const cols = {
    payRate: {
      formatter: (val) => {
        val = amountTransform(val, '*') + "%"
        return val
      }
    }
  }

  return (
    <>
      <h3 className={styles.pieTitle}>商品分类支付占比</h3>
      <Chart 
        height={600}
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
                  return `${data.gcName}\n ${amountTransform(data.payRate, '*')}%`
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
      </Chart>
    </>
  )
}

export default PieChart
