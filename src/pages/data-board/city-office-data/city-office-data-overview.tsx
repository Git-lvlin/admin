import { useState, useEffect } from 'react'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { Typography } from 'antd'
import moment from 'moment'

import type { FC } from 'react'
import type { CardTitleProps } from './data'

import styles from './styles.less'
import Yuan from '../components/Yuan'
import { cityAgencyStatData } from '@/services/data-board/city-office-data'

const { Text, Title } = Typography

const CardTitle: FC<CardTitleProps> = ({times, setTimes}) => {

  return(
    <ProForm
      style={{ 
        backgroundColor: '#fff', 
        padding: 10,
      }}
      layout="inline"
      onFinish={async(value) => {
        setTimes(value?.time)
      }}
    >
      <h3 className={styles.title}>运营中心数据总览</h3>
      <ProFormDateRangePicker 
        label="时间范围"
        name="time"
        initialValue={times}
        allowClear={false}
      />
    </ProForm>
  )
}

const CityOfficeDataOverview = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const startTimes = moment('20200101').format('YYYY-MM-DD')
  const [times, setTimes] = useState([startTimes, dateNow])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    cityAgencyStatData({
      startTime: times?.[0],
      endTime: times?.[1]
    }).then(res=> {
      setData(res.data)
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setData(null)
    }
  }, [times])

  return (
    <div className={styles.community}>
      <ProCard
        gutter={[36, 36]}
        headerBordered
        title={<CardTitle times={times} setTimes={setTimes}/>}
      >
        <ProCard bordered loading={loading}>
          <Text>已创建的市办事处总数</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>已登录过的市办事处数量</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>未登录的市办事处数量</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易业绩金额</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易笔数</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>总交易业绩佣金</Text>
          <Title level={3}>
            <Yuan>{}</Yuan>
          </Title>
        </ProCard>
      </ProCard>
    </div>
  )
}

export default CityOfficeDataOverview
