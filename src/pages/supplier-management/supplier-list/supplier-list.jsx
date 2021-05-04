import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import SupplierMerchant from './supplier-merchant';
import ConsultantList from './consultant-list';

const TableList = () => {
  const [activeKey, setActiveKey] = useState('2')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="供应商商家">
          {activeKey === '1' && <SupplierMerchant />}
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="供应商顾问">
          {activeKey === '2' && <ConsultantList />}
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>

  )
};

export default TableList;
