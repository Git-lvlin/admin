import { PageContainer } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'

import Scheme from './scheme'

const HealthDetectionCondition = () => {

  return (
    <PageContainer title={false}>
       <ProCard
        tabs={{
          type: 'card',
        }}
      >
        <ProCard.TabPane key="tab1" tab="男性健康调理">
          <Scheme gender='men'/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="女性健康调理">
          <Scheme gender='women'/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default HealthDetectionCondition