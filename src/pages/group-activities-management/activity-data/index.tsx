import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type { GroupDataItem } from '../data'

import { togetherGroupData } from '@/services/group-activities-management/activity-data'
import { amountTransform } from '@/utils/utils'

const GroupData: FC = () => {

  const columns: ProColumns<GroupDataItem>[] = [
    {
      title: '活动ID',
      dataIndex: 'acivtyId',
      align: 'center'
    },
    {
      title: '活动时间',
      dataIndex: 'activityTime',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => (
        <pre>{r.activityTime}</pre>
      )
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      align: 'center',
      width: '20%'
    },
    {
      title: '开团人数',
      dataIndex: 'openGroupUsersNum',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '参团人数',
      dataIndex: 'togetherGroupUsersNum',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '拼团订单数',
      dataIndex: 'togetherGroupOrderNums',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成团订单数',
      dataIndex: 'successGroupNums',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成团失败订单数',
      dataIndex: 'failesGroupNums',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '成交金额',
      dataIndex: 'payAmpout',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => amountTransform(r.payAmpout, '/')
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='acivtyId'
        columns={columns}
        request={togetherGroupData}
        params={{}}
        pagination={{
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
