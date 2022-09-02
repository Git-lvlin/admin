import { useState } from "react"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

import { getCommissionConfig } from "@/services/hydrogen-atom-trusteeship/divided-configuration"
import { amountTransform } from "@/utils/utils"

const PackageManagementFee = () => {
  const [leaseEndDay, setLeaseEndDay] = useState()

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'dividePerson',
      align: 'center'
    },
    {
      title: '说明',
      dataIndex: 'describe',
      align: 'center',
      width: '30%'
    },
    {
      title: '提成比例',
      dataIndex: 'ratio',
      align: 'center'
    },
    {
      title: ()=>(
        <>
          <div>三个月套餐(3)</div>
          <div>9000 元</div>
        </>
      ),
      align: 'center',
      children: [
        {
          title: '提成金额',
          dataIndex: 'divideMoney1001',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        },
        {
          title: '每月提成',
          dataIndex: 'monthCommission1001',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        }
      ]
    },
    {
      title: ()=>(
        <>
          <div>六个月套餐(6)</div>
          <div>12000 元</div>
        </>
      ),
      align: 'center',
      children: [
        {
          title: '提成金额',
          dataIndex: 'divideMoney1002',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        },
        {
          title: '每月提成',
          dataIndex: 'monthCommission1002',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        }
      ]
    },
    {
      title: ()=>(
        <>
          <div>十二个月套餐(12)</div>
          <div>21600 元</div>
        </>
      ),
      align: 'center',
      children: [
        {
          title: '提成金额',
          dataIndex: 'divideMoney1003',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        },
        {
          title: '每月提成',
          dataIndex: 'monthCommission1003',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        }
      ]
    },
  ]

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        pagination={false}
        search={false}
        headerTitle='运营商套餐费_氢原子设备租赁套餐管理费对各个角色分成'
        params={{type: 'manageFee'}}
        request={getCommissionConfig}
        postData={(v: any)=>{
          setLeaseEndDay(v.leaseEndDay)
          return v.list
        }}
        toolBarRender={() => [
          <span>交易款金额：套餐费</span>
        ]}
      />
      <div>说明：必须提前{leaseEndDay}天续费。若到期限没有续费也不申请退租者，收回设备并追究赔偿金9000元。</div>
    </>
  )
}

export default PackageManagementFee