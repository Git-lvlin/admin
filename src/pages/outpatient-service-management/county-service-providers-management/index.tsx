import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import CountyServiceProviders from './county-service-providers'
import CountyServiceProvidersOrder from './county-service-providers-order'
import Reexamine from './reexamine'
import Audit from './audit'

const StorePartnersManagement: React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key='1' tab='区县服务商'>
          <CountyServiceProviders />
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='区县服务商复审'>
          <Reexamine />
        </ProCard.TabPane>
        <ProCard.TabPane key='3' tab='区县服务商初审'>
          <Audit />
        </ProCard.TabPane>
        <ProCard.TabPane key='4' tab='区县服务商订单'>
          <CountyServiceProvidersOrder />
        </ProCard.TabPane>
      </ProCard> 
    </PageContainer>
  )
}

export default StorePartnersManagement