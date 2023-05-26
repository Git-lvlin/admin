import { PageContainer } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'

import WithdrawalFeeConfig from './withdrawal-fee-configuration'
// import SelectSystem from './select-system'

const Index: React.FC = () => {
  return (
    <PageContainer title={false}>
      <ProCard
        tabs={{
          type: 'line'
        }}
      >
        <ProCard.TabPane key="1" tab="优付 提现费设置">
          <WithdrawalFeeConfig type='youfu'/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="薪宝 提现费设置">
          <WithdrawalFeeConfig type='xinbao'/>
        </ProCard.TabPane>
        {/* <ProCard.TabPane key="3" tab="选择提现代发系统">
          <SelectSystem />
        </ProCard.TabPane> */}
      </ProCard>
    </PageContainer>
  )
}

export default Index