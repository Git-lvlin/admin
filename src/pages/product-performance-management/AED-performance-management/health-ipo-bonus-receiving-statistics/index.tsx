import ProCard from '@ant-design/pro-card'
import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import CountyShopIpoStatistics from './county-shop-ipo-statistics'

const HealthIpoBonusReceivingStatistics: React.FC = () => {
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
        <ProCard.TabPane key='1' tab='区县服务商及订单直推人领取IPO奖统计'>
          { activeKey === '1' && <CountyShopIpoStatistics activeKey={activeKey}/> }
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='门店合作商订单直推人领取IPO奖统计'>
          { activeKey === '2' && <CountyShopIpoStatistics activeKey={activeKey}/> }
        </ProCard.TabPane>
      </ProCard> 
    </PageContainer>
  )
}

export default HealthIpoBonusReceivingStatistics