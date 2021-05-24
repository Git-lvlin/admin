import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import InProgress from './in-progress';
import ConsultantList from './consultant-list';

const TableList = () => {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="进行中">
          {activeKey === '1' && <InProgress />}
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="已成团">
          {activeKey === '2' && <ConsultantList />}
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
};

export default TableList;
