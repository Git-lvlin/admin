import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import PerformanceDetails from './performance-details'
import MonthlyPerformance from './monthly-performance'

const HydrogenStartFee: React.FC = () => {

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="tab1" tab="业绩明细">
          <PerformanceDetails />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="月度业绩">
          <MonthlyPerformance />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default HydrogenStartFee
