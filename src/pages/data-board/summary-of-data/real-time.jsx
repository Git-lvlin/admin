import React, { useState } from 'react'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'
import ProCard, { CheckCard } from '@ant-design/pro-card'
import { Space, Typography } from 'antd'

import Yuan from '../components/Yuan'

const { Paragraph, Title, Text } = Typography

const RealTime = ({
  data,
  loading
}) => {
  const [title, setTitle] = useState("支付金额")

  const scale = {
    temperature: { min: 0 },
    city: {
      formatter: v => {
        return {
          Tokyo: '今日',
          London: '昨日',
          Test: '666'
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
        <ProCard title={title} style={{ height: 500 }}>
          <Chart
            scale={scale}
            autoFit
            height={440}
            data={data}
            interactions={['element-active']}
            forceUpdate
            padding={[80, 20, 60, 40]}
          >
            <Point
              position="month*temperature"
              color="city"
              shape='circle' 
            />
            <Line 
              shape="line"
              position="month*temperature"
              color="city"
              label="temperature"
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
          </Chart>
        </ProCard>
      </ProCard>
      <CheckCard.Group
        onChange={(value) => {
          setTitle(value)
        }}
        defaultValue="支付金额"
      >
        <ProCard 
          gutter={[36, 36]}
          wrap
          loading={loading}
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
                      ￥<Yuan>{1234}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <span>
                      ￥<Yuan>{2234}</Yuan>
                    </span>
                  </Space>
                </Paragraph>
              </>
            }
            value="支付金额"
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
                      <Yuan>2333</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{6666}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value="支付订单数"
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
                      <Yuan>{5555}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{24345}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value="下单用户数"
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
                      <Yuan>66677</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{7777}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value="访问用户数"
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
                      <Yuan>{9999}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{11111}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value="新增用户数"
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
                      <Yuan>{8999}</Yuan>
                    </Title>
                  </Space>
                </Paragraph>
                <Paragraph>
                  <Space size={20}>
                    <Text>昨日全天</Text>
                    <Yuan>{9827}</Yuan>
                  </Space>
                </Paragraph>
              </>
            }
            value="新增店主数"
          />
        </ProCard>
      </CheckCard.Group>
    </ProCard>
  )
}

export default RealTime
