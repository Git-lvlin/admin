import TimeSelect from '@/components/time-select'
import React, { useState, useRef } from 'react';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
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
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      hideInTable: true,
      order: 3
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
      order: 1
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
      title: '新集约价',
      dataIndex: 'distributePrice',
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
      order: 2
    },
    {
      title: '分成类型',
      dataIndex: 'commissionType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '金额',
        2: '百分比'
      },
      hideInSearch: true,
    },
    // {
    //   title: '供应商（货款）',
    //   dataIndex: 'retailSupplyPrice',
    //   align: 'center',
    //   hideInSearch: true,
    //   render: (_,data)=>{
    //       return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
    //   }
    // },
    {
      title: '市办事处',
      dataIndex: 'cityManageFee',
      align: 'center',
      render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      },
      hideInSearch: true,
    },
    {
      title: 'VIP店主-直推',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '运营中心',
      dataIndex: 'companyAgent',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '汇能科技(积分/红包)',
      dataIndex: 'serviceFee',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '汇能',
      dataIndex: 'company',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '操作人',
      dataIndex: 'lastEditor',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer title="新集约商品批发订单分成结算记录">
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
    </PageContainer>
  );
};
