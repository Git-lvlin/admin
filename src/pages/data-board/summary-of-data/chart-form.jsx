import React, { useEffect, useState } from 'react'
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
  loading,
  code
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
      >
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessTimes}</Yuan>
            </div> 
          }
          description="访问次数"
          value="visitList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payOrder}</Yuan>
            </div>
          }
          description="新增订单数"
          value="payOrderList"
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
              <Yuan>{Number(data?.count?.payAmount)}</Yuan>
            </div> 
          }
          description="支付金额"
          value="payAmountList"
        />
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.payMember}</Yuan>
            </div> 
          }
          description="下单支付用户数"
          value="payMemberList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.regMember}</Yuan>
            </div> 
          }
          description="新增用户数"
          value="regMemberList"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>{data?.count?.accessMember}</Yuan>
            </div> 
          }
          description="访问用户数"
          value="visitMemberList"
        />
      </CheckCard.Group>
      {
        (lineData&&lineData?.length !== 0)?
        <Spin spinning={loading}>
          <Chart
            scale={scale}
            padding={[50, 20, 60, 80]}
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
