import { useState } from "react"
import ProTable from '@/components/pro-table'
import Big from 'big.js'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from "@/components/PageContainer"
import { packageList } from "@/services/hydrogen-atom-trusteeship/management-fee-configuration"
import { amountTransform } from "@/utils/utils"

const ManagementFeeConfiguration: FC = () => {
  const [tip, setTip] = useState<string>()

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '套餐名称',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: '租期(个月)',
      dataIndex: 'period',
      align: 'center'
    },
    {
      title: '售价',
      dataIndex: 'periodAmount',
      align: 'center',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '折合每月管理费',
      dataIndex: 'fee',
      align: 'center',
      render: (_, r) => `${amountTransform(Math.round(+new Big(parseFloat(r.periodAmount)).div(parseFloat(r.period))), '/')}元`
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
      align: 'center',
      width: '30%'
    }
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        search={false}
        options={false}
        pagination={false}
        request={packageList}
        postData={(data: any)=> {
          setTip(data.remark)
          return data.list
        }}
      />
      <div style={{background: '#fff', padding: 20}}>{tip}</div>
    </PageContainer>
  )
}

export default ManagementFeeConfiguration