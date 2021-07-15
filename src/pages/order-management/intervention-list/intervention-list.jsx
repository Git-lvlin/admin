import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import TabList from './tab-list';


const InterventionList = () => {
  return (
    <PageContainer
      title={ false }
    >
      <ProCard
        tabs={{
          type: 'defult'
        }}
      >
        <ProCard.TabPane key="tab1" tab="待处理">
          <TabList done={0}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="已处理">
          <TabList done={1}/>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
};

export default InterventionList;