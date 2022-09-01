import ProCard from "@ant-design/pro-card"

import type { FC } from "react"

import PackageManagementFee from "./package-management-fee"
import PageContainer from "@/components/PageContainer"
import Hosting from "./hosting"
import ServiceFee from "./service-fee"

const DividedConfiguration: FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买交易款">
          <Hosting/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="运营中心培训服务费">
          <ServiceFee/>
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="运营中心套餐管理费">
          <PackageManagementFee/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default DividedConfiguration
