import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
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
        renderFormItem: () => <TimeSelect />,
        align: 'center',
        hideInTable: true,
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        valueType: 'text',
        ellipsis:true,
        hideInSearch:true,
        // hideInTable: type == 2
      },
      {
        title: '下单人手机号',
        dataIndex: 'buyerMobile',
        align: 'center',
        hideInSearch: true
      },
      {
        title: 'skuID',
        dataIndex: 'skuId',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        align: 'center',
      },
      {
        title: '门店所在地',
        dataIndex: 'consignee',
        valueType: 'text',
        hideInSearch:true,
        // hideInTable: type == 2
      },
      {
        title: '订单类型',
        dataIndex: 'orderTypeDesc',
        align: 'center',
        hideInSearch: true,
        // hideInTable: type == 2
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
        // hideInTable: type==2
      },
      {
        title: '业绩范围',
        dataIndex: 'settleStatusDesc',
        align: 'center',
        hideInSearch: true,
        // hideInTable: type == 2
      },
    ]
    useEffect(()=>{
      const params={
        agencyId:msgDetail?.agencyId,
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
        agencyId:msgDetail?.agencyId,
        startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest,
      }
    }
    return (
      <DrawerForm
        layout="horizontal"
        title={`${msgDetail?.name}  ${type == 1?'大健康供应链系统订单业绩':'大健康供应链系统订单提成'} （ID:${msgDetail?.agencyId}）`}
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
          agencyId:msgDetail?.agencyId,
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


