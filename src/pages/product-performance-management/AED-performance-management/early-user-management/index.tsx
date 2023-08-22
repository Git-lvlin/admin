import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import AEDEarlyOrderManagement from './early-order-management'
import WaitDetectionUser from './wait-detection-user'

const Index = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane
          key='1'
          tab='早筛订单'
        >
          <AEDEarlyOrderManagement />
        </ProCard.TabPane>
        <ProCard.TabPane
          key='2'
          tab='待采样早筛订单'
        >
          <WaitDetectionUser />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default Index
