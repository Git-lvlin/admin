import React, { useState, useEffect } from 'react'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import { Space, Radio, Button } from 'antd'
import moment from 'moment'

import Histogram from './histogram'
import styles from './styles.less'
import { areaOrderAnalysis } from '@/services/data-board/order-analysis'

const now = new Date()
const oneDay = 1000 * 60 * 60 * 24
const theMonth = () => {
  let day = now.getDay()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)

  if (day === 0) {
    day = 6
  } else {
    day -= 1
  }

  const beginTime = now.getTime() - day * oneDay
  return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
}

const RegionalOrderAnalysis = () => {
  const [histogramValue, setHistogramValue] = useState(1)
  const [data, setData] = useState([])
  const [times, setTimes] = useState(theMonth().map(item=> moment(item).format("YYYY-MM-DD")))

  useEffect(()=> {
    areaOrderAnalysis({
      startTime: times?.[0], 
      endTime: times?.[1], 
      type: histogramValue
    }).then(res => {
      if(res.success) {
        const arr = res.data.map(item=> {
          if(item) {
            return {reportName: item?.reportName, cityName: item?.cityName, value: Number(item?.value)}
          } else {
            return false
          }
        })
        setData(arr)
      }
    })
    return () => {
      setData([])
    }
  }, [histogramValue, times])

  const histogramChange = e => {
    setHistogramValue(e.target.value)
  }

  return (
    <>
      <ProForm
        style={{ 
          backgroundColor: '#fff', 
          padding: 10,
        }}
        submitter={{
          render: ({ form }) => {
            return (
              <div>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form?.submit()
                    }}
                  >
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      form?.resetFields()
                      form?.submit()
                    }}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            )
          }
        }}
        layout="inline"
        onFinish={(value) => {
          setTimes(value?.time)
        }}
      >
        <h3 className={styles.title}>地区订单分析</h3>
        <ProFormDateRangePicker 
          label="统计时间范围"
          name="time"
          initialValue={times}
        />
      </ProForm>
      <div className={styles.radioArea}>
        <Radio.Group 
          onChange={histogramChange}
          value={histogramValue}
          size="large"
        >
          <Radio value={1}>订单数</Radio>
          <Radio value={2}>交易额</Radio>
        </Radio.Group>
        <Histogram data={data}/>
      </div>
    </>
  )
}

export default RegionalOrderAnalysis
