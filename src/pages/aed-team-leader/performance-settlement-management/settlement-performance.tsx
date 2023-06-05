import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { applySubPage, applyDetail } from "@/services/aed-team-leader/performance-settlement-management"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, Refer, Statistics } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import { Descriptions } from 'antd';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()
  const [detailList,setDetailList]=useState<Statistics>()
  useEffect(() => {
    const params={
      settlementId: msgDetail?.settlementId,
    }
    applyDetail(params).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [])

  const Columns: ProColumns[] = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单用户ID',
      dataIndex: 'memberId',
      valueType: 'text',
    },
    {
      title: '下单人用户手机',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '分账金额',
      dataIndex: 'amount',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '通道费金额',
      dataIndex: 'fee',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '提成金额',
      dataIndex: 'unfreezeAmount',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '团长手机号',
      dataIndex: 'teamLeaderPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号'
      },
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '收货人姓名',
      dataIndex: 'consignee',
      valueType: 'text',
    },
    {
      title: '订单时间',
      dataIndex: 'dateRange',
      valueType: 'dateTimeRange',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间', '结束时间'],
      }
    },
    {
      title: '订单时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '汇款时间',
      valueType: 'dateTimeRange',
      dataIndex: 'remittanceTime',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间', '结束时间'],
      }
    },
    {
      title: '汇款时间',
      dataIndex: 'remittanceTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true
    },
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算业绩</strong>
        <p style={{ color:'#8D8D8D' }}>子公司ID：{msgDetail?.applyId}    子公司名称：{msgDetail?.applyName}    结算申请单号：{msgDetail?.settlementId}    结算状态：{msgDetail?.settlementStatusDesc}    订单类型：{msgDetail?.orderTypeDesc}   申请时间：{msgDetail?.applyTime} </p>
      </>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1500}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: ({ form }) => {
          return []
        }
      }}
      {...formItemLayout}
      className={styles.settlement_performance}
    >
      <Descriptions labelStyle={{fontWeight:'bold',width: '13%'}} style={{background:'#fff'}} column={{ xl: 3, xxl: 5 }} layout="horizontal" bordered>
        <Descriptions.Item  label="总业绩订单数(单)">{detailList?.subOrderCount}</Descriptions.Item>
        <Descriptions.Item  label="待审核订单数(单)">{detailList?.statsCount10}  </Descriptions.Item>
        <Descriptions.Item  label="待汇款订单数(单)">{detailList?.statsCount11}  </Descriptions.Item>
        <Descriptions.Item  label="已汇款订单数(单)">{detailList?.statsCount21}  </Descriptions.Item>
        <Descriptions.Item  label="拒绝订单数(单)">{detailList?.statsCount12}  </Descriptions.Item>
        <Descriptions.Item  label="总业绩订单金额(元)">{amountTransform(detailList?.statsConfirmedAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总业绩分账金额(元)">{amountTransform(detailList?.statsAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总扣通道费金额(元)">{amountTransform(detailList?.statsFee,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总提成金额(元)">{amountTransform(detailList?.statsCommissionAmount,'/').toFixed(2)}  </Descriptions.Item>
        <Descriptions.Item  label="总实际已汇款金额(元)">{amountTransform(detailList?.statsRemitAmount,'/').toFixed(2)}  </Descriptions.Item>
      </Descriptions>
      <ProTable
        rowKey="divideItemId"
        columns={Columns}
        request={applySubPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          settlementId:msgDetail?.settlementId,
        }}
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        postData={(data)=>{
          return data.records
        }}
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
      />
    </DrawerForm >
  )
}
