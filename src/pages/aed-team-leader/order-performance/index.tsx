import TimeSelect from '@/components/time-select'
import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps, Refer } from "./data"
import { Descriptions } from 'antd';

import { AEDOrderPm, AEDOrderPmStats, scrSubOrderPm, scrSubOrderPmStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"
import ProCard from "@ant-design/pro-card"
import EarlyScreeningCommission from './early-screening-commission'

const OrderPerformance= (props) => {
  const { activeKey } = props
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<Refer>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  useEffect(() => {
    const params={
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1],
      ...time
    }
    const api=activeKey=='1'?AEDOrderPmStats:scrSubOrderPmStats
    api(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      dataIndex:'agencyId',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      align: 'center',
      order: 4,
      fieldProps:{
        placeholder:'请输入子公司名称'
      },
    },
    {
      title: '交易分账时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'totalPayAmount',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0&&activeKey=='1'){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else if(activeKey=='2'){
          return _
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '提成（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0&&activeKey=='1'){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else if(activeKey=='2'){
          return _
        }else{
          return '0'
        }
      },
      hideInSearch: true
    },
    {
      title: '已解冻提成(元)【含通道费】',
      dataIndex: 'unFreezeAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '未解冻提成(元)【含通道费】',
      dataIndex: 'freezeAmountDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  const getFieldValue = (searchConfig: any) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
    <>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.totalPayAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable<TableProps>
        rowKey="businessDeptId"
        headerTitle='列表'
        columns={tableColumns}
        request={activeKey=='1'?AEDOrderPm:scrSubOrderPm}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime({
            name: val.name,
            dateRange: val.dateRange,
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
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={activeKey=='1'?'AEDOrder':'scrSubOrderPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={activeKey=='1'?'AEDOrder':'scrSubOrderPm'}/>
          ],
        }}
      />
      {
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          type={type}
        />
      }
    </>
  )
}


const EarlyScreenSpecifiedEarnings= () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)


  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'agencyId',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司名称',
      dataIndex: 'name',
      align: 'center',
      fieldProps:{
        placeholder:'请输入子公司名称'
      },
      hideInSearch: true
    },
    {
      title: '子订单号',
      dataIndex: 'name',
      align: 'center',
      order: 1,
      hideInTable: true
    },
    {
      title: '订单分账时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true,
      order: 2,
    },
    {
      title: '提成（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return <a onClick={()=>{setVisible(true);setMsgDetail(data);}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true
    },
    {
      title: '已解冻提成(元)【含通道费】',
      dataIndex: 'unFreezeAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '未解冻提成(元)【含通道费】',
      dataIndex: 'freezeAmountDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  const getFieldValue = (searchConfig: any) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
    <>
      <ProTable
        rowKey="businessDeptId"
        columns={tableColumns}
        request={scrSubOrderPm}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'AEDOrder'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'scrSubOrderPm'}/>
          ],
        }}
      />
      {
        visible&&
        <EarlyScreeningCommission
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
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
              activeKey=='1'&&<OrderPerformance  activeKey={activeKey}/>
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="早筛业绩统计">
            {
              activeKey=='2'&&<OrderPerformance  activeKey={activeKey}/>
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="3" tab="早筛指定收益">
            {
              activeKey=='3'&&<EarlyScreenSpecifiedEarnings/>
            }
          </ProCard.TabPane>
    </ProCard>
  </PageContainer>
  )
}
