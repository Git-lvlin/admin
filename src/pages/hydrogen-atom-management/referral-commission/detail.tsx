import { useRef } from "react"
import { Drawer } from "antd"
import ProTable from "@ant-design/pro-table"

import type { DetailProps } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import { queryStatisticsCommissionListSub } from "@/services/hydrogen-atom-management/referral-commission"
import { amountTransform } from "@/utils/utils"
import Export from "@/components/export"

const Detail = (props: DetailProps) => {
  const { visible, setVisible, data } = props

  const form = useRef<FormInstance>()

  const totalColumns: ProColumns[] = [
    {
      title: '推荐人',
      dataIndex: 'pMobile',
      align: 'center'
    },
    {
      title: '总提成(元)',
      dataIndex: 'totalAccount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '直购提成(元)',
      dataIndex: 'buyAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '管理费提成(元)',
      dataIndex: 'rentAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '总业绩(元)',
      dataIndex: 'orderAmountTotal',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '直购业绩(元)',
      dataIndex: 'buyOrderAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '管理费业绩(元)',
      dataIndex: 'rentOrderAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '总提成人数',
      dataIndex: 'totalUser',
      align: 'center'
    },
    {
      title: '直购人数',
      dataIndex: 'buyCount',
      align: 'center'
    },
    {
      title: '租赁人数',
      dataIndex: 'rentCount',
      align: 'center'
    },
  ]

  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '被推荐人手机',
      dataIndex: 'buyMobile',
      align: 'center'
    },
    {
      title: '佣金类型',
      dataIndex: 'inviteType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '管理佣金',
        1: '服务佣金'
      }
    },
    {
      title: '提成金额(元)',
      dataIndex: 'amount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true,
    },
    {
      title: '订单业绩金额(元)',
      dataIndex: 'orderAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true,
    },
    {
      title: '交易类型',
      dataIndex: 'commissionType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '销售',
        2: '管理费'
      }
    },
    {
      title: '支付编号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '是否店主（推荐人）',
      dataIndex: 'userType',
      align: 'center',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        0: '否',
        1: '是'
      },
    },
    {
      title: '是否vip（推荐人）',
      dataIndex: 'vip',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
    },
    {
      title: '店铺名称（推荐人）',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店ID（推荐人）',
      dataIndex: 'storeId',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <Drawer
      title='详情'
      width={1200}
      visible={visible}
      onClose={()=> setVisible(false)}
    >
      <ProTable
        rowKey='pMobile'
        columns={totalColumns}
        dataSource={[data]}
        pagination={false}
        search={false}
        options={false}
      />
      <ProTable
        rowKey='id'
        columns={columns}
        params={{pMemId: data?.pMemId}}
        request={queryStatisticsCommissionListSub}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        postData={(v)=> {
          return v.map((res, idx)=> ({
            ...res,
            id: idx
          }))
        }}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              key='export'
              type="queryMyCommissionSubListExport"
              conditions={{pMemId: data?.pMemId, ...form.current?.getFieldsValue()}}
            />
          ]
        }}
        options={false}
      />
    </Drawer>
  )
}

export default Detail
