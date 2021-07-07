import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Space, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsPage } from '@/services/intensive-store-management/product-management';
import { useParams, useLocation, history } from 'umi';
import { amountTransform, typeTransform } from '@/utils/utils'
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'


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
      render: (_, data) => <a onClick={() => { history.push(`/product-management/product-detail/${data.spuId}`) }}>{data.goodsName}</a>

    },
    {
      title: '图片',
      dataIndex: 'skuImageUrl',
      valueType: 'text',
      render: (_) => <img src={_} width="50" height="50" />,
      hideInSearch: true,
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商ID'
      },
      hideInTable: true,
    },
    {
      title: '供应商ID',
      dataIndex: ['supplier', 'id'],
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
    {
      title: '商品分类',
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    // {
    //   title: '商品品牌',
    //   dataIndex: 'brandId',
    //   renderFormItem: () => (<BrandSelect />),
    //   hideInTable: true,
    // },
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
        rowKey="orderId"
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
        pagination={{
          pageSize: 10,
        }}
      />
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <Button onClick={() => { history.goBack() }}>返回</Button>
      </div>
    </PageContainer>

  );
};

export default TableList;
