import { useState } from "react"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

import { getCommissionConfig } from "@/services/hydrogen-atom-trusteeship/divided-configuration"
import { amountTransform } from "@/utils/utils"

const ServiceFee = () => {
  const [leaseEndDay, setLeaseEndDay] = useState()

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: '说明',
      dataIndex: 'remark',
      align: 'center',
      width: '30%'
    },
    {
      title: '提成金额',
      dataIndex: 'amount',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '提成账号',
      dataIndex: 'account',
      align: 'center'
    },
   
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      options={false}
      pagination={false}
      search={false}
      headerTitle='运营商培训服务费_氢原子设备资质服务费对各个角色分成'
      params={{type: 'serviceFee'}}
      request={getCommissionConfig}
      postData={(v: any)=>{
        setLeaseEndDay(v.operatorUnitPrice)
        return v.items
      }}
      toolBarRender={() => [
        <span>交易款金额（资质培训服务费）：{amountTransform(leaseEndDay, '/').toFixed(2)}元</span>
      ]}
    />
  )
}

export default ServiceFee