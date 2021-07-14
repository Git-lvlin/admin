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
        rowKey='orderNo'
        columns={columns}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true
        }}
        toolBarRender={false}
        params={{accountId: id, status: query?.status}}
        request={detail}
      />
      <Button 
        type='primary'
        onClick={()=>{history.goBack()}}
      >
        返回
      </Button>
    </PageContainer>
  )
}

export default Detail
