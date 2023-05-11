import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { AEDOrderPm,AEDOrderPmStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
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
      title: '排名',
      dataIndex: 'sort',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: 'phone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号码'
      },
    },
    {
      title: '团长用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '团长用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '团长姓名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长类型',
      dataIndex: 'typeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属子公司ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '所属子公司名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '业绩单数',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长业绩(元)',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长提成(元)',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        columns={tableColumns}
        request={AEDOrderPm}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="团长数">{detailList?.totalPayAmount} 名</Descriptions.Item>
            <Descriptions.Item  label="所属子公司数">{detailList?.totalPayAmount} 家</Descriptions.Item>
            <Descriptions.Item  label="业绩单数">{detailList?.totalPayAmount} 单</Descriptions.Item>
            <Descriptions.Item  label="团长业绩">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="团长提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
          </Descriptions>
        }
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
    </PageContainer>
  )
}
