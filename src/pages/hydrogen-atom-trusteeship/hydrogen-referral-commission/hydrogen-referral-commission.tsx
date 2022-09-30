import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { queryMemberPromotionPage } from "@/services/hydrogen-atom-trusteeship/hydrogen-referral-commission"
import Detail from './detail';
import { amountTransform } from "@/utils/utils"


export default function TransactionData () {
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [phoneId, setPhoneId] = useState<string>()
  const ref = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '推荐人手机',
      dataIndex: 'phoneNumber',
      align: 'center',
    },
    {
      title: '总提成金额（元）',
      dataIndex: 'commissionAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '总业绩金额（元）',
      dataIndex: 'achievementAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    // {
    //   title: '推荐人是否店主',
    //   dataIndex: 'store',
    //   align: 'center',
    //   valueEnum: {
    //     false: '否',
    //     true: '是'
    //   },
    //   hideInSearch: true,
    // },
    // {
    //   title: '推荐人是否VIP',
    //   dataIndex: 'vipStore',
    //   align: 'center',
    //   valueEnum: {
    //     false: '否',
    //     true: '是'
    //   },
    //   hideInSearch: true,
    // },
    {
      title: '推荐人店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '推荐人店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '推荐人社区店ID',
      dataIndex: 'storeNo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      align: 'center',
      render: (_, r)=> {
        return <a onClick={()=>{ setDetailVisible(true); setPhoneId(r.phoneNumber);}}>查看明细</a>
      },
      hideInSearch: true,
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="memberId"
        columns={columns}
        request={queryMemberPromotionPage}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
          ]
        }}
      />
      {
        detailVisible &&
        <Detail
          phone={phoneId}
          visible={detailVisible}
          setVisible={setDetailVisible}
          onClose={()=>{ref.current?.reload();setPhoneId(null)}}
        />
      }
    </PageContainer>
  )
}
