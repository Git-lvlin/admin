import ProCard from '@ant-design/pro-card'
import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import IPOPrize from './ipo-prize'
import ShopMonthIPOPrize from './shop-month-ipo-prize'
import ShopHistoryIpoPrize from './shop-history-ipo-prize'

const IpoGiftManagement: React.FC = () => {
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
        <ProCard.TabPane key='1' tab='区县服务商订单直推人IPO奖'>
          { activeKey === '1' && <IPOPrize /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='区县服务商IPO奖'>
          { activeKey === '2' && <IPOPrize /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='3' tab='门店合作商订单直推人IPO奖-本月'>
          { activeKey === '3' && <ShopMonthIPOPrize /> }
        </ProCard.TabPane>
        <ProCard.TabPane key='4' tab='门店合作商订单直推人IPO奖-历史'>
          { activeKey === '4' && <ShopHistoryIpoPrize /> }
        </ProCard.TabPane>
      </ProCard> 
    </PageContainer>
  )
}

export default IpoGiftManagement