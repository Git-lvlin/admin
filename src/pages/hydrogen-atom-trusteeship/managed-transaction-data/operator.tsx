import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { MemberShopOperatorPage } from '@/services/hydrogen-atom-trusteeship/managed-transaction-data'
import { amountTransform } from "@/utils/utils"


const Operator = () => {

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '可运营设备数',
      dataIndex: 'deviceTotal',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '扣除资质数',
      dataIndex: 'deviceDeduction',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center'
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '待运营设备数',
      dataIndex: 'deviceCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营中设备数',
      dataIndex: 'deviceOperation',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '停止运营设备数',
      dataIndex: 'deviceTerminated',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营服务费金额',
      dataIndex: 'deviceTotalPay',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      options={false}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      search={{
        labelWidth: 80,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse()
        ]
      }}
      params={{}}
      request={MemberShopOperatorPage}
    />
  )
}

export default Operator
