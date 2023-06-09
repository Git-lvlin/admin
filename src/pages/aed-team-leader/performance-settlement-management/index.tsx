import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "../../supplier-management/supplier-list/qualification-audit-list/data"
import RangeNumberInput from '@/components/range-number-input'

import { applyPage } from "@/services/aed-team-leader/performance-settlement-management"
import { amountTransform } from '@/utils/utils'
import SettlementPerformance from './settlement-performance'
import RemittanceDrawer from './remittance-drawer'
import SettlementAudit from './settlement-audit'
import SettlementLog from './settlement-log'
import PaymentDocument from './payment-document'
import Export from "@/pages/export-excel/export"
import ExportHistory from "@/pages/export-excel/export-history"
import moment from "moment"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [remittanceVisible, setRemittanceVisible] = useState<boolean>(false)
  const [settlementVisible, setSettlementVisible] = useState<boolean>(false)
  const [recordVisible, setRecordVisible] = useState<boolean>(false)
  const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const tableColumns: ProColumns[] = [
    {
      title: '结算申请单号',
      dataIndex: 'settlementId',
      align: 'center',
    },
    {
      title: '子公司ID',
      dataIndex: 'applyId',
      align: 'center',
    },
    {
      title: '子公司名称',
      dataIndex: 'applyName',
      align: 'center',
      fieldProps:{
        placeholder:'请输入子公司名称'
      },
    },
    {
      title: '业绩金额',
      dataIndex: 'confirmed',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '订单业绩',
      dataIndex: 'confirmedAmount',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return amountTransform(_,'/').toFixed(2)
        }else{
          return '0'
        }
      },
    },
    {
      title: '提成金额',
      dataIndex: 'commissionAmount',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return amountTransform(_,'/').toFixed(2)
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '结算单数',
      dataIndex: 'subOrderCount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'status',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        10: '全部待审核，全部未汇款',
        11: '部分待审核，全部未汇款',
        12: '全部已审核，全部未汇款',
        13: '部分待审核，部分已汇款',
        14: '全部已审核，部分已汇款',
        15: '全部已审核，全部已汇款',
        16: '全部已拒绝',
      }
    },
    {
      title: '结算状态',
      dataIndex: 'settlementStatusDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近审核备注',
      dataIndex: 'auditRemark',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '汇款明细',
      align: 'center',
      hideInSearch: true,
      render: (_,record) => {
        if(record?.lastRemittanceTime){
          return <a onClick={()=>{ setPaymentVisible(true);setMsgDetail(record) }}>查看汇款凭证</a>
        }else{
          return ''
        }
      }
    },
    {
      title: '申请时段',
      dataIndex: 'dateRange',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        style:{
          width: 330
        }
      },
      hideInTable: true
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      hideInSearch: true
    },
    {
      title: '最近审核时间',
      dataIndex: 'auditTime',
      hideInSearch: true
    },
    {
      title: '最近汇款时段',
      dataIndex: 'remittanceDate',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        style:{
          width: 330
        }
      },
      hideInTable: true
    },
    {
      title: '最近汇款时间',
      dataIndex: 'lastRemittanceTime',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width:250,
      render:(text, record, _, action)=>{
        const operateArr=[
          <a key='detail' onClick={()=>{setVisible(true);setMsgDetail(record)}}>查看</a>,
          <a key='record' onClick={()=>{setRecordVisible(true);setMsgDetail(record)}}>日志</a>
        ]
        if(record.settlementStatus>10&&record.settlementStatus<15){
           operateArr.unshift(<a key='remittance' onClick={()=>{setRemittanceVisible(true);setMsgDetail(record)}}>汇款</a>)
        }
        if(record.settlementStatus==10||record.settlementStatus==11||record.settlementStatus==13){
          operateArr.unshift( <a key='settlement' onClick={()=>{setSettlementVisible(true);setMsgDetail(record)}}>结算审核</a>)
        }
        return operateArr
      },
      fixed:'right'
    }, 
  ]

  const getFieldValue = (searchConfig: any) => {
    const { applyName, dateRange, confirmed, remittanceDate, ...rest } = searchConfig.form.getFieldsValue()
    const params = {
      ...rest,
      applyStartTime: dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      applyEndTime: dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      lastRemittanceStart: remittanceDate&&moment(remittanceDate[0]).format('YYYY-MM-DD HH:mm:ss'),
      lastRemittanceEnd: remittanceDate&&moment(remittanceDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      confirmedAmountMin: confirmed&&amountTransform(confirmed.min,'*'),
      confirmedAmountMax: confirmed&&amountTransform(confirmed.max,'*'),
    }
    return params
  }

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="settlementId"
        columns={tableColumns}
        request={applyPage}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        scroll={{ x: 'max-content' }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'invitation-friend-red-packet-detail-export'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='invitation-friend-red-packet-detail-export'/>,
          ],
        }}
      />
      {
        settlementVisible&&
        <SettlementAudit
          visible={settlementVisible}
          setVisible={setSettlementVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        visible&&
        <SettlementPerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        remittanceVisible&&
        <RemittanceDrawer
          visible={remittanceVisible}
          setVisible={setRemittanceVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        recordVisible&&
        <SettlementLog
          visible={recordVisible}
          setVisible={setRecordVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        paymentVisible&&
        <PaymentDocument
          visible={paymentVisible}
          setVisible={setPaymentVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          callback={()=>{ }}
        />
      }
    </PageContainer>
  )
}
