import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

const Performance = () => {

  const columns: ProColumns[] = [
    {
      title: '下单人手机号',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '下单人用户ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '支付时段',
      dataIndex: '',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: '',
      valueType: 'select',
      valueEnum: {
        0: '未学习',
        1: '已学习',
        2: '未入录'
      },
      hideInTable: true
    },
    {
      title: '考试状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签线上合同状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '线下培训状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '结算状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <ProTable 
      columns={columns}
      params={{}}
      // request={}
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