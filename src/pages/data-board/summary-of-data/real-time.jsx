import React from 'react'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'
import ProCard from '@ant-design/pro-card'
import { Space, Typography } from 'antd'

import Yuan from '../components/Yuan'

const { Paragraph, Title, Text } = Typography

const RealTime = ({
  title,
  scale,
  data,
  getData
}) =>{
  return (
    <ProCard
      title="今日实时"
      headerBordered
    >
      <ProCard colSpan="50%">
        <ProCard title={title} style={{ height: 500 }}>
          <Chart
            scale={scale}
            padding={[30, 20, 60, 40]}
            autoFit
            height={440}
            data={data}
            interactions={['element-active']}
            forceUpdate
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
            <Tooltip shared showCrosshairs />
            <Legend background={{
              padding:[5,100,5,36],
              style: {
                fill: '#fff',
                stroke: '#fff'
              }
            }} />
          </Chart>
        </ProCard>
      </ProCard>
      <ProCard title={false}>
        <div style={{ height: 500 }}>
          <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap>
            <ProCard 
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              bordered
              onClick={()=> getData("支付金额")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>支付金额</Text>
                  <Title level={3}>{'￥999'}</Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'￥111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
            <ProCard 
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} 
              bordered
              onClick={()=> getData("支付订单数")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>支付订单数</Text>
                  <Title level={3}>{'999'}</Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
            <ProCard 
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              bordered
              onClick={()=> getData("下单用户数")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>下单用户数</Text>
                  <Title level={3}>{'999'}</Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
            <ProCard 
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              bordered
              onClick={()=> getData("访问用户数")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>访问用户数</Text>
                  <Title level={3}>{'999'}</Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
            <ProCard
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              bordered
              onClick={()=> getData("新增用户数")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>新增用户数</Text>
                  <Title level={3}>{'999'}</Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
            <ProCard
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              bordered
              onClick={()=> getData("新增店主数")}
            >
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>新增店主数</Text>
                  <Title level={3}>
                    <Yuan>{1222}</Yuan>
                  </Title>
                </Space>
              </Paragraph>
              <Paragraph style={{textAlign: "center"}}>
                <Space size={20}>
                  <Text>昨日全天</Text>
                  <Text>{'111'}</Text>
                </Space>
              </Paragraph>
            </ProCard>
          </ProCard>
        </div>
      </ProCard>
    </ProCard>
  )
}

export default RealTime
