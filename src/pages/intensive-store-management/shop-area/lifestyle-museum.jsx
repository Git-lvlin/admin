import { useRef, useState, useEffect } from 'react';
import { Button, message, Space, Select,Switch } from 'antd';
import ProTable from '@/components/pro-table';
import { lifeHousePackage } from '@/services/intensive-store-management/shop-area'
import { amountTransform } from '@/utils/utils'

const LifestyleMuseum = () => {
  const columns = [
    {
      title: '套餐名称',
      dataIndex: 'title',
    },
    {
      title: '有效期(个月)',
      dataIndex: 'period',
    },
    {
      title: '售价(元)',
      dataIndex: 'periodAmount',
      render: (_)=>{
        return amountTransform(_,'/')
      },
    },
    {
      title: '折合每月费用(元)',
      dataIndex: 'periodAmountPerMonth',
      render: (_)=>{
        return amountTransform(_,'/')
      },
    },
    {
      title: '赠送VIP期限(个月)',
      dataIndex: 'presentedVipPeriod',
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
    },
  ];

  return (
      <ProTable
        rowKey="packageId"
        columns={columns}
        request={lifeHousePackage}
        search={false}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
  );
};


export default LifestyleMuseum