import { useRef, useState } from "react"
import ProTable from '@/components/pro-table'
import moment from "moment"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import { adminOrderList } from "@/services/hydrogen-atom-trusteeship/order-management"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"
import ExpressInfo from "./express-info"

const AgentOperatingOrder = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '运营订单号',
      dataIndex: 'orderId',
      align: 'center'
    },
    {
      title: '关联托管单号',
      dataIndex: 'hostingOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '投资人手机',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '关联托管单金额',
      dataIndex: 'hostingPayAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        5: '待发货',
        6: '待收货',
        7: '已收货',
        10: '运营中',
        15: '停止运营',
        20: '停止托管'
      },
      hideInTable: true
    },
    {
      title: '订单状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true
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
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商店ID',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInTable: true
    },
    {
      title: '收货人',
      dataIndex: 'receiver',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货地址',
      dataIndex: 'shippingAddress',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '快递公司',
      dataIndex: 'expressName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '物流单号',
      dataIndex: 'expressNo',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> <a onClick={()=> { setVisible(true); setData(r) }}>{_}</a>
    },
    {
      title: '关联托管单下单时间',
      dataIndex: 'hostingPayTime',
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
    <>
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
      {
        visible &&
        <ExpressInfo
          visible={visible}
          setVisible={setVisible}
          data={data}
        />
      }
    </>
  )
}

export default AgentOperatingOrder
