import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'

import type { ProColumns } from '@ant-design/pro-table'

import { coursesPage } from "@/services/product-performance-management/AED-program-performance"
import { amountTransform } from '@/utils/utils'

const Performance = () => {

  const columns: ProColumns[] = [
    {
      title: '下单人手机号',
      dataIndex: 'buyerMobile',
      align: 'center',
    },
    {
      title: '下单人用户ID',
      dataIndex: 'buyerId',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '支付时段',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(parseInt(r.orderAmount), '/')
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        2: '待发货',
        3: '已发货',
        4: '已完成'
      },
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: 'num',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'directMobile',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: 'aedLeaderPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      valueType: 'select',
      valueEnum: {
        0: '未学习',
        1: '已学习'
      },
      hideInTable: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      valueType: 'select',
      valueEnum: {
        0: '未考试',
        1: '已通过'
      },
      hideInTable: true
    },
    {
      title: '签线上合同状态',
      dataIndex: 'signStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'signStatus',
      valueType: 'select',
      valueEnum: {
        0: '未签订',
        1: '已签订'
      },
      hideInTable: true
    },
    {
      title: '线下培训状态',
      dataIndex: 'trainStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '线下培训',
      dataIndex: 'trainStatus',
      valueType: 'select',
      valueEnum: {
        0: '未录入',
        1: '已培训',
        2: '未培训'
      },
      hideInTable: true
    },
    {
      title: '结算状态',
      dataIndex: 'settleStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司',
      dataIndex: 'subType',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '没有所属子公司',
        1: '已有所属子公司'
      }
    }
  ]

  return (
    <ProTable 
      columns={columns}
      params={{}}
      request={coursesPage}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 100,
        optionRender: (search, props, dom) => [
          ...dom.reverse()
        ]
      }}
      scroll={{x: 'max-content'}}
    />
  )
}

export default Performance