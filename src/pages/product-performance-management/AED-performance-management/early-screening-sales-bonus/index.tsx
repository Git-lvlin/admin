import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import SalesPerformance from './sales-performance'

const EarlyScreeningSalesBonus:React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key='1' tab='早筛销售人业绩'>
          <SalesPerformance />
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='早筛销售人IPO奖管理'>

        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default EarlyScreeningSalesBonus