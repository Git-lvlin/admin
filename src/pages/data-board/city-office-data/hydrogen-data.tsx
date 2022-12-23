import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { cityAgencyStatDataQing } from '@/services/data-board/city-office-data'
import Cascader from '@/components/address-cascader'

const HydrogenData = () => {

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
      title: '租赁租金单金额',
      dataIndex: 'hydrogenRent',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '租赁租金单收益',
      dataIndex: 'hydrogenRentProfit',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '全款购买氢原子单金额',
      dataIndex: 'hydrogen',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '全款购买氢原子单收益',
      dataIndex: 'hydrogenProfit',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '运营商培训服务费',
      dataIndex: 'operatorEquipment',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '运营商培训服务费收益',
      dataIndex: 'operatorEquipmentProfit',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '托管租金单金额',
      dataIndex: 'hydrogenAgentRent',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '托管租金单收益',
      dataIndex: 'hydrogenAgentRentProfit',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '托管购买单金额',
      dataIndex: 'hydrogenAgent',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '托管购买单收益',
      dataIndex: 'hydrogenAgentProfit',
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
      request={cityAgencyStatDataQing}
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

export default HydrogenData