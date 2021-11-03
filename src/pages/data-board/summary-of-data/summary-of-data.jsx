import React, { useState} from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import styles from './style.less'
import IndicatorsCard from './indicators-card'
import RealTime from './real-time'

const SummaryOfData = () => {
  
  const [loading, setLoading] = useState(false)

  const data = [
    {
      month: "Jan",
      city: "Tokyo",
      temperature: 7
    },
    {
      month: "Jan",
      city: "London", 
      temperature: 3.9
    },
    {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.9
    },
    {
      month: "Feb",
      city: "London",
      temperature: 4.2
    },
    {
      month: "Mar",
      city: "Tokyo",
      temperature: 10
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7
    },
  ]

  return (
    <PageContainer title={false}>
      <RealTime 
        data={data}
        loading={loading}
      />
      <IndicatorsCard
        data={data}
      />
    </PageContainer>
  )
}

export default SummaryOfData
