import { PageContainer } from "@ant-design/pro-layout"
import ProCard from '@ant-design/pro-card'

import type { FC } from "react"

import SupplierEntryContract from "./supplier-entry-contract"
import HydrogenLeaseContract from "./hydrogen-lease-contract"
import HydrogenThirdpartnarContract from "./hydrogen-thirdpartnar-contract"

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
          <HydrogenLeaseContract type={1}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="氢原子托管合同">
          <HydrogenLeaseContract type={3}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="氢原子代运营合同">
          <HydrogenThirdpartnarContract/> 
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ContractManagement
