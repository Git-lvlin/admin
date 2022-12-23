import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { cityAgencyStatDataOther } from '@/services/data-board/city-office-data'
import Cascader from '@/components/address-cascader'

const OtherData = () => {

  const columns: ProColumns[] = [
    {
      title: '市办事处名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '地区范围',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <Cascader changeOnSelect/>
    },
    {
      title: '统计时间范围',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '社区店旧集约采购单金额',
      dataIndex: 'totalWholesaleOrder',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '社区店旧集约采购单收益',
      dataIndex: 'totalWholesaleOrderpay',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '生活馆服务费订单金额',
      dataIndex: 'totalStorePayamount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '生活馆服务费订单收益',
      dataIndex: 'totalStoreIncome',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '氢原子启动费金额',
      dataIndex: 'totalIotOrderAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '氢原子启动费收益',
      dataIndex: 'totalIotScanAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '氢原子启动费次数',
      dataIndex: 'startSum',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '次'
    },
    {
      title: '指定商品订单金额',
      dataIndex: 'specialPayamount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '指定商品订单收益',
      dataIndex: 'specialIncome',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      pagination={{
        pageSize: 10,
        showQuickJumper: true
      }}
      params={{}}
      request={cityAgencyStatDataOther}
      options={false}
      search={{
        labelWidth: 100,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default OtherData