import React, { useState, useEffect } from 'react'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { Space, Button, Typography } from 'antd'
import moment from 'moment'

import styles from './styles.less'
import Yuan from '../components/Yuan'
import { supplierDataOverview } from '@/services/data-board/supplier-data'

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
    <h3 className={styles.title}>供应商数据总览</h3>
    <ProFormDateRangePicker 
      label="时间范围"
      name="time"
      initialValue={times}
    />
  </ProForm>
)

const SupplierDataOverview = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const startTimes = moment('20200101').format('YYYY-MM-DD')
  const [times, setTimes] = useState([startTimes, dateNow])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    supplierDataOverview({
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
          <Text>未审核的供应商数量</Text>
          <Title level={3}>
            <Yuan>{data?.notApprovedNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>已审核未开户的供应商</Text>
          <Title level={3}>
            <Yuan>{data?.approvedNotAccountNum}</Yuan>
          </Title>
        </ProCard>
        <ProCard bordered loading={loading}>
          <Text>已审核已开户的供应商</Text>
          <Title level={3}>
            <Yuan>{data?.approvedOpenAccountNum}</Yuan>
          </Title>
        </ProCard>
      </ProCard>
    </div>
  )
}

export default SupplierDataOverview
