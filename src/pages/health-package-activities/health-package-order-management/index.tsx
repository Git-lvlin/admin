import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import PageContainer from "@/components/PageContainer"
import Detail from "./detail"
import { giftPackageOrder } from "@/services/health-package-activities/health-package-order-management"
import Export from "@/components/export"

const StoreHealthCardManagement = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState()
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'payOrderSn',
      align: 'center'
    },
    {
      title: '套餐所属店铺编号',
      dataIndex: 'giftPpackageShopMemberAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐所属店铺名称',
      dataIndex: 'giftPpackageStoreName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '套餐名称',
      dataIndex: 'giftPackageTitle',
      align: 'center',
    },
    {
      title: '下单人店铺编号',
      dataIndex: 'buyerShopMemberAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货人详细地址',
      dataIndex: 'receiverAddress',
      align: 'center',
      hideInSearch: true,
      width: '20%'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单金额',
      dataIndex: 'payAmountYuan',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: 'payStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '未支付',
        2: '已支付',
        3: '交易关闭'
      },
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> <a onClick={()=> {setVisible(true); setId(r.orderId)}}>详情</a>
    },
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{orderType: 32}}
        request={giftPackageOrder}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='exprot'
              type='trans-export-gift-package-order'
              conditions={{orderType: 32, ...form.current?.getFieldsValue()}}
            />
          ]
        }}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
    </PageContainer>
  )
}

export default StoreHealthCardManagement