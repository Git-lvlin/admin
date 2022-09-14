import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import EscrowPurchaseTransaction from "./escrow-purchase-transaction"
import TrainingServiceTransaction from "./training-service-transaction"
import RentManagementTransaction from "./rent-management-transaction"

function EquipmentManagement () {
  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买交易">
          <EscrowPurchaseTransaction/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="培训服务费交易">
          <TrainingServiceTransaction/>
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="租金管理费交易">
          <RentManagementTransaction/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default EquipmentManagement
