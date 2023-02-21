import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { giftPackageOrder } from '@/services/health-package-activities/health-package-order-management'
import { amountTransform } from '@/utils/utils'
import DetailDrawer from './detail-drawer'

const LoveFeedbackGiftOrder = ()=>  {
  const [visible, setVisible] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取人姓名',
      dataIndex: 'nickname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'memberPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入领取人手机号'
      },
      hideInTable: true
    },
    {
      title: '礼品名称',
      dataIndex: 'giftPackageTitle',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'giftPackageTitle',
      align: 'center',
      fieldProps: {
        placeholder: '请输入礼品名称'
      },
      hideInTable: true
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '收货人详细地址',
      dataIndex: 'receiverAddress',
      align: 'center',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '领取时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '礼包金额（元）',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>{setVisible(true); setOrderId(r.orderId)}}>详情</a>
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        params={{orderType: 33}}
        request={giftPackageOrder}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
      {
        visible&&
        <DetailDrawer
          visible={visible}
          setVisible={setVisible}
          id={orderId}
        />
      }
    </PageContainer>
  )
}

export default LoveFeedbackGiftOrder
