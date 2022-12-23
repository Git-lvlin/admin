import { useState, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import { Space, DatePicker  } from 'antd'
import moment from 'moment'

import type { FC } from 'react'
import type { Moment } from 'moment'
import type { CardTitleProps } from './data'

import styles from './styles.less'
import { cityAgencyStatDataPoint } from '@/services/data-board/city-office-data'
import PieChart from './pie-chart'

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
  const [data, setData] = useState([])

  const handleRangePickerChange = (value: Moment[]) => {
    setRangePickerValue(value)
  }

  useEffect(()=> {
    cityAgencyStatDataPoint({
      startTime: rangePickerValue && rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: rangePickerValue && rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss')
    }).then(res => {
      setData(res.data)
    })
  }, [rangePickerValue])

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
            <PieChart data={data}/>
          </div>
        </ProCard>
        <ProCard title="流量占用情况">
          <div>右侧内容</div>
        </ProCard>
        </ProCard>
    </div>
  )
}

export default ProportionOfficePerformance
