import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import moment from 'moment'

import styles from './style.less'
import ChartForm from './chart-form'
import { coreData } from '@/services/data-board/summary-of-data'
import { getTimeDistance } from '@/utils/utils'

const IndicatorsCard = () => {
  const [lineData, setLineData] = useState([])
  const [loading, setLoading] = useState(false)
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('week'))

  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type))
  }

  const isActive = (type) => {
    if (!rangePickerValue) {
      return ''
    }

    const value = getTimeDistance(type);

    if (!value) {
      return ''
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return ''
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate
    }

    return ''
  }

  useEffect(()=> {
    setLoading(true)
    coreData({
      startTime: moment(rangePickerValue[0]).format("YYYY-MM-DD"),
      endTime: moment(rangePickerValue[1]).format("YYYY-MM-DD")
    }).then(res => {
      setLineData(res.data)
    }).finally(()=> {
      setLoading(false)
    })
    return () => {
      setLineData({})
    }
  }, [rangePickerValue])

  const TitleSolt = {
    left: 
      <div className={styles.coreData}>
        <h2>核心指标</h2>
        <div className={styles.salesExtra}>
          <a className={isActive('week')} onClick={() => selectDate('week')}>
            本周
          </a>
          <a className={isActive('last-week')} onClick={() => selectDate('last-week')}>
            上周
          </a>
          <a className={isActive('month')} onClick={() => selectDate('month')}>
            本月
          </a>
          <a className={isActive('last-month')} onClick={() => selectDate('last-month')}>
            上月
          </a>
        </div>
      </div>
  }

  const scale = {
    value: { min: 0 },
    reportName: {
      formatter: v => {
        return {
          访问次数: '访问次数',
          新增订单数: '新增订单数',
          支付金额: '支付金额',
          下单支付用户数: '下单支付用户数',
          新增用户数: '新增用户数',
          访问用户数: '访问用户数'
        }[v]
      }
    }
  }

  return (
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={TitleSolt}
        size="small"
        destroyInactiveTabPane
        tabBarStyle={{
          background: "#fff",
          border: "none"
        }}
      />
      <ChartForm
        scale={scale}
        data={lineData}
        loading={loading}
      />
    </div>
  )
}

export default IndicatorsCard 