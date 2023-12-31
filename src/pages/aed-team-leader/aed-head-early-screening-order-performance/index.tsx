import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';

import { scrTeamPm,scrTeamPmStats } from "@/services/aed-team-leader/aed-head-early-screening-order-performance"
import { aedTeamPm,aedTeamPmStats } from "@/services/aed-team-leader/aed-head-performance"
import { amountTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ProCard from "@ant-design/pro-card"

const AedHeadPerformance = () => {
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<TableProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

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

  const getFieldValue = (searchConfig: any) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }

  const tableColumns: ProColumns[] = [
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
      title: '合作公司类型',
      dataIndex: 'type',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '合作公司',
        2: '非合作公司'
      }
    },
    {
      title: '所属合作公司类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合作公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属合作公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '合作公司名称',
      dataIndex: 'subName',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属合作公司名称',
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
    <>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={aedTeamPm}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="团长数">{detailList?.teamNum} 名</Descriptions.Item>
            <Descriptions.Item  label="所属合作公司数">{detailList?.subNum} 家</Descriptions.Item>
            <Descriptions.Item  label="业绩单数">{detailList?.orderNum} 单</Descriptions.Item>
            <Descriptions.Item  label="团长业绩">{amountTransform(detailList?.payAmount,'/').toFixed(2)}  元</Descriptions.Item>
            <Descriptions.Item  label="团长提成">{amountTransform(detailList?.commission,'/').toFixed(2)}  元</Descriptions.Item>
          </Descriptions>
        }
        onSubmit={(val:TableProps)=>{
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
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'aedTeamPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'aedTeamPm'}/>
          ],
        }}
      />
    </>
  )
}

const AedHeadEarlyScreeningOrderPerformance = () => {
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<TableProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  useEffect(() => {
    const params={
      ...time
    }
    scrTeamPmStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const getFieldValue = (searchConfig: any) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }

  const tableColumns: ProColumns[] = [
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
      title: '合作公司类型',
      dataIndex: 'type',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '合作公司',
        2: '非合作公司'
      }
    },
    {
      title: '所属合作公司类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合作公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属合作公司ID',
      dataIndex: 'subId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '合作公司名称',
      dataIndex: 'subName',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属合作公司名称',
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
    <>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={scrTeamPm}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="团长数">{detailList?.teamNum} 名</Descriptions.Item>
            <Descriptions.Item  label="所属合作公司数">{detailList?.subNum} 家</Descriptions.Item>
            <Descriptions.Item  label="业绩单数">{detailList?.orderNum} 单</Descriptions.Item>
            <Descriptions.Item  label="团长业绩">{amountTransform(detailList?.payAmount,'/').toFixed(2)}  元</Descriptions.Item>
            <Descriptions.Item  label="团长提成">{amountTransform(detailList?.commission,'/').toFixed(2)}  元</Descriptions.Item>
          </Descriptions>
        }
        onSubmit={(val:TableProps)=>{
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
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'scrTeamPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'scrTeamPm'}/>
          ],
        }}
      />
    </>
  )
}


export default ()=>{
  const [activeKey, setActiveKey] = useState<string>('1')
  return (
    <PageContainer title={false}>
      <ProCard
          tabs={{
            type: 'card',
            activeKey,
            onChange: setActiveKey
          }}
        >
          <ProCard.TabPane key="1" tab="课程业绩">
            {
              activeKey=='1'&&<AedHeadPerformance/>
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="早筛业绩统计">
            {
              activeKey=='2'&&<AedHeadEarlyScreeningOrderPerformance/>
            }
          </ProCard.TabPane>
    </ProCard>
  </PageContainer>
  )
}