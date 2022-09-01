import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import StayPut from "./stay-put"
import StayOperation from "./stay-operation"
import Operating from "./operating"
import StopOperate from "./stop-operate"
import StopHosting from "./stop-hosting"

function EquipmentManagement () {
  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="待投放">
          <StayPut/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="待运营">
          <StayOperation/>
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="运营中">
          <Operating/>
        </ProCard.TabPane>
        <ProCard.TabPane key="4" tab="停止运营（运营中心）">
          <StopOperate/>
        </ProCard.TabPane>
        <ProCard.TabPane key="5" tab="终止托管（投资人）">
          <StopHosting/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default EquipmentManagement
