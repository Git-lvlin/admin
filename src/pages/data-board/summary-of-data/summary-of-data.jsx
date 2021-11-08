import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import IndicatorsCard from './indicators-card'
import RealTime from './real-time'

const SummaryOfData = () => {

  return (
    <PageContainer title={false}>
      <RealTime />
      <IndicatorsCard />
    </PageContainer>
  )
}

export default SummaryOfData
