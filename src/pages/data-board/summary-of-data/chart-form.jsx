import React, { useEffect, useState } from 'react'
import { CheckCard } from '@ant-design/pro-card'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'
import { Empty, Spin, Tooltip as Tp, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import Yuan from '../components/Yuan'
import styles from './style.less'

const ChartForm = ({
  scale,
  data, 
  loading,
  code,
  value
}) => {
  const [lineData, setLineData] = useState([])

  useEffect(()=> {
    const arr = data?.detail?.map(item=> {
      if(item) {
        return {reportName: item?.reportName, countTime: item?.countTime, value: Number(item?.value)}
      } else {
        return false
      }
    })
    setLineData(arr)
    return ()=> {
      setLineData([])
    }
  }, [data])

  const setVal = (value) => {
    code(value)
  }

  return (
    <>
      <CheckCard.Group
        onChange={(value) => setVal(value)}
        multiple
        loading={loading}
        size="small"
        value={value}
      >
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessTimes}</Yuan>
            </div> 
          }
          description={
            <Space>
              <span>访客数</span>
              <Tp title="每人每天只算1次">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="visitList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payOrder}</Yuan>
            </div>
          }
          description={
            <Space>
              <span>访问次数</span>
              <Tp title="用户每次访问都计算在内">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="payOrderList"
        />
        <CheckCard
          title={
            <div className={styles.title}>{data?.count?.conversionRate}</div> 
          }
          description={
            <Space>
              <span>新增用户数</span>
              <Tp title="新增注册成功的用户数">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="conversionRate"
          disabled
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{Number(data?.count?.payAmount)}</Yuan>
            </div> 
          }
          description={
            <Space>
              <span>新增订单数</span>
              <Tp title="新增加的支付订单">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="payAmountList"
        />
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payMember}</Yuan>
            </div> 
          }
          description={
            <Space>
              <span>下单支付用户数</span>
              <Tp title="所有支付成功的下单总人数">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="payMemberList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.regMember}</Yuan>
            </div> 
          }
          description={
            <Space>
              <span>支付金额</span>
              <Tp title="所有已支付的订单总金额">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="regMemberList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessMember}</Yuan>
            </div> 
          }
          description={
            <Space>
              <span>支付转化率</span>
              <Tp title="已支付订单数/总订单数（不含售后订单）">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="visitMemberList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              xxx
            </div> 
          }
          description={
            <Space>
              <span>GMV交易额</span>
              <Tp title="包含拍下未支付订单金额">
                <QuestionCircleOutlined />
              </Tp>
            </Space>
          }
          value="visitMemberList"
        />
      </CheckCard.Group>
      {
        (lineData&&lineData?.length !== 0)?
        <Spin spinning={loading}>
          <Chart
            scale={scale}
            autoFit
            height={440}
            data={lineData}
            interactions={['element-active']}
          >
            <Point
              position="countTime*value"
              color="reportName"
              shape='circle' 
            />
            <Line 
              shape="line"
              position="countTime*value"
              color="reportName"
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
        </Spin>:
        <Empty/>
      }
    </>
  )
}

export default ChartForm
