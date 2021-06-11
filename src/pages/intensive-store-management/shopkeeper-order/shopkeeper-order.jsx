import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { memberShopSaleOrder } from '@/services/intensive-store-management/shopkeeper-order';
import { useParams } from 'umi';
import { amountTransform } from '@/utils/utils'


const TableList = () => {

  const params = useParams();

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'subOrderSn',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入订单编号'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
      render: (_, data) => data?.orderItemList?.[0]?.goodsName
    },
    {
      title: '商品skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID'
      },
      render: (_, data) => data?.orderItemList?.[0]?.skuId
    },
    {
      title: '所属供应商',
      dataIndex: 'skuId',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => data?.orderItemList?.[0]?.skuId
    },
    {
      title: '商品数量',
      dataIndex: 'skuNum',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => data?.orderItemList?.[0]?.skuNum
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      valueType: 'text',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '买家手机号',
      dataIndex: 'buyerPhone',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => _.replace('T', ' ')
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="storeNo"
        options={false}
        params={{
          storeNo: params.id
        }}
        request={memberShopSaleOrder}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
    </PageContainer>

  );
};

export default TableList;
