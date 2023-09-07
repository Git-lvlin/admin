import { PageContainer } from "@ant-design/pro-layout"
import ProCard from '@ant-design/pro-card'

import type { FC } from "react"

import SupplierEntryContract from "./supplier-entry-contract"
import HydrogenLeaseContract from "./hydrogen-lease-contract"
import HydrogenThirdpartnarContract from "./hydrogen-thirdpartnar-contract"
import HealthyLivingPavilionContract from "./healthy-living-pavilion-contract"
import ADEVolunteerContract from "./ADE-volunteer-contract"
import IPOContract from "./IPO-contract"
import OutpatientContract from "./outpatient-contract"

 const ContractManagement:FC = () => {
  const key = JSON.parse(window.localStorage.getItem('managed') as string)?.type
  
  return (
    <PageContainer title={false}>
      <ProCard
        tabs={{
          type: 'card',
          defaultActiveKey: `${key}` || '1',
        }}
      >
        <ProCard.TabPane key="0" tab="当前合同">
          <OutpatientContract />
        </ProCard.TabPane>
        <ProCard.TabPane key="1" tab="供应商入驻合同">
          <SupplierEntryContract/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="氢原子租赁合同">
          <HydrogenLeaseContract type={1}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="氢原子托管合同">
          <HydrogenLeaseContract type={3}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="4" tab="氢原子代运营合同">
          <HydrogenThirdpartnarContract/> 
        </ProCard.TabPane>
        <ProCard.TabPane key="5" tab="健康生活馆加盟合同">
          <HealthyLivingPavilionContract/> 
        </ProCard.TabPane>
        <ProCard.TabPane key="6" tab="AED宣传员服务协议合同">
          <ADEVolunteerContract/> 
        </ProCard.TabPane>
        <ProCard.TabPane key="7" tab="直推早筛IPO奖股权赠送合同">
          <IPOContract />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ContractManagement
