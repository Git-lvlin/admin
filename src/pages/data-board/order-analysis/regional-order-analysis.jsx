import React, { useState } from 'react'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import { Space, Radio, Button } from 'antd'

import Histogram from './histogram'
import styles from './styles.less'

const RegionalOrderAnalysis = () => {
  const [histogramValue, setHistogramValue] = useState(1)

  const histogramData = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ]

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
        onFinish={() => {
          setSearch(search + 1)
        }}
      >
        <h3 className={styles.title}>地区订单分析</h3>
        <ProFormDateRangePicker 
          label="统计时间范围"
          name="time"
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
        <Histogram 
          data={histogramData}
        />
      </div>
    </>
  )
}

export default RegionalOrderAnalysis
