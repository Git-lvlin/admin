import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { useLocation } from 'umi';
import { getInvoiceList } from "@/services/order-management/invoice-management"
import { amountTransform } from '@/utils/utils'
import { Button } from "antd"
import moment from "moment"

import Detail from '../normal-order/detail';
import CheckBillingInformation from './check-billing-information'
import RefuseInvoice from './refuse-invoice'
import CheckTheInvoice from './check-the-invoice'
import ConfirmPayment from './confirm-payment'
import UploadTheInvoice from './upload-the-invoice'
import CancellationOfInvoice from './cancellation-of-invoice'
import ModifyBillingInformation from './modify-billing-information'

export default function GenerationManagement () {
  const [type, setType] = useState<number>(0)
  const [refusevisible, setRefuseVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const isPurchase = useLocation().pathname.includes('purchase')
  const [checkVisible, setCheckVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [lookVisible, setLookVisible] = useState<boolean>(false)
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [uploadVisible, setUploadVisible] = useState<boolean>(false)
  const [cancellVisible, setCancellVisible] = useState<boolean>(false)
  const [modifyVisible, setModifyVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const form = useRef<FormInstance>()

  useEffect(() => {
    const params={
      agentId:time?.agentId,
      agentName:time?.agentName,
      startTime:time?.createTime&&time?.createTime[0],
      endTime:time?.createTime&&time?.createTime[1]
    }
    // cityAgentManageStats(params).then(res=>{
    //   if(res.code==0){
    //     setDetailList(res.data[0])
    //   }
    // })

  }, [time])

  const tableColumns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '申请人',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeStr',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setDetailVisible(true);setMsgDetail(data)}}>{_}</a>
      },
    },
    {
      title: '商品',
      dataIndex: 'goodsName',
      align: 'center',
      width: 400
    },
    {
      title: '数量',
      dataIndex: 'goodsNum',
      align: 'center',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '订单金额(元)',
      dataIndex: 'orderAmount',
      align: 'center',
      render: (_,data)=>{
          return amountTransform(_,'/').toFixed(2)
      },
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center',
    },
    {
      title: '开票详情',
      dataIndex: 'hydrogenCommission',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{setCheckVisible(true);setMsgDetail(data)}}>查看开票信息</a>
      }
    },
    {
      title: '开票时间',
      dataIndex: 'invoiceTime',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return moment(_*1000).format('YYYY-MM-DD HH:mm:ss')
        }else{
          return '-'
        }
     
      }
    },
    {
      title: '最近操作人',
      dataIndex: 'lastEditor',
      align: 'center',
    },
    {
      title: '最近操作时间',
      dataIndex: 'lastEditTime',
      align: 'center',
    },
    {
      title: '开票状态',
      dataIndex: 'invoiceStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        '-1':'待支付',
        0: '待开票',
        1: '已开票',
        2: '已作废',
        3: '拒绝开票'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      // width: 100,
      fixed: 'right',
      hideInSearch: true,
      render: (_,data)=>([
        <Button type='default' style={{ display:data?.invoiceStatus==0||data?.invoiceStatus==-1?'block':'none' }} onClick={()=>{setRefuseVisible(true);setMsgDetail(data)}} key='edit'>拒绝开票</Button>,
        <Button type='default' style={{ display:data?.invoiceStatus==1||data?.invoiceStatus==2?'block':'none' }} onClick={()=>{setLookVisible(true);setMsgDetail(data)}} key='edit'>查看发票</Button>,
        <Button type='primary' style={{ display:data?.invoiceStatus==-1?'block':'none' }} onClick={()=>{setConfirmVisible(true);setMsgDetail(data)}} key='reset'>确认支付</Button>,
        <Button type='primary' style={{ display:data?.invoiceStatus==0||data?.invoiceStatus==1?'block':'none' }} onClick={()=>{setUploadVisible(true);setMsgDetail(data)}} key='reset'>{data?.invoiceStatus==0?'上传发票':'更新发票'}</Button>,
        <Button type='primary' style={{ display:data?.invoiceStatus==1?'block':'none' }} onClick={()=>{setCancellVisible(true);setMsgDetail(data)}} key='reset'>发票作废</Button>,
        <Button type='primary' style={{ display:data?.invoiceStatus==-1||data?.invoiceStatus==0?'block':'none' }} onClick={()=>{setModifyVisible(true);setMsgDetail(data)}} key='reset'>修改开票信息</Button>
      ]),

    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="id"
        columns={tableColumns}
        request={getInvoiceList}
        columnEmptyText={false}
        actionRef={form}
        onSubmit={(val)=>{
          setTime(val)
        }}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        postData={(data)=>{
          try {
            return data.map(ele=>({...ele,goodsName:ele?.goodsInfo?.[0]?.goodsName}))
          } catch (error) {
            console.log('error',error)
          }
        }}
        options={false}
        search={false}
      />
      {detailVisible &&
        <Detail
          id={msgDetail?.orderNo}
          orderSn={msgDetail?.orderNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
          isPurchase={isPurchase}
        />
      }
      {checkVisible&&
        <CheckBillingInformation
          visible={checkVisible}
          setVisible={setCheckVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {refusevisible&&
        <RefuseInvoice
          visible={refusevisible}
          setVisible={setRefuseVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {lookVisible&&
        <CheckTheInvoice
          visible={lookVisible}
          setVisible={setLookVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {confirmVisible&&
        <ConfirmPayment
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {uploadVisible&&
        <UploadTheInvoice
          visible={uploadVisible}
          setVisible={setUploadVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {cancellVisible&&
        <CancellationOfInvoice
          visible={cancellVisible}
          setVisible={setCancellVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
      {modifyVisible&&
        <ModifyBillingInformation
          visible={modifyVisible}
          setVisible={setModifyVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(null)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
        />
      }
    </PageContainer>
  )
}
