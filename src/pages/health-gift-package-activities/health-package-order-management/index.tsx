import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import { Select } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import PageContainer from "@/components/PageContainer"
import Detail from "./detail"
import { giftPackageOrder, packageSampleList } from "@/services/health-gift-package-activities/health-package-order-management"
import Export from "@/components/export"

const StoreHealthCardManagement = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState()
  const [list, setList] = useState()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    packageSampleList().then(res=> {
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
      align: 'center',
      render: (_,record) => {
        return <div>{record.memberPhone?record.memberPhone:<span style={{ color:'red' }}>{record.memberPhone}（第1次注销）</span>}</div>
      }
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      order: -1,
    },
    {
      title: '套餐名称',
      dataIndex: 'giftPackageId',
      hideInTable: true,
      renderFormItem: () => <Select options={list}/>
    },
    {
      title: '套餐名称',
      dataIndex: 'giftPackageTitle',
      align: 'center',
      hideInSearch: true
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
      fixed: 'right',
      width: 50,
      render: (_, r)=> <a onClick={()=> {setVisible(true); setId(r.orderId)}}>详情</a>
    },
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{orderType: 34}}
        request={giftPackageOrder}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        scroll={{x:'max-content'}}
        options={false}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='exprot'
              type='trans-export-gift-package-order'
              conditions={{orderType: 34, ...form.current?.getFieldsValue()}}
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