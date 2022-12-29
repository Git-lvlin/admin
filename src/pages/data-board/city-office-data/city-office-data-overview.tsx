import { useState, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import { Typography, Space, DatePicker  } from 'antd'
import moment from 'moment'

import type { FC } from 'react'
import type { Moment } from 'moment'
import type { CardTitleProps, DataOverviewProps } from './data'

import styles from './styles.less'
import Yuan from '../components/Yuan'
import { cityAgencyStatData } from '@/services/data-board/city-office-data'

const { Text, Title } = Typography
const { RangePicker } = DatePicker

const CardTitle: FC<CardTitleProps> = ({rangePickerValue, handleRangePickerChange}) => {

  return(
    <Space>
      <div>
        <h3 className={styles.title}>市办事处数据总览</h3>
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

const CityOfficeDataOverview = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const startTimes = moment('20200101').format('YYYY-MM-DD')
  const [rangePickerValue, setRangePickerValue] = useState<Moment[]>([moment(startTimes), moment(dateNow)])
  const [data, setData] = useState<DataOverviewProps>()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    cityAgencyStatData({
      startTime: rangePickerValue?.[0].format('YYYY-MM-DD'),
      endTime: rangePickerValue?.[1].format('YYYY-MM-DD')
    }).then(res=> {
      setData(res.data)
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setData({})
    }
  }, [rangePickerValue])

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
        <ProCard bordered loading={loading}>
          <Text>已创建的市办事处总数</Text>
          <Title level={3}>
            <Yuan>{data?.accountNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>已登录过的市办事处数量</Text>
          <Title level={3}>
            <Yuan>{data?.accountLoginNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>未登录的市办事处数量</Text>
          <Title level={3}>
            <Yuan>{data?.accountUnloginNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易业绩金额</Text>
          <Title level={3}>
            <Yuan>{data?.totalAmount}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易笔数</Text>
          <Title level={3}>
            <Yuan>{data?.orderNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易业绩佣金</Text>
          <Title level={3}>
            <Yuan>{data?.totalCommission}</Yuan>
          </Title>
        </ProCard>
      </ProCard>
    </div>
  )
}

export default CityOfficeDataOverview
