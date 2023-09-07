import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import CountyServiceProviders from './county-service-providers'

const StorePartnersManagement: React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key='1' tab='区县服务商'>
          <CountyServiceProviders type='service'/>
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='区县服务商复审'>
          <CountyServiceProviders type='review'/>
        </ProCard.TabPane>
        <ProCard.TabPane key='3' tab='区县服务商初审'>
          <CountyServiceProviders type='verify'/>
        </ProCard.TabPane>
        <ProCard.TabPane key='4' tab='区县服务商订单'>
          <CountyServiceProviders type='order'/>
        </ProCard.TabPane>
      </ProCard> 
    </PageContainer>
  )
}

export default StorePartnersManagement