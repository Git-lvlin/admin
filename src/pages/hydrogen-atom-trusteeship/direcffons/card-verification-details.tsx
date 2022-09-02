import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"


const CardVerificationDetails = () => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '使用者手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '使用时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '使用时间',
      dataIndex: '',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '健康卡支付金额',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '健康卡消费码',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '健康卡卡号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '投资人手机号',
      dataIndex: '',
      align: 'center'
    },
  ]

  return (
    <ProTable
      rowKey=''
      columns={columns}
      params={{}}
      // request={}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default CardVerificationDetails
