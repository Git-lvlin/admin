import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';

import Table from './table';

const options = [
  {
    key: '1',
    tab: '全部订单',
    type: undefined,
  },
  {
    key: '2',
    tab: '待付款',
    type: 0
  },
  {
    key: '3',
    tab: '已付订金',
    type: 1
  },
  {
    key: '4',
    tab: '已付尾款',
    type: 2,
  },
  {
    key: '5',
    tab: '待收货',
    type: 3,
  },
  {
    key: '6',
    tab: '已完成',
    type: 5,
  },
  {
    key: '7',
    tab: '已关闭',
    type: 6,
  },
]

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
        {
          options.map(item => (
            <ProCard.TabPane key={item.key} tab={item.tab}>
              {activeKey === item.key && <Table type={item.type} />}
            </ProCard.TabPane>
          ))
        }
      </ProCard>
    </PageContainer>

  )
};

export default TableList;
