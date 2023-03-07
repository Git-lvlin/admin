import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from "@/components/PageContainer"
import { getConfig } from '@/services/health-gift-package-activities/divide-configure'

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
      title: '199.00',
      align: 'center',
      children: [
        {
          title: '分成百分比',
          dataIndex: 'ratioDesc',
          align: 'center'
        }
      ]
    },
    {
      title: '890.00',
      align: 'center',
      children: [
        {
          title: '分成百分比',
          dataIndex: 'ratioDesc',
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
        headerTitle='礼包交易_对各个角色分成'
        request={getConfig}
      />
    </PageContainer>
  )
}

export default DivideConfigure