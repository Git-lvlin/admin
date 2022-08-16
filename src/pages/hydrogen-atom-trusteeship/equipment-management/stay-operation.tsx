import ProTable from '@ant-design/pro-table'

import type { ProColumns } from "@ant-design/pro-table"

import { waitOperateList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StayOperation = () => {

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      align: 'center'
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        5: '待发货',
        6: '待收货',
        7: '待激活',
      }
    },
    {
      title: '下单人手机号',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '运营商手机号',
      dataIndex: 'storePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店编号',
      dataIndex: 'storeHouseNumber',
      align: 'center'
    },
    {
      title: '物流单号',
      dataIndex: 'expressNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '发货时间',
      dataIndex: 'deliveryTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货时间',
      dataIndex: 'receiptTime',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      params={{}}
      request={waitOperateList}
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

export default StayOperation
