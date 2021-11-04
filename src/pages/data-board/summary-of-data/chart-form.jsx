import React, { useState } from 'react'
import { CheckCard } from '@ant-design/pro-card'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'
import { Empty, Spin } from 'antd'

import Yuan from '../components/Yuan'
import styles from './style.less'

const ChartForm = ({
  scale,
  data, 
  loading
}) => {
  const [lineData, setLineData] = useState(()=>(
    data?.detail?.filter(item => (
      item.reportName === "访问次数"
    ))
  ))

  return (
    <>
      <CheckCard.Group
        onChange={(value) => {
          const arr = value.map(v=>(
            data.detail.filter(item => (
              item.reportName === v
            ))
          ))
          setLineData(arr.flat())
        }}
        multiple
        // defaultValue="访问次数"
        loading={loading}
        size="small"
      >
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessTimes}</Yuan>
            </div> 
          }
          description="访问次数"
          value="访问次数"
          defaultChecked
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payOrder}</Yuan>
            </div>
          }
          description="新增订单数"
          value="新增订单数"
        />
        <CheckCard
          title={
            <div className={styles.title}>{data?.count?.conversionRate}</div> 
          }
          description="访问-支付转化率"
          value="conversionRate"
          disabled
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payAmount}</Yuan>
            </div> 
          }
          description="支付金额"
          value="支付金额"
        />
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payMember}</Yuan>
            </div> 
          }
          description="下单支付用户数"
          value="下单支付用户数"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.regMember}</Yuan>
            </div> 
          }
          description="新增用户数"
          value="新增用户数"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessMember}</Yuan>
            </div> 
          }
          description="访问用户数"
          value="访问用户数"
        />
      </CheckCard.Group>
      {
        (lineData&&lineData?.length !== 0)?
        <Spin spinning={loading}>
          <Chart
            scale={scale}
            padding={[80, 20, 60, 60]}
            autoFit
            height={440}
            data={lineData}
            interactions={['element-active']}
            forceUpdate
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
        </Spin>:
        <Empty/>
      }
    </>
  )
}

export default ChartForm
