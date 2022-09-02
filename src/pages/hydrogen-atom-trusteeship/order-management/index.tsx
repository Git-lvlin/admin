import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import AgentOperatingOrder from "./agent-operating-order"
import EscrowPurchaseOrder from "./escrow-purchase-order"


const OrderManagement = () => {
 
  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买订单（投资人）">
          <EscrowPurchaseOrder/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="代运营订单（运营商）">
          <AgentOperatingOrder/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default OrderManagement