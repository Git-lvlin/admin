import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { aedTeamPm,aedTeamPmStats } from "@/services/aed-team-leader/aed-head-performance"
import { amountTransform } from '@/utils/utils'

export default function TransactionData () {
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()

  useEffect(() => {
    const params={
      ...time
    }
    aedTeamPmStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '排名',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: 'managerPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号码'
      },
    },
    {
      title: '团长用户ID',
      dataIndex: 'memberId',
      valueType: 'text',
    },
    {
      title: '团长姓名',
      dataIndex: 'manager',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司类型',
      dataIndex: 'type',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '子公司',
        2: '非子公司'
      }
    },
    {
      title: '所属子公司类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属子公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '子公司名称',
      dataIndex: 'subName',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '业绩单数',
      dataIndex: 'orderNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长业绩(元)',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '团长提成(元)',
      dataIndex: 'commission',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="id"
        columns={tableColumns}
        request={aedTeamPm}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="团长数">{detailList?.teamNum} 名</Descriptions.Item>
            <Descriptions.Item  label="所属子公司数">{detailList?.subNum} 家</Descriptions.Item>
            <Descriptions.Item  label="业绩单数">{detailList?.orderNum} 单</Descriptions.Item>
            <Descriptions.Item  label="团长业绩">{amountTransform(detailList?.payAmount,'/').toFixed(2)}  元</Descriptions.Item>
            <Descriptions.Item  label="团长提成">{amountTransform(detailList?.commission,'/').toFixed(2)}  元</Descriptions.Item>
          </Descriptions>
        }
        onSubmit={(val)=>{
          setTime({
            memberId: val.memberId,
            managerPhone: val.managerPhone,
            subId: val.subId,
            subName: val.subName,
            type: val.type,
          })
        }}
        onReset={()=>{
          setTime(undefined)
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
      />
    </PageContainer>
  )
}
