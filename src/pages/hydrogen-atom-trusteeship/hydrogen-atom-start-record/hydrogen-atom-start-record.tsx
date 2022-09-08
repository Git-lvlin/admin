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
      title: '机器ID',
      dataIndex: 'memberId',
      align: 'center',
    },
    {
      title: '机器交易类型',
      dataIndex: 'icon',
      align: 'center',
      hideInTable: true,
      valueEnum:{
        1: '托管购买',
        2: '家用购买',
        3: '全款购买',
        4: '租赁购买',
      }
    },
    {
      title: '机器交易类型',
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'nickName',
      align: 'center',
    },
    {
      title: '启动费金额',
      dataIndex: 'userType',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单编号',
      dataIndex: 'payImeiSum',
      align: 'center',
      render: (_, r)=> {
        return <a onClick={()=>{ setDetailVisible(true); setMemberId(r.memberId);}}>{_}</a>
      }
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
