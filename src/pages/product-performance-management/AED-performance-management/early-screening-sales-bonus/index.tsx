import { useState } from 'react'
import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import SalesPerformance from './sales-performance'
import IPOManage from './IPO-manage'
import IPOManageProcess from './IPO-manage-process'
import { getAuth } from '@/components/auth'

const EarlyScreeningSalesBonus:React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: (_) => setActiveKey(_)
        }}
      >
        <ProCard.TabPane key='1' tab='早筛销售人业绩'>
          { activeKey === '1' && <SalesPerformance />}
        </ProCard.TabPane>
        <ProCard.TabPane key='2' tab='早筛销售人IPO奖管理'>
          { activeKey === '2' && <IPOManage /> }
        </ProCard.TabPane>
        {/* {
          getAuth('reviewRewards') &&
          <ProCard.TabPane key='3' tab='早筛销售人IPO奖审核'>
            { activeKey === '3' && <IPOManageProcess /> }
          </ProCard.TabPane>
        } */}
        <ProCard.TabPane key='3' tab='早筛销售人IPO奖审核'>
          { activeKey === '3' && <IPOManageProcess /> }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default EarlyScreeningSalesBonus