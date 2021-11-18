import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Space, Typography, Tooltip as Tp, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import styles from './style.less'
import Yuan from '../components/Yuan'
import { amountTransform } from '@/utils/utils'
import { sumData } from '@/services/data-board/summary-of-data'

const { Title, Text } = Typography

const DataOverview = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    sumData({}).then(res=>{
      setData(res.data)
    })
    return () => {
      setData(null)
    }
  }, [])
  
  return (
    <div className={styles.dataOverview}>
       <ProCard
        title={
          <Space size={15}>
            <h2>数据总览</h2>
            <span className={styles.txt}>截止到目前，平台总数据（实时）</span>
          </Space>
        }
        gutter={[36, 36]}
        headerBordered
      >
        <ProCard bordered>
          <Text>累计注册用户</Text>
          <Title level={3}>
            {data?.sumMemberCount}
          </Title>
        </ProCard>
        <ProCard bordered>
          <Text>累计供应商数量</Text>
          <Title level={3}>
            {data?.sumSupperCount}
          </Title>
        </ProCard>
        <ProCard bordered>
          <Text>累计运营中心数量</Text>
          <Title level={3}>
            {data?.sumOperationCount}
          </Title>
        </ProCard>
        <ProCard bordered>
          <Text>累计社区店数量</Text>
          <Title level={3}>
            {data?.sumStoreCount}
          </Title>
        </ProCard>
        <ProCard bordered style={{position: 'relative'}}>
          <Text>累计总交易额</Text>
          <Title level={3}>
            ￥<Yuan>{amountTransform(Number(data?.sumPayAmount), '/')}</Yuan>
          </Title>
          <div className={styles.checkCard}>
            <Tp title='所有已支付的订单，不分订单类型'>
              <QuestionCircleOutlined />
            </Tp>
          </div>
        </ProCard>
      </ProCard>
    </div>
  )
}

export default DataOverview
