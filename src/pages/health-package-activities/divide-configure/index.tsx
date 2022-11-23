import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from "@/components/PageContainer"
import { getConfig } from '@/services/health-package-activities/divide-configure'
import { amountTransform } from '@/utils/utils'


const DivideConfigure: FC = () => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'roleDesc',
      align: 'center'
    },
    {
      title: '说明',
      dataIndex: 'desc',
      align: 'center',
      width: '30%'
    },
    {
      title: '490.00',
      align: 'center',
      children: [
        {
          title: '分成金额(元)',
          dataIndex: 'firstPackageAmount',
          align: 'center',
          render: (_) => amountTransform(_, '/')
        },
        {
          title: '分成百分比',
          dataIndex: 'firstPackageRatio',
          align: 'center'
        }
      ]
    },
    {
      title: '3900.00',
      align: 'center',
      children: [
        {
          title: '分成金额(元)',
          dataIndex: 'secondPackageAmount',
          render: (_) => amountTransform(_, '/'),
          align: 'center'
        },
        {
          title: '分成百分比',
          dataIndex: 'secondPackageRatio',
          align: 'center'
        }
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='roleDesc'
        columns={columns}
        search={false}
        options={false}
        pagination={false}
        params={{}}
        headerTitle='套餐交易_对各个角色分成'
        request={getConfig}
      />
    </PageContainer>
  )
}

export default DivideConfigure