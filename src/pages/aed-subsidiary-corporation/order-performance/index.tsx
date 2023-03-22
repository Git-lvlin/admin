import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Detail } from "./data"
import { Descriptions } from 'antd';

import { listPage,cityBusinessDeptSum } from "@/services/city-office-management/city-office-achievements"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<Detail>({cityBusinessDeptId: '',cityBusinessDeptName: ''})
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<TableProps>()
  const form = useRef<ActionType>()

  useEffect(() => {
    const params={
      cityBusinessDeptId:time?.cityBusinessDeptId,
      cityBusinessDeptName:time?.cityBusinessDeptName,
      begin:time?.createTime&&time?.createTime[0],
      end:time?.createTime&&time?.createTime[1]
    }
    cityBusinessDeptSum(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: 'ID',
      dataIndex: 'cityBusinessDeptId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司手机号',
      dataIndex: 'managerPhone',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入子公司手机号码'
      },
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'totalTradeCommission',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>

      },
      hideInSearch: true,
    },
    {
      title: '启动费提成（元）',
      dataIndex: 'totalBootCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(6)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return _
        }

      },
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.totalTradeCommission,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        headerTitle='列表'
        columns={tableColumns}
        request={listPage}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime(val)
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
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail('')}}
          type={type}
        />
      }
      {
        visible&&
        <CumulativePerformance
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail('')}}
          type={type}
        />
      }
    </PageContainer>
  )
}
