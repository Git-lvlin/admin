import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { AEDRecordSubAmountPage, AEDRecordSubAmountSum, AEDRecordSubCommissionPage, AEDRecordSubCommissionSum } from "@/services/aed-team-leader/three-thousand-eight-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, MsgDetailProps } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };



  export default (props:CumulativeProps)=>{
    const { visible, setVisible,msgDetail,onClose,type} = props;
    const [form] = Form.useForm();
    const [orderSum,setOrderSum]=useState<number>(0)
    const [time,setTime]=useState<MsgDetailProps>()
    const ref = useRef<ActionType>()
    const [visit, setVisit] = useState<boolean>(false)
    const divideName=()=>{
      switch (type) {
        case 1:
          return '业绩明细'
        case 2:
          return '提成明细'
        default:
          return ''
      }
    }
  
    const Columns: ProColumns[] = [
      {
        title: '订单日期',
        dataIndex: 'payTime',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '订单日期',
        dataIndex: 'dateRange',
        valueType: 'dateTimeRange',
        align: 'center',
        hideInTable: true,
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        align: 'center',
      },
      {
        title: '商品主图',
        dataIndex: 'goodsImageUrl',
        valueType: 'image',
        hideInSearch:true,
        hideInTable: type == 2
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        valueType: 'text',
        ellipsis:true,
        hideInSearch:true,
        hideInTable: type == 2
      },
      {
        title: '收货人姓名',
        dataIndex: 'consignee',
        valueType: 'text',
        hideInSearch:true,
        hideInTable: type == 2
      },
      {
        title: '关联保证金订单状态',
        dataIndex: 'orderStatusDesc',
        align: 'center',
        hideInSearch: true,
        hideInTable: type == 2
      },
      {
        title: '下单人手机号',
        dataIndex: 'buyerMobile',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '订单金额',
        dataIndex: 'orderAmount',
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
        dataIndex: 'aedLeaderPhone',
        align: 'center',
        hideInSearch:true,
      },
      {
        title: '收益',
        dataIndex: 'amount',
        align: 'center',
        hideInSearch: true,
        render: (_,data)=>{
          if(_){
            return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
          }else{
            return '-'
          }
        },
        hideInTable: type==1
      },
      {
        title: '扣除通道费后收益',
        dataIndex: 'realAmount',
        align: 'center',
        hideInSearch: true,
        render: (_,data)=>{
          if(_){
            return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
          }else{
            return '-'
          }
        },
        hideInTable: type==1
      },
      {
        title: '订单类型',
        dataIndex: 'orderTypeDesc',
        align: 'center',
        hideInSearch: true,
        hideInTable: type == 1
      },
      // {
      //   title: '签合同状态',
      //   dataIndex: 'signStatus',
      //   align: 'center',
      //   valueType: 'select',
      //   valueEnum:{
      //     1: '已签订',
      //     0: '未签订',
      //   },
      //   fieldProps: {
      //     placeholder: '全部'
      //   },
      //   hideInTable: true
      // },
      {
        title: '签合同状态',
        dataIndex: 'signStatusDesc',
        align: 'center',
        hideInSearch: true
      },
      // {
      //   title: '视频学习状态',
      //   dataIndex: 'learnStatus',
      //   align: 'center',
      //   valueType: 'select',
      //   valueEnum:{
      //     1: '已学习',
      //     0: '未学习',
      //   },
      //   fieldProps: {
      //     placeholder: '全部'
      //   },
      //   hideInTable: true
      // },
      {
        title: '视频学习状态',
        dataIndex: 'learnStatusDesc',
        align: 'center',
        hideInSearch: true
      },
      // {
      //   title: '考试状态',
      //   dataIndex: 'examStatus',
      //   align: 'center',
      //   valueType: 'select',
      //   valueEnum:{
      //     1: '已通过',
      //     2: '未通过',
      //     0: '未考试'
      //   },
      //   fieldProps: {
      //     placeholder: '全部'
      //   },
      //   hideInTable: true
      // },
      {
        title: '考试状态',
        dataIndex: 'examStatusDesc',
        align: 'center',
        hideInSearch: true
      },
      // {
      //   title: '线下培训状态',
      //   dataIndex: 'trainStatus',
      //   align: 'center',
      //   valueType: 'select',
      //   valueEnum:{
      //     0: '未录入',
      //     1: '已培训',
      //     2: '未培训',
      //   },
      //   fieldProps: {
      //     placeholder: '全部'
      //   },
      //   hideInSearch: type == 2,
      //   hideInTable: true
      // },
      {
        title: '线下培训状态',
        dataIndex: 'trainStatusDesc',
        align: 'center',
        hideInSearch: true,
        hideInTable: type == 2
      },
      {
        title: '结算状态',
        dataIndex: 'settlementStatusDesc',
        align: 'center',
        hideInSearch: true,
      },
    ]
    useEffect(()=>{
      const params={
        subId:msgDetail?.subId,
        startTime:time?.dateRange?.[0],
        endTime:time?.dateRange?.[1],
        ...time
      }
      const api=type==1?AEDRecordSubAmountSum:AEDRecordSubCommissionSum
      api(params).then(res=>{
        if(res.code==0){
          type==1? setOrderSum(res?.data?.amountSum):setOrderSum(res?.data?.commissionSum)
        }
      })
    },[time])
  
    const getFieldValue = (searchConfig: any) => {
      const {dateRange,...rest}=searchConfig.form.getFieldsValue()
      return {
        subId:msgDetail?.subId,
        startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest,
      }
    }
    return (
      <DrawerForm
        layout="horizontal"
        title={`AED子公司：${msgDetail?.subName} （${msgDetail?.subMobile}） ${divideName()} （ID:${msgDetail?.subId}）`}
        onVisibleChange={setVisible}
        visible={visible}
        form={form}
        width={1400}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          onClose: () => {
            onClose();
          }
        }}
        submitter={{
          render:()=>{
              return []
          }
        }}
        {...formItemLayout}
        className={styles.store_information}
      >
       <ProTable
        rowKey="date"
        columns={Columns}
        request={type==1?AEDRecordSubAmountPage:AEDRecordSubCommissionPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          subId:msgDetail?.subId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        onSubmit={(val)=>{
          setOrderSum(0)
          setTime(val)
        }}
        onReset={()=>{
          setTime(undefined)
        }}
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={type==1?'export3800AEDSubAmountList':'export3800AEDSubCommissionList'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={type==1?'export3800AEDSubAmountList':'export3800AEDSubCommissionList'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计{type==1?'金额':'收益'}：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
      </DrawerForm >
    )
  }


