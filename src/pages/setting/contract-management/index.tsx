import { PageContainer } from "@ant-design/pro-layout"
import ProCard from '@ant-design/pro-card'

import type { FC } from "react"

import SupplierEntryContract from "./supplier-entry-contract"
import HydrogenLeaseContract from "./hydrogen-lease-contract"

 const ContractManagement:FC = () => {
  return (
    <PageContainer title={false}>
      <ProCard
        tabs={{type: 'card'}}
      >
        <ProCard.TabPane key="tab1" tab="供应商入驻合同">
          <SupplierEntryContract/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="氢原子租赁合同">
          <HydrogenLeaseContract/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ContractManagement
