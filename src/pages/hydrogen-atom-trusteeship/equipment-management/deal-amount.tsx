import { useState } from "react"
import ProTable from '@/components/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FC } from "react"
import type { DealAmountProps } from "./data"

import { tranAndService } from '@/services/hydrogen-atom-trusteeship/equipment-management'
import { amountTransform } from '@/utils/utils'


const DealAmount: FC<DealAmountProps> = ({data, type}) => {
  const [amount, setAmount] = useState<string>()

  const params = {
    1: { orderId: data?.orderId, type: 'hostingOrder' },
    2: { orderId: data?.orderId, type: 'serviceFee' },
  }[type]

  const title = {
    1: `投资人手机号：${data?.hostingMemberPhone}`,
    2: `运营商手机号：${data?.storePhone}`
  }

  const optionsRender = {
    1: <span>托管购买订单金额：{amountTransform(amount, '/')}元</span>,
    2: <span>缴纳托管资质培训服务费：{amountTransform(amount, '/')}元</span>
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'commissionUser',
      align: 'center'
    },
    {
      title: '提成账号',
      dataIndex: 'commissionAccount',
      align: 'center'
    },
    {
      title: '累计分成金额(元)',
      dataIndex: 'amount',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      headerTitle={title[type]}
      params={params}
      request={tranAndService}
      scroll={{y: 500}}
      search={false}
      options={false}
      pagination={false}
      postData={(v: any) => {
        setAmount(v.amount)
        return v.list
      }}
      toolBarRender={() => optionsRender[type]}
    />
  )
}

export default DealAmount