import { PageContainer } from '@ant-design/pro-layout'
import ProCard from "@ant-design/pro-card"

import CardVerificationDetails from "./card-verification-details"

const Direcffons = () => {
 
  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="卡核销明细">
          <CardVerificationDetails/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="免卡启动明细">
          
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default Direcffons