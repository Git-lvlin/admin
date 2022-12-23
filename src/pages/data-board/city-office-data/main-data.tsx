import ProTable from '@ant-design/pro-table'
import { Space, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import type { ProColumns } from '@ant-design/pro-table'

import { cityAgencyStatDataMain } from '@/services/data-board/city-office-data'
import Cascader from '@/components/address-cascader'

const MainData = () => {

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
      title: '最近登录时间',
      dataIndex: 'lastLoginTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '登录次数',
      dataIndex: 'loginNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '覆盖社区店数量',
      dataIndex: 'storeTotal',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '有采购订单的社区店数量',
      dataIndex: 'storeOrderTotal',
      align: 'center',
      hideInSearch: true
    },
    {
      title: ()=> (
        <Space size='small'>
          新集约商品集约率
          <Tooltip title='新集约商品下单的店主数 / 覆盖社区店数量'>
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'storeNeworderTotal',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.storeTotal > 0) {
          return (Number(r.storeNeworderTotal / r.storeTotal) * 100).toFixed(2) + '%'
        } else {
          return Number(0).toFixed(2) + '%'
        }
      }
    },
    {
      title: '新集约商品采购单金额',
      dataIndex: 'sumNeworderPayAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: '新集约商品采购单收益',
      dataIndex: 'sumUserorderPayAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => _ + '元'
    },
    {
      title: ()=> (
        <Space size='small'>
          社区店所有业绩总额
          <Tooltip title='覆盖社区店下的新老集约、社区店服务费、氢原子启动费和指定商品结算5种交易订单业绩'>
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'sumAllorderPayAmount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '总收益额',
      dataIndex: 'sumRealAmount',
      align: 'center',
      hideInSearch: true
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
      request={cityAgencyStatDataMain}
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

export default MainData