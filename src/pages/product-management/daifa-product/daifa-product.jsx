import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import SelectedProduct from './selected-product'


const DaifaProduct = () => {
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
        <ProCard.TabPane key="1" tab="1688已选商品">
          <SelectedProduct />
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="代发基础商品库">
          <div>2</div>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default DaifaProduct;
