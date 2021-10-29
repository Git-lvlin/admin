import React, { useState } from 'react'
import { Card, Tabs, Space } from 'antd'

import styles from './style.less'

const IndicatorsCard = ({
  loading,
  isActive,
  selectDate
}) => {

  return (
    <Card
      loading={loading}
      bordered={false}
      style={{
        marginTop: 30,
      }}
      title="核心指标"
      extra={
        <div>
          <Tabs
            tabBarExtraContent={
              <div>
                <Space size="large">
                  <a className={isActive('week')} onClick={() => selectDate('week')}>
                    本周
                  </a>
                  <a className={isActive('last-week')} onClick={() => selectDate('last-week')}>
                    上周
                  </a>
                  <a className={isActive('month')} onClick={() => selectDate('month')}>
                    本月
                  </a>
                  <a className={isActive('last-month')} onClick={() => selectDate('last-month')}>
                    上月
                  </a>
                </Space>
              </div>
            }
            size="large"
            tabBarStyle={{
              marginBottom: 24,
            }}
          >
            
          </Tabs>
        </div>
      }
    >
     
    </Card>
  )
}

export default IndicatorsCard 