import React, { useState, useRef } from 'react';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCommissionLog } from '@/services/product-management/designated-commodity-settlement';
import { amountTransform } from '@/utils/utils'

export default () => {
  const actionRef = useRef();
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '操作类型',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true,
    },
     {
      title: '操作时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      dataIndex: 'spuId',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:'请输入spuID查询'
      },
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '供应商（货款）',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    // {
    //   title: '省办事处',
    //   dataIndex: 'provinceManageFee',
    //   align: 'center',
    //   hideInSearch: true,
    //   render: (_)=>{
    //     return amountTransform(_,'/').toFixed(2)
    //   }
    // },
    {
      title: '市办事处',
      dataIndex: 'cityManageFee',
      align: 'center',
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: 'VIP店主-直推',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: 'VIP店主-间推',
      dataIndex: 'shoppervipManageFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '普通店主-直推',
      dataIndex: 'shopperChargeFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '普通店主-间推',
      dataIndex: 'shopperManageFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '用户直推',
      dataIndex: 'userChargeFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },

    {
      title: '用户间推',
      dataIndex: 'userManageFee',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    // {
    //   title: '运营中心',
    //   dataIndex: 'companyAgent',
    //   align: 'center',
    //   hideInSearch: true,
    //   render: (_)=>{
    //     return amountTransform(_,'/').toFixed(2)
    //   }
    // },
    {
      title: '省代',
      dataIndex: 'provinceAgent',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '市代',
      dataIndex: 'cityAgent',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '全国分红奖',
      dataIndex: 'dividends',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '汇能科技',
      dataIndex: 'company',
      align: 'center',
      hideInSearch: true,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '操作人',
      dataIndex: 'lastEditor',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        bordered
        options={false}
        request={getCommissionLog}
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
      />
    </PageContainer>
  );
};
