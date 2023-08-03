import React, { useState, useRef } from 'react';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { getCommissionLog } from '@/services/product-management/designated-commodity-settlement';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import Detail from './detail'

export default () => {
  const [v, setV] = useState(false)
  const actionRef = useRef();
  const columns = [
    {
      title: '创建日期',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '业务名称',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true,
      render:(_)=> <a onClick={()=> {setV(true)}}>{_}</a>
    },
    {
      dataIndex: '分账角色数',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '分账计算类型',
      dataIndex: 'spuId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '平台最少分账',
      dataIndex: 'skuId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'distributePrice',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '计账时段',
      dataIndex: 'goodsName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'commissionType',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '商品',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近操作人',
      dataIndex: 'cityManageFee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近操作时间',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
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
        params={{
          orderType: 30
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
      />
      {
        v &&
        <Detail
          visible={v}
          setVisible={setV}
        />
      }
    </PageContainer>
  );
};
