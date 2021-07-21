import { PageContainer } from '@ant-design/pro-layout'
import { Tabs } from 'antd'

import TabList from './tab-list'

const { TabPane } = Tabs

const InterventionList = () => {
  return (
    <PageContainer
      title={ false }
    >
      <Tabs
       centered
       defaultActiveKey="1"
       style={{
         background: '#fff',
         padding: 25
       }}
      >
        <TabPane key="1" tab="待处理">
          <TabList done={1}/>
        </TabPane>
        <TabPane key="2" tab="已处理">
          <TabList done={0}/>
        </TabPane>
      </Tabs>
    </PageContainer>
  )
};

export default InterventionList