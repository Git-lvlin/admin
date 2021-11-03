import React, { useState } from 'react'
import { Card, Tabs, Space } from 'antd'

import styles from './style.less'
import ChartForm from './chart-form'

const { TabPane } = Tabs

const IndicatorsCard = ({
  data
}) => {

  const TitleSolt = {
    left: <h2>核心指标</h2>
  }

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
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={TitleSolt}
        size="small"
        destroyInactiveTabPane
        tabBarStyle={{
          background: "#fff",
          border: "none"
        }}
      >
        <TabPane tab="本周" key="1">
          <ChartForm
            scale={scale}
            data={data}
          />
        </TabPane>
        <TabPane tab="上周" key="2">
          <ChartForm
             scale={scale}
             data={data}
          />
        </TabPane>
        <TabPane tab="本月" key="3">
          <ChartForm
            scale={scale}
            data={data}
          />
        </TabPane>
        <TabPane tab="上月" key="4">
          <ChartForm
            scale={scale}
            data={data}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default IndicatorsCard 