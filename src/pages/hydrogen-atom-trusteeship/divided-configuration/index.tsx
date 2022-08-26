import ProCard from "@ant-design/pro-card"

import type { FC } from "react"

import PackageManagementFee from "./package-management-fee"
import PageContainer from "@/components/PageContainer"

const DividedConfiguration: FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买交易款">
          
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="运营商培训服务费">
          
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="运营商套餐管理费">
          <PackageManagementFee/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default DividedConfiguration
