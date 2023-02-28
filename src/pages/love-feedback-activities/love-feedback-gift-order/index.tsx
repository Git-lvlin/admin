import { useState, useRef, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Select } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { giftPackageOrder, packageSampleList } from '@/services/health-package-activities/health-package-order-management'
import { amountTransform } from '@/utils/utils'
import DetailDrawer from './detail-drawer'
import Export from '@/components/export'

const LoveFeedbackGiftOrder = ()=>  {
  const [visible, setVisible] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()
  const [arrival, setArrival] = useState<string>()
  const [list, setList] = useState()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    packageSampleList({orderType: 33}).then(res => {
      if(res.code === 0) {
        setList(res.data.map((item: {giftPackageTitle: string, giftPackageId: string}) => ({
          label: item.giftPackageTitle,
          value: item.giftPackageId
        })))
      }
    })
  }, [])

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
      dataIndex: 'giftPackageId',
      align: 'center',
      fieldProps: {
        placeholder: '请选择礼品名称'
      },
      renderFormItem: () => <Select options={list}/>,
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
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '基金资金到账状态',
      dataIndex: 'isArrivalDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a onClick={()=>{setVisible(true); setArrival(r.isArrivalDesc); setOrderId(r.orderId)}}>详情</a>
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
        formRef={form}
        params={{orderType: 33}}
        request={giftPackageOrder}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='exprot'
              type='trans-export-gift-package-order-love-feedback'
              conditions={{orderType: 33, ...form.current?.getFieldsValue()}}
            />
          ]
        }}
      />
      {
        visible&&
        <DetailDrawer
          visible={visible}
          setVisible={setVisible}
          id={orderId}
          state={arrival}
        />
      }
    </PageContainer>
  )
}

export default LoveFeedbackGiftOrder
