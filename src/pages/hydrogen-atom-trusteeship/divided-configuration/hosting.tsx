import { useState } from "react"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

import { getCommissionConfig } from "@/services/hydrogen-atom-trusteeship/divided-configuration"
import { amountTransform } from "@/utils/utils"

const Hosting = () => {
  const [leaseEndDay, setLeaseEndDay] = useState()

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'item',
      align: 'center'
    },
    {
      title: '说明',
      dataIndex: 'divideExplain',
      align: 'center',
      width: '30%'
    },
    {
      title: '累计分成金额(元)',
      dataIndex: 'divideMoney',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '提成账号',
      dataIndex: 'dividePerson',
      align: 'center'
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      options={false}
      pagination={false}
      search={false}
      headerTitle='运营中心套餐费_氢原子设备租赁套餐管理费对各个角色分成'
      params={{type: 'hosting'}}
      request={getCommissionConfig}
      postData={(v: any)=>{
        setLeaseEndDay(v.totalAmount)
        return v.records.map((item: any, idx: number)=>({
          id: idx + 1,
          ...item
        }))
      }}
      toolBarRender={() => [
        <span>托管购买金额：{amountTransform(leaseEndDay, '/').toFixed(2)}元</span>
      ]}
    />
  )
}

export default Hosting