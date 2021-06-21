import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsPage } from '@/services/intensive-store-management/product-management';
import { useParams, useLocation } from 'umi';
import { amountTransform, typeTransform } from '@/utils/utils'


const TableList = () => {

  const params = useParams();
  const location = useLocation();

  const columns = [
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入skuID'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
    },
    {
      title: '图片',
      dataIndex: 'skuImageUrl',
      valueType: 'text',
      render: (_) => <img src={_} width="50" height="50" />,
      hideInSearch: true,
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierCompanyName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
      hideInTable: true,
    },
    {
      title: '所属供应商',
      dataIndex: ['supplier', 'companyName'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '店内可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '店内销量',
      dataIndex: 'saleNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '售价',
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '进店时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '展示状态',
      dataIndex: 'onlineStatusText',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '展示状态',
      dataIndex: 'onlineStatus',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '展示中',
        2: '已隐藏'
      }
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
        rowKey="storeNo"
        options={false}
        params={{
          storeNo: params.id
        }}
        request={goodsPage}
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
