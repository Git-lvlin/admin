import { useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import moment from "moment"

import type { ProColumns } from "@ant-design/pro-table"
import type { FC } from 'react'
import type { FormInstance } from "antd"

import { stopHostingList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import Export from "@/components/export"

const StopHosting: FC = () => {

  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '托管购买订单号',
      dataIndex: 'hostingOrderId',
      align: 'center'
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '投资人手机号',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '投资人店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '托管购买下单支付时间',
      dataIndex: 'hostingPayTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '托管购买下单支付时间',
      dataIndex: 'hostingPayTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '终止托管时间',
      dataIndex: 'stopHostingTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '终止托管时间',
      dataIndex: 'stopHostingTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '终止操作人',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> `${r.operateLog.name}`,
      hideInSearch: true
    },
    {
      title: '请求终止方',
      dataIndex: 'type',
      align: 'center',
      render: (_, r)=> `${r.operateLog.type}`,
      hideInSearch: true
    },
    {
      title: '终止原因',
      dataIndex: 'reason',
      align: 'center',
      render: (_, r)=> `${r.operateLog.reason}`,
      hideInSearch: true
    }
  ]

  const getFieldsValue = () => {
    const {hostingPayTime, stopHostingTime, ...rest} = form.current?.getFieldsValue()
    return {
      stopHostingStartTime: stopHostingTime && moment(stopHostingTime?.[0]).unix(),
      stopHostingEndTime: stopHostingTime && moment(stopHostingTime?.[1]).unix(),
      hostingPayStartTime: hostingPayTime && moment(hostingPayTime?.[0]).unix(),
      hostingPayEndTime: hostingPayTime && moment(hostingPayTime?.[1]).unix(),
      ...rest
    }
  }

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      params={{}}
      request={stopHostingList}
      formRef={form}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 150,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse(),
          <Export type='healthyDeviceStopHosting' conditions={getFieldsValue}/>
        ]
      }}
    />
  )
}

export default StopHosting
