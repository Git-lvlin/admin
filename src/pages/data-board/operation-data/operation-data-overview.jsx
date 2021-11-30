import React, { useState, useEffect } from 'react'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { Space, Button, Typography } from 'antd'
import moment from 'moment'

import styles from './styles.less'
import Yuan from '../components/Yuan'
import { operationDataTotalView } from '@/services/data-board/operation-data'

const { Text, Title } = Typography

const CardTitle = ({times, setTimes}) => (
  <ProForm
    style={{ 
      backgroundColor: '#fff', 
      padding: 10,
    }}
    submitter={{
      render: ({ form }) => {
        return (
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
        )
      }
    }}
    layout="inline"
    onFinish={(value) => {
      setTimes(value?.time)
    }}
  >
    <h3 className={styles.title}>运营中心数据总览</h3>
    <ProFormDateRangePicker 
      label="时间范围"
      name="time"
      initialValue={times}
    />
  </ProForm>
)

const CommunityStoreDataOverview = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const startTimes = moment('20200101').format('YYYY-MM-DD')
  const [times, setTimes] = useState([startTimes, dateNow])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    operationDataTotalView({
      startTime: times?.[0],
      endTime: times?.[1]
    }).then(res=> {
      setData(res.data?.[0])
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setData(null)
    }
  }, [times])

  return (
    <div className={styles.community}>
      
      <div className={styles.dataOverview}>
        <ProCard
          gutter={[36, 36]}
          headerBordered
          title={<CardTitle times={times} setTimes={setTimes}/>}
        >
          <ProCard bordered loading={loading}>
            <Text>已创建的运营中心总数</Text>
            <Title level={3}>
              <Yuan>{data?.totals}</Yuan>
            </Title>
          </ProCard>
          <ProCard bordered loading={loading}>
            <Text>已开户的运营中心数量</Text>
            <Title level={3}>
              <Yuan>{data?.openAccount}</Yuan>
            </Title>
          </ProCard>
          <ProCard bordered loading={loading}>
            <Text>未开户的运营中心数量</Text>
            <Title level={3}>
              <Yuan>{data?.notAccount}</Yuan>
            </Title>
          </ProCard>
        </ProCard>
      </div>
    </div>
  )
}

export default CommunityStoreDataOverview
