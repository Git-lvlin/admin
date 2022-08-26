import { useRef } from "react"
import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import { adminOrderList } from "@/services/hydrogen-atom-trusteeship/order-management"
import Export from "@/components/export"


const AgentOperatingOrder = () => {
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '运营订单号',
      dataIndex: 'orderId',
      align: 'center'
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '投放失败',
        2: '投放成功',
        5: '待发货',
        6: '待收货',
        7: '已收货',
        10: '运营中',
        15: '停止运营',
        20: '停止托管'
      }
    },
    {
      title: '运营商手机号',
      dataIndex: 'storePhone',
      align: 'center'
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
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
      title: '运营商社区店ID',
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
      title: '发货时间',
      dataIndex: 'deliveryTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.deliveryTime) {
          return moment(r.deliveryTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return null
        }
      }
    },
    {
      title: '收货时间',
      dataIndex: 'receiptTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.receiptTime) {
          return moment(r.receiptTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return null
        }
      }
    }
  ]

  return (
    <ProTable
      rowKey='orderId'
      columns={columns}
      options={false}
      formRef={form}
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse(),
          <Export
            key='1'
            type='healthyAdminOperate'
            conditions={{...form.current?.getFieldsValue()}}
          />
        ]
      }}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      params={{}}
      request={adminOrderList}
    />
  )
}

export default AgentOperatingOrder
