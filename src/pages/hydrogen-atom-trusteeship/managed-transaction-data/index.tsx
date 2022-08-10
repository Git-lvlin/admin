import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import Operator from "./operator"

const ManagedTransactionData = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买(投资方)">
          
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="运营商">
          <Operator />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ManagedTransactionData
