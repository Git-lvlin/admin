import { useState, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import { Space, DatePicker  } from 'antd'
import moment from 'moment'

import type { FC } from 'react'
import type { Moment } from 'moment'
import type { CardTitleProps } from './data'

import styles from './styles.less'
import { cityAgencyStatData } from '@/services/data-board/city-office-data'

const { RangePicker } = DatePicker

const CardTitle: FC<CardTitleProps> = ({rangePickerValue, handleRangePickerChange}) => {

  return(
    <Space>
      <div>
        <h3 className={styles.title}>办事处业绩占比</h3>
      </div>
      <div>
        <span>时间范围：</span>
        <RangePicker 
          value={rangePickerValue}
          onChange={handleRangePickerChange}
          clearIcon={false}
        />
      </div>
    </Space>
  )
}

const ProportionOfficePerformance = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const startTimes = moment('20200101').format('YYYY-MM-DD')
  const [rangePickerValue, setRangePickerValue] = useState<Moment[]>([moment(startTimes), moment(dateNow)])

  const handleRangePickerChange = (value: Moment[]) => {
    
    setRangePickerValue(value)
  }

  return (
    <div className={styles.community}>
      <ProCard
        gutter={[36, 36]}
        headerBordered
        title={
          <CardTitle
            rangePickerValue={rangePickerValue}
            handleRangePickerChange={handleRangePickerChange}
          />
        }
      >
        <ProCard colSpan="50%">
          <div className={styles.performance}>
            <h3>各业务交易业绩占比</h3>
            222
          </div>
        </ProCard>
        <ProCard title="流量占用情况">
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
        </ProCard>
    </div>
  )
}

export default ProportionOfficePerformance
