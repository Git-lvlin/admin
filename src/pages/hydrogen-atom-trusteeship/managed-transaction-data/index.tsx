import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import Operator from "./operator"
import ManagedBuy from "./managed-buy"
import { getPageQuery } from "@/utils/utils"

const ManagedTransactionData = () => {
  
  return (
    <PageContainer title={false}>
      <ProCard
        tabs={{
          type: 'card',
          defaultActiveKey: getPageQuery().type as string || '1',
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买(投资方)">
          <ManagedBuy />
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="运营商">
          <Operator />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ManagedTransactionData
