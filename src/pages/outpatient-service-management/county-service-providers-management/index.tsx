import ProCard from '@ant-design/pro-card'
import { useState } from 'react'

import PageContainer from '@/components/PageContainer'
import CountyServiceProviders from './county-service-providers'
import CountyServiceProvidersOrder from './county-service-providers-order'
import Reexamine from './reexamine'
import Audit from './audit'

const StorePartnersManagement: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1')
  
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key='1' tab='区县服务商'>
          { activeKey === '1' && <CountyServiceProviders /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='区县服务商复审'>
          { activeKey === '2' && <Reexamine /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='3' tab='区县服务商初审'>
          { activeKey === '3' && <Audit /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='4' tab='区县服务商订单'>
        { activeKey === '4' && <CountyServiceProvidersOrder /> }
        </ProCard.TabPane>
      </ProCard> 
    </PageContainer>
  )
}

export default StorePartnersManagement