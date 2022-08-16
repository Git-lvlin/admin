import ProTable from '@ant-design/pro-table'

import type { ProColumns } from "@ant-design/pro-table"

import { stopHostingList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StopHosting = () => {

  const columns: ProColumns[] = [
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
      dataIndex: 'stopHostingTime ',
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
  return (
    <ProTable
      rowKey='hostingOrderId'
      columns={columns}
      params={{}}
      request={stopHostingList}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default StopHosting
