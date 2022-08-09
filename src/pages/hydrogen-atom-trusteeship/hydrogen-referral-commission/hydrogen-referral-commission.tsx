import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"

import { findMemberDeviceTotal, findMemberDevicePage } from "@/services/hydrogen-atom-management/transaction-data"
import Detail from './detail';
import { amountTransform } from "@/utils/utils"

export default function TransactionData () {
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [type, setType] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>()
  const [memberPhone, setMemberPhone] = useState<string>()
  const ref = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '推荐人手机',
      dataIndex: 'memberId',
      align: 'center',
    },
    {
      title: '总提成金额（元）',
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '总业绩金额（元）',
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '推荐人是否店主',
      dataIndex: 'nickName',
      align: 'center',
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
    },
    {
      title: '推荐人是否VIP',
      dataIndex: 'userType',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
    },
    {
      title: '推荐人店铺名称',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '推荐人社区店ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      align: 'center',
      render: (_, r)=> {
        return <a onClick={()=>{ setDetailVisible(true); setMemberId(r.memberId);}}>查看明细</a>
      },
      hideInSearch: true,
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="memberId"
        columns={columns}
        request={findMemberDevicePage}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
      {
        detailVisible &&
        <Detail
          id={memberId}
          visible={detailVisible}
          setVisible={setDetailVisible}
          onClose={()=>{ref.current?.reload();setMemberId(null)}}
        />
      }
    </PageContainer>
  )
}
