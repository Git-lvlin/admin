import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { useParams, useLocation, history } from 'umi'
import { Button } from 'antd'

import { detail } from '@/services/financial-management/subsidy-summary'
import { amountTransform } from '@/utils/utils'

const Detail = ()=> {
  const {id} = useParams()
  const {query} = useLocation()

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '券码',
      dataIndex: 'couponCode',
      align: 'center'
    },
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      align: 'center'
    },
    {
      title: '所属商家',
      dataIndex: 'accountName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '补贴金额',
      dataIndex: 'allowanceAmount',
      align: 'center',
      hideInSearch: true,
      render(_) {
        return `￥${amountTransform(_, '/')}`
      }
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '结算时间',
      dataIndex: 'settleTime',
      align: 'center'
    },
    {
      title: '结算状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        unSettle: '未结算',
        settled: '已结算'
      },
      hideInSearch: true
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        pagination={{
          pageSize: 10
        }}
        toolBarRender={false}
        params={{accountId: id, status: query?.status}}
        request={detail}
      />
      <div
        style={{
          background: '#fff',
          paddingBottom: 20
        }}
      >
        <Button 
          type='primary'
          onClick={()=>{history.goBack()}}
          style={{
            marginLeft: 20
          }}
        >
          返回
        </Button>
      </div>
    </PageContainer>
  )
}

export default Detail
