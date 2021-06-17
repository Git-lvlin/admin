import React from 'react';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import moment from 'moment';

import { interventionList } from '@/services/order-management/intervention-list'

const TabList =props=> {
  const { done } =props
  const columns =[
    {
      title: '售后编号',
      dataIndex: 'orderSn',
      align: 'center',
      
    },
    {
      title: '订单编号',
      dataIndex: 'subOrderSn',
      align: 'center',
    },
    {
      title: '售后类型',
      dataIndex: 'afterSalesType',
      valueType: 'select',
      align: 'center',
      hideInSearch: true,
      valueEnum:{
        1: '退款',
        2: '退款退货'
      }
    },
    {
      title: '处理时间',
      dataIndex: 'applyTime',
      valueType: 'date',
      colSize: .8,
      align: 'center',
      render: (_)=>{
        return(
          <>{moment(_.props.text).format('YYYY-MM-DD HH:mm:ss')}</>
        )
      }
    },
    {
      title: '申请介入类型',
      dataIndex: 'stage',
      valueType: 'select',
      colSize: .8,
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: '介入申请',
        2: '介入退款'
      }
    },
    {
      title: '介入类型',
      dataIndex: 'stage',
      valueType: 'select',
      colSize: .8,
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '介入申请',
        2: '介入退款'
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: '待处理',
        1: '已处理'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'option',
      render:(_, data)=>{
        return (
          <>
            <a onClick={()=>history.push(`/order-management/intervention-list/details/${data.id}`)}>查看详情</a>
          </>
        )
      }
    },
  ]
  return (
    <ProTable
      rowKey='orderSn'
      columns={columns}
      headerTitle="数据列表"
      rowSelection={{
        type: "checkbox"
      }}
      options={false}
      params={{
        done
      }}
      request={interventionList}
      pagination={{
        hideOnSinglePage: true,
        showQuickJumper: true
      }}
      search={{
        span: 5,
        defaultCollapsed: false,
        collapseRender: false
      }}
    />
  )
}

export default TabList;
