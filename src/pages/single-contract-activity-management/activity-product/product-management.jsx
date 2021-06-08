import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { ruleGoodsList } from '@/services/single-contract-activity-management/activity-product';
import { useParams, history, useLocation } from 'umi';

const TableList = () => {
  const location = useLocation()
  const params = useParams();
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
    // {
    //   title: '图片',
    //   dataIndex: 'skuImageUrl',
    //   valueType: 'text',
    //   render: (_) => <img src={_} width="50" height="50" />,
    //   hideInSearch: true,
    // },
    {
      title: '规格',
      dataIndex: 'skuName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '所属商家',
      dataIndex: 'supplierName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '秒约价',
      dataIndex: 'salePrice',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '单约价',
      dataIndex: 'activityPrice',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '单约库存',
      dataIndex: 'activityStockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '开团数量',
      dataIndex: 'skuGroupNum',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0 ? <a onClick={() => { history.push(`/single-contract-activity-management/group-detail/${data.ruleId}`) }}>{_}</a> : 0
      }
    },
  ];

  return (
    <PageContainer>
      <div style={{ marginBottom: 10, background: '#fff', padding: 10 }}>{location.query.info}</div>
      <ProTable
        rowKey="spuId"
        options={false}
        params={{
          id: params.id
        }}
        postData={(data) => {
          return data.goodsList.records;
        }}
        request={ruleGoodsList}
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
