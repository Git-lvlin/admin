import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

import { agentOrderPage } from "@/services/hydrogen-atom-trusteeship/order-management"
import { amountTransform } from "@/utils/utils"

const EscrowPurchaseOrder = () => {

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '托管订单号',
      dataIndex: 'orderSn',
      align: 'center'
    },
    {
      title: '已签托管合同',
      dataIndex: 'signed',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        if(_) {
          return '是'
        } else {
          return '否'
        }
      }
    },
    {
      title: '合同签订状态',
      dataIndex: 'signed',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        true: '是',
        false: '否'
      }
    },
    {
      title: '下单人手机',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: 'VIP店主',
      dataIndex: 'vip',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        false: '否',
        true: '是'
      },
      hideInSearch: true
    },
    {
      title: '社区店编号',
      dataIndex: 'storeNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '模拟支付',
        1: '支付宝',
        2: '微信',
        3: '小程序',
        4: '银联',
        5: '钱包支付',
        6: '支付宝',
        7: '微信',
        8: '银联',
        9: '快捷支付'
      },
      hideInSearch: true
    },
    {
      title: '实付金额',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '支付单号',
      dataIndex: 'paySn',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '关联运营订单号',
      dataIndex: 'operationSn',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <>
          <div>{_}</div>
          {
            r.statusTips&&
            <div style={{color: '#f00'}}>{r.statusTips}</div>
          }
        </>
      )
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      options={false}
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse()
        ]
      }}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      params={{}}
      request={agentOrderPage}
    />
  )
}

export default EscrowPurchaseOrder
