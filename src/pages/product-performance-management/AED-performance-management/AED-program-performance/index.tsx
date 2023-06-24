import ProCard from '@ant-design/pro-card'

import type { FC } from "react"

import PageContainer from '@/components/PageContainer'
import styles from "../../styles.less"
import ProgramPerformance from './program-performance'
import TrainServicePackage from './train-service-package'
import Performance from './performance'

const AEDProgramPerformance: FC = () => {
  return (
    <PageContainer className={styles.desc}>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="AED和保证金订单">
          <ProgramPerformance />
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="培训服务套餐">
          <TrainServicePackage />
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="3800单业绩">
          <Performance />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default AEDProgramPerformance
