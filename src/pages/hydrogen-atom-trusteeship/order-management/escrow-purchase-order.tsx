import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

import { agentOrderPage } from "@/services/hydrogen-atom-trusteeship/order-management"

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
      hideInSearch: true
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
        0: '否',
        1: '是'
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
      dataIndex: 'createTime',
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
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '实付金额',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
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
            <div>{r.statusTips}</div>
          }
        </>
      )
    },
    {
      title: '合同签订状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {

      },
      align: 'center',
      hideInTable: true
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
