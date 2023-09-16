import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { cityAgentHealthyGiftOrder,cityAgentHealthyGiftOrderStats } from "@/services/hydrogen-atom-generation/health-package-order-performance"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import styles from './styles.less'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,scope} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState({})
  const ref = useRef()
  const [visit, setVisit] = useState<boolean>(false)

  const Columns: ProColumns<GithubIssueItem>[] = [
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
      scope:scope,
      ...time
    }
    cityAgentHealthyGiftOrderStats(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.[0]?.commission)
      }
    })

  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      agencyId:msgDetail?.agencyId,
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      scope:scope,
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.name} 大健康供应链系统订单提成 （ID:${msgDetail?.agencyId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1300}
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
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
      className={styles.store_information}
    >
       <ProTable<GithubIssueItem>
        rowKey="orderSn"
        columns={Columns}
        request={cityAgentHealthyGiftOrder}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          agencyId:msgDetail?.agencyId,
          scope:scope
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        onReset={()=>{
          setTime()
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'cityAgentHealthyGiftOrderCom'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'cityAgentHealthyGiftOrderCom'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计收益
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};
