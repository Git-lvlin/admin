import { PageContainer } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'

import FoundationDonationRecords from './foundation-donation-records'
import UserRegistrationRecord from './user-registration-record'
import FundReceiptRecord from './fund-receipt-record'

const RegistrationRecordLoveFeedback = ()=>  {
  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{type: 'line'}}
      >
        <ProCard.TabPane key="tab1" tab="基金会捐赠记录">
          <FoundationDonationRecords/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="用户登记记录">
          <UserRegistrationRecord/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="基金到账记录">
          <FundReceiptRecord/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default RegistrationRecordLoveFeedback
