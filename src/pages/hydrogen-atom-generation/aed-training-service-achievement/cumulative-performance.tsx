import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { cityAgentAedTrainOrder,cityAgentAedTrainOrderStats } from "@/services/hydrogen-atom-generation/aed-training-service-achievement"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem,CumulativeProps } from "./data"
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




export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState<GithubIssueItem>()
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
      renderFormItem: () => <TimeSelect showTime={false}/>,
      align: 'center',
      hideInTable: true,
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true,
      order:-1
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return _
        }
      },
      hideInSearch: true,
    },
    {
      title: '业绩范围',
      dataIndex: 'scopeDesc',
      align: 'center',
      hideInSearch: true
    }
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      ...time
    }
    cityAgentAedTrainOrderStats(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.[0]?.payAmount)
      }
    })
  },[time])

  const getFieldValue = (searchConfig) => {
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
        title={`${msgDetail?.name} AED培训及服务套餐单业绩 （ID:${msgDetail?.agencyId}）`}
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
        {...formItemLayout}
        className={styles.store_information}
      >
       <ProTable<GithubIssueItem>
        rowKey="orderSn"
        columns={Columns}
        request={cityAgentAedTrainOrder}
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
          setTime(val)
        }}
        onReset={()=>{
          setTime({})
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'cityAgentAedTrainOrderPm'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'cityAgentAedTrainOrderPm'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计金额：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  )
}

