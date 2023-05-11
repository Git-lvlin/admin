import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import RangeNumberInput from '@/components/range-number-input'

import { AEDOrderPm,AEDOrderPmStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import SettlementPerformance from './settlement-performance'
import RemittanceDrawer from './remittance-drawer'
import SettlementAudit from './settlement-audit'
import SettlementLog from './settlement-log'

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [remittanceVisible, setRemittanceVisible] = useState<boolean>(false)
  const [settlementVisible, setSettlementVisible] = useState<boolean>(false)
  const [recordVisible, setRecordVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()

  useEffect(() => {
    const params={
      managerPhone:time?.managerPhone,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    AEDOrderPmStats(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '结算单号',
      dataIndex: 'agencyId',
      align: 'center',
    },
    {
      title: '子公司ID',
      dataIndex: 'agencyId',
      align: 'center',
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      align: 'center',
      fieldProps:{
        placeholder:'请输入子公司名称'
      },
    },
    {
      title: '订单类型',
      dataIndex: 'sele',
      align: 'center',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: 'AED培训服务套餐订单'
      }
    },
    {
      title: '订单类型',
      dataIndex: 'sele',
      align: 'center',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: {
        1: 'AED培训服务套餐订单'
      }
    },
    {
      title: '业绩金额',
      dataIndex: 'name',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '订单业绩',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '提成金额',
      dataIndex: 'name',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return amountTransform(_,'/').toFixed(2)
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '结算单数',
      dataIndex: 'sum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'depositOrderStatus',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
    },
    {
      title: '结算状态',
      dataIndex: 'sum',
      align: 'center',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
    },
    {
      title: '最近审核备注',
      dataIndex: 'sum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '汇款明细',
      dataIndex: 'sum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '申请时段',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间']
      },
      hideInTable: true
    },
    {
      title: '申请时间',
      dataIndex: 'dateRange',
      hideInSearch: true
    },
    {
      title: '最近审核时间',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInSearch: true
    },
    {
      title: '汇款时段',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间']
      },
      hideInTable: true
    },
    {
      title: '最近汇款时间',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <a key='remittance' onClick={()=>{setRemittanceVisible(true);setMsgDetail(record)}}>汇款</a>,
        <a key='detail' onClick={()=>{setVisible(true);setMsgDetail(record)}}>查看</a>,
        <a key='settlement' onClick={()=>{setSettlementVisible(true);setMsgDetail(record)}}>结算审核</a>,
        <a key='record' onClick={()=>{setRecordVisible(true);setMsgDetail(record)}}>日志</a>

      ],
    }, 
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        columns={tableColumns}
        request={AEDOrderPm}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime({
            managerPhone: val.managerPhone,
            dateRange: val.dateRange,
          })
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
      {
        settlementVisible&&
        <SettlementAudit
          visible={settlementVisible}
          setVisible={setSettlementVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        visible&&
        <SettlementPerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        remittanceVisible&&
        <RemittanceDrawer
          visible={remittanceVisible}
          setVisible={setRemittanceVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        recordVisible&&
        <SettlementLog
          visible={recordVisible}
          setVisible={setRecordVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
