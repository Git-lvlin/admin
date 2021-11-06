import React, { useState, useEffect } from 'react'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'
import ProCard, { CheckCard } from '@ant-design/pro-card'
import { Empty, Space, Typography } from 'antd'
import { useRequest } from 'umi'

import Yuan from '../components/Yuan'
import { briefCount, briefCountDetail } from '@/services/data-board/summary-of-data'
import { amountTransform } from '@/utils/utils'

const { Paragraph, Title, Text } = Typography

const RealTime = () => {
  const [title, setTitle] = useState("支付金额")
  const [lineData, setLineData] = useState({})
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("payAmount")
  const { data } = useRequest(briefCount)
 
  useEffect(() => {
    setLoading(true)
    briefCountDetail({code}).then(res=> {
      const arr = res.data.map(item=> {
        if(item) {
          return {timeName: item?.timeName, countTime: item?.countTime, value: Number(item?.value)}
        } else {
          return false
        }
      })
      setLineData(arr)
    }).finally(()=> {
      setLoading(false)
    })
    return ()=> {
      setLineData({})
    }
  }, [code])

  const scale = {
    value: { min: 0 },
    timeName: {
      formatter: v => {
        return {
          昨日: '昨日',
          今日: '今日'
        }[v]
      }
    }
  }
  return (
    <ProCard
      title="今日实时"
      headerBordered
    >
      <ProCard colSpan="50%">
        <ProCard 
          title={title}
          style={{ height: 500 }}
          loading={loading}
        >
          {
            (lineData&&lineData?.[0]) ? 
            <Chart
              scale={scale}
              autoFit
              height={440}
              data={lineData}
              interactions={['element-active']}
              forceUpdate
              padding={[80, 40, 60, 60]}
            >
              <Point
                position="countTime*value"
                color="timeName"
                shape='circle' 
              />
              <Line 
                shape="line"
                position="countTime*value"
                color="timeName"
                label="value"
              />
              <Tooltip
                shared
                showCrosshairs
              />
              <Legend
                position="top"
                background={{
                  style: {
                    fill: '#fff',
                    stroke: '#fff'
                  }
                }}
                itemName={{
                  style: {
                    fontSize: 16
                  }
                }}
              />
            </Chart>:
            <Empty />
          }
        </ProCard>
      </ProCard>
      <CheckCard.Group
        onChange={(value) => {
          switch(value) {
            case 'payAmount':
              setCode(value)
              return setTitle('支付金额')
            case 'orderCode':
              setCode(value)
              return setTitle('支付订单数')
            case 'orderMember':
              setCode(value)
              return setTitle('下单用户数')
            case 'accessCount':
              setCode(value)
              return setTitle('访问用户数')
            case 'registerMember':
              setCode(value)
              return setTitle('新增用户数')
            case 'registerStore':
              setCode(value)
              return setTitle('新增店主数')
            default :
              setCode(value)
              return setTitle('')
          }
        }}
        defaultValue="payAmount"
      >
        <ProCard 
          gutter={[36, 36]}
          wrap
        >
          <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>支付金额</Text>
                    <Title level={3}>
                      ￥<Yuan>{amountTransform(data?.payAmount?.today, '/')}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <span>
                      ￥<Yuan>{amountTransform(data?.payAmount?.yestoday, '/')}</Yuan>
                    </span>
                  </Space>
                </Paragraph>
              </>
            }
            value={data?.payAmount?.code}
          />
          <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>支付订单数</Text>
                    <Title level={3}>
                      <Yuan>{data?.orderCount?.today}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{data?.orderCount?.yestoday}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value={ data?.orderCount?.code }
          />
          <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>下单用户数</Text>
                    <Title level={3}>
                      <Yuan>{data?.orderMember?.today}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{data?.orderMember?.yestoday}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value={data?.orderMember?.code}
          />
         <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>访问用户数</Text>
                    <Title level={3}>
                      <Yuan>{data?.accessCount?.today}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{data?.accessCount?.yestoday}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value={data?.accessCount?.code}
          />
          <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>新增用户数</Text>
                    <Title level={3}>
                      <Yuan>{data?.registerMember?.today}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{data?.registerMember?.yestoday}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value={data?.registerMember?.code}
          />
          <CheckCard 
            style={{ width: "36%", height: 150 }}
            bordered
            description={
              <>
                <Paragraph>
                  <Space size={20}>
                    <Text>新增店主数</Text>
                    <Title level={3}>
                      <Yuan>{data?.registerStore?.today}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{data?.registerStore?.yestoday}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value={data?.registerStore?.code}
          />
        </ProCard>
      </CheckCard.Group>
    </ProCard>
  )
}

export default RealTime
