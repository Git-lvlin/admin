import React from 'react'
import { CheckCard } from '@ant-design/pro-card'
import { 
  Chart, 
  Line, 
  Point, 
  Tooltip, 
  Legend
} from 'bizcharts'

import Yuan from '../components/Yuan'
import styles from './style.less'

const ChartForm = ({
  scale,
  data
}) => {
  return (
    <>
      <CheckCard.Group
        onChange={(value) => {
          console.log('value', value)
        }}
        multiple
        defaultValue="A"
      >
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>12344</Yuan>
            </div> 
          }
          description="访问次数"
          value="A"
          size="small"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>1214</Yuan>
            </div>
          }
          description="新增订单数"
          value="B"
          size="small"
        />
        <CheckCard
          title={
            <div className={styles.title}>{"30%"}</div> 
          }
          description="访问-支付转化率"
          value="C"
          size="small"
          disabled
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>133344</Yuan>
            </div> 
          }
          description="支付金额"
          value="d"
          size="small"
        />
        <CheckCard
          title={ 
            <div className={styles.title}>
              <Yuan>77664</Yuan>
            </div> 
          }
          description="下单支付用户数"
          value="e"
          size="small"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>23344</Yuan>
            </div> 
          }
          description="新增用户数"
          value="f"
          size="small"
        />
        <CheckCard 
          title={ 
            <div className={styles.title}>
              <Yuan>6666</Yuan>
            </div> 
          }
          description="访问用户数"
          value="G"
          size="small"
        />
      </CheckCard.Group>
      <Chart
        scale={scale}
        padding={[80, 20, 60, 40]}
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
    </>
  )
}

export default ChartForm
