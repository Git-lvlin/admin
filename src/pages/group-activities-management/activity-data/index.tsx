import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type { GroupDataItem } from '../data'


const GroupData: FC = () => {

  const columns: ProColumns<GroupDataItem>[] = [
    {
      title: '活动ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '活动时间',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '活动名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '开团人数',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '参团人数',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '拼团订单数',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成团订单数',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成团失败订单数',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成交金额',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
        // request={}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolBarRender={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ]
        }}
      />
    </PageContainer>
  )
}


export default GroupData
