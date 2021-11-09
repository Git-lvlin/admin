import React, { useEffect, useState } from 'react'
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
import { Empty } from 'antd'

const PieChart = ({data}) => {
  const [paymentRatio, setPaymentRatio] = useState(0)
  const [pieData, setPieData] = useState([])

  useEffect(() => {
    setPaymentRatio(data?.reduce((acc, curr) => (
      acc + Number(curr.payCount)
    ), 0))
    let rateNum = 0
    const arr = data?.map(item => {
      if(paymentRatio !== 0) {
        rateNum = item.payCount/paymentRatio
      } else {
        rateNum = 0
      }
      return {gcName: item.gcName, payCount: item.payCount, payRate: rateNum}
    })
    setPieData(arr)
    return () => {
      setPieData([])
    }
  }, [data])

  const colors = pieData?.reduce((pre, cur, idx) => {
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
      {
        !!pieData?.[0]?
        <Chart 
          height={600}
          data={pieData}
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
                    return `${data.gcName}\n ${data.payRate}%`
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
