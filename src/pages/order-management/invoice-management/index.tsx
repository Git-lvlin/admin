import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { useLocation } from 'umi';
import { getInvoiceList } from "@/services/order-management/invoice-management"
import { amountTransform } from '@/utils/utils'
import { Button } from "antd"
import moment from "moment"

import Detail from '../normal-order/detail';
import IntensiveDetail from '../intensive-order/supplier-order/detail';
import NewShopkeeperOrderDetail from '@/pages/financial-management/common-popup/newShopkeeperOrderDetail'
import CheckBillingInformation from './check-billing-information'
import RefuseInvoice from './refuse-invoice'
import CheckTheInvoice from './check-the-invoice'
import ConfirmPayment from './confirm-payment'
import UploadTheInvoice from './upload-the-invoice'
import CancellationOfInvoice from './cancellation-of-invoice'
import ModifyBillingInformation from './modify-billing-information'

export default function GenerationManagement () {
  const [refusevisible, setRefuseVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const location = useLocation();
  const isPurchase = useLocation().pathname.includes('purchase')
  const isDocumentary = location.pathname.includes('documentary')
  const [checkVisible, setCheckVisible] = useState<boolean>(false)
  const [lookVisible, setLookVisible] = useState<boolean>(false)
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [uploadVisible, setUploadVisible] = useState<boolean>(false)
  const [cancellVisible, setCancellVisible] = useState<boolean>(false)
  const [modifyVisible, setModifyVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<string>()
  const form = useRef<FormInstance>()

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
      dataIndex: 'invoiceStatusStr',
      align: 'center',
      render: (_,data)=>{
        if(data?.invoiceStatus==2){
          return <>
                  <p style={{color:'red'}}>{_}</p>
                  <p>{data?.editInfo?.cancelRemark}</p>
                </>   
        }if(data?.invoiceStatus==3){
          return <span>{_}（{data?.editInfo?.rejectRemark}）</span>
        }
        else{
          return _
        }
           
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
      {detailVisible&&msgDetail?.orderType!=5 &&msgDetail?.orderType!=30 &&
        <Detail
          orderSn={msgDetail?.orderNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
          isPurchase={isPurchase}
        />
      }
      {detailVisible&&msgDetail?.orderType==5 &&
        <IntensiveDetail
          id={msgDetail?.orderNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
          isPurchase={isPurchase}
          skuId={msgDetail?.goodsInfo[0]?.skuId}
          isDocumentary={isDocumentary}
        />
      }
      {detailVisible&&msgDetail?.orderType==30 &&
        <NewShopkeeperOrderDetail
          id={msgDetail?.orderNo}
          orderType={30}
          visible={detailVisible}
          setVisible={setDetailVisible}
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
