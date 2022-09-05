import { useState, useRef, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { FC } from "react"
import type { FormInstance } from 'antd'
import { Descriptions } from 'antd'
import { StayPutProps,DescriptionsProps } from "./data"

import { waitPutList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import Export from "@/components/export"
import AddressCascader from '@/components/address-cascader'
import styles from './styles.less'

const StayPut: FC = () => {
  const actRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const getFieldsValue = () => {
    const { hostingPayTime, ...rest } = formRef.current?.getFieldsValue()
    return {
      hostingPayStartTime: hostingPayTime && moment(hostingPayTime?.[0]).unix(),
      hostingPayEndTime: hostingPayTime && moment(hostingPayTime?.[1]).unix(),
      ...rest
    }
  }

  useEffect(() => {
    // userCount({}).then(res=>{
    //   if(res.code==0){
    //     setDetailList(res.data)
    //   }
    // })

  }, [])

  const columns: ProColumns<StayPutProps>[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'hostingMemberPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入用户手机'
      },
      order: 5
    },
    {
      title: '订单编号',
      dataIndex: 'hostingOrderId',
      align: 'center',
      fieldProps: {
        placeholder: '请输入订单编号'
      },
      order: 2
    },
    {
      title: '支付时间',
      dataIndex: 'hostingPayTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => moment(r?.hostingPayTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '支付时间',
      dataIndex: 'hostingPayTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      order: 6
    },
    {
      title: '订单金额（元）',
      dataIndex: 'hostingPayTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => moment(r?.hostingPayTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
     {
      title: '下单人店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      fieldProps: {
        placeholder:'请输入社区店编号'
      },
      order: 4
    },
    {
      title: '下单人店铺名称',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人店铺所属地区',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect placeholder="请选择" />),
      order: 1
    },
    {
      title: '交易资质数(个)',
      dataIndex: 'hostingMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易资质数(个)',
      dataIndex: 'hostingMemberPhone',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '1台',
        2: '2台',
        3: '3台',
      },
      order: 3
    },
  ]

  return (
    <>
      <ProTable<StayPutProps>
        rowKey='id'
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        request={waitPutList}
        options={false}
        actionRef={actRef}
        formRef={formRef}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export 
              type='healthyDeviceWaitPut' 
              conditions={getFieldsValue}
              key='export'
            />
          ]
        }}
        className={styles.escrow_purchase_transaction}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={3} bordered>
            <Descriptions.Item  label="总业绩金额">{detailList?.agencyTotalNum} 元</Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量">{detailList?.agencyLoginNum} 家</Descriptions.Item>
            <Descriptions.Item  label="总交易资质数量">{detailList?.vipStoreNum} 台</Descriptions.Item>
          </Descriptions>
        )}
      />
    </>
  )
}

export default StayPut
