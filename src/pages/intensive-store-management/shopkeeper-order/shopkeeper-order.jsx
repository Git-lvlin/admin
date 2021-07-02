import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Button } from 'antd';
import { memberShopSaleOrder } from '@/services/intensive-store-management/shopkeeper-order';
import { useParams, useLocation, history } from 'umi';
import { amountTransform } from '@/utils/utils'


const TableList = () => {

  const params = useParams();
  const location = useLocation();

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
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
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID'
      },
      render: (_, data) => data?.orderItemList?.[0]?.skuId
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
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
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '待付款',
        2: '待发货',
        3: '已发货',
        4: '已完成',
        5: '已关闭'
      }
    },
    {
      title: '下单时间',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '下单手机号',
      dataIndex: 'buyerPhone',
      valueType: 'text',
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <div style={{ marginBottom: 10, background: '#fff', padding: 10 }}>
        <Space size="large">
          <span>{location?.query?.storeName}</span>
          <span>({location?.query?.linkman} {location?.query?.phone})</span>
        </Space>
      </div>
      <ProTable
        rowKey="sumOrderId"
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
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <Button onClick={() => { history.goBack() }}>返回</Button>
      </div>
    </PageContainer>

  );
};

export default TableList;
