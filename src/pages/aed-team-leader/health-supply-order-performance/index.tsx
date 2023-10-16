import TimeSelect from '@/components/time-select'
import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DescriptionsProps, MsgDetailProps } from "./data"
import { Descriptions } from 'antd';

import { subCompanyStoreGoodsAdm,subCompanyStoreGoodsAdmSt } from "@/services/aed-team-leader/health-supply-order-performance"
import { amountTransform } from '@/utils/utils'
import StoreInformation from './store-information'
import Export from "@/pages/export-excel/export"
import ExportHistory from "@/pages/export-excel/export-history"
import moment from "moment"

export default function TransactionData () {
  const [type, setType] = useState<number>(0)
  const [storeVisible, setStoreVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<MsgDetailProps>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState<MsgDetailProps>()
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  useEffect(() => {
    const params={
      name:time?.name,
      startTime:time?.dateRange&&time?.dateRange[0],
      endTime:time?.dateRange&&time?.dateRange[1]
    }
    subCompanyStoreGoodsAdmSt(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data?.[0])
      }
    })

  }, [time])

  const getFieldValue = (searchConfig: any) => {
    const { subName, dateRange } = searchConfig.form.getFieldsValue()
    const params = {
      subName: subName,
      startTime: dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
    return params
  }

  const tableColumns: ProColumns[] = [
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
      title: '大健康供应链系统订单业绩',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(_!=0){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true,
    },
    {
      title: '大健康供应链系统订单提成',
      dataIndex: 'commission',
      align: 'center',
      render: (_,data)=>{
        if(_!=0){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
        }else{
          return '0'
        }
      },
      hideInSearch: true
    },
    {
      title: '大健康供应链系统订单提成 - 扣通道费后',
      dataIndex: 'trueCommission',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        return amountTransform(_,'/').toFixed(2)
      },
    },
  ]

  return (
    <PageContainer title={false}>

      <ProTable
        rowKey="subId"
        headerTitle='列表'
        columns={tableColumns}
        request={subCompanyStoreGoodsAdm}
        columnEmptyText={false}
        actionRef={form}
        tableExtraRender={() => 
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="总交易业绩（元）">{amountTransform(detailList?.payAmount,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="总提成">{amountTransform(detailList?.commission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="大健康供应链系统订单提成 - 扣通道费后">{amountTransform(detailList?.trueCommission,'/').toFixed(2)}  </Descriptions.Item>
          </Descriptions>
        }
        onSubmit={(val:MsgDetailProps)=>{
          setTime({
            name: val?.name,
            dateRange: val?.dateRange,
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
              type={'subCompanyStoreGoodsAdm'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='subCompanyStoreGoodsAdm'/>,
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
    </PageContainer>
  )
}
