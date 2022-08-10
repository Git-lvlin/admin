import ProTable from '@ant-design/pro-table'

import type { ProColumns } from "@ant-design/pro-table"

import { stopOperateList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StopOperate = () => {

  const columns: ProColumns[] = [
    {
      title: '运营订单号',
      dataIndex: 'orderId',
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
      title: '原店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '激活时间',
      dataIndex: 'activationTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '激活时间',
      dataIndex: 'activationTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '停止运营时间',
      dataIndex: 'stopOperateTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '停止运营时间',
      dataIndex: 'stopOperateTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '停止操作人',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> `${r.operateLog.name}`,
      hideInSearch: true
    },
    {
      title: '停止类型',
      dataIndex: 'type',
      align: 'center',
      render: (_, r)=> `${r.operateLog.type}`,
      hideInSearch: true
    },
    {
      title: '停止原因',
      dataIndex: 'reason',
      align: 'center',
      render: (_, r)=> `${r.operateLog.reason}`,
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a>重新投放</a>
    }
  ]
  return (
    <ProTable
      rowKey='orderId'
      columns={columns}
      params={{}}
      request={stopOperateList}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 100,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default StopOperate
