import React from 'react'
import {
	Chart,
	Interval,
	Tooltip,
	Coordinate,
	getTheme,
  Legend
} from "bizcharts"

import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const PieChart = ({data, dataType}) => {
 
  const colors = data?.reduce((pre, cur, idx) => {
    pre[cur.reportName] = getTheme().colors10[idx]
    return pre
  }, {})

  const cols = {
    value: {
      formatter: (val) => {
        val = amountTransform(Number(val).toFixed(2), '*') + "%"
        return val
      }
    }
  }

  const filterPie = (v) => {
    return v !== 0
  }

  return (
    <>
      <h3 className={styles.pieTitle}>各类订单的{dataType}占比</h3>
      <Chart
        placeholder={false} 
        height={500} 
        padding={50}
        autoFit
        data={data}
        scale={cols}
        interactions={['element-active']}
        filter={{value: (v)=> filterPie(v)}}
      >
        <Coordinate type="theta" innerRadius={0.75} />
        <Interval
          position="value"
          adjust="stack"
          color="reportName"
          label={['reportName', {offset: 40}]}
        />
        <Legend position="right-top"/>
      </Chart>
    </>
  )
}

export default PieChart
