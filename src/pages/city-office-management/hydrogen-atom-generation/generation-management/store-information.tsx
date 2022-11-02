import { useRef,useEffect, useState } from "react"
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { cityAgentHydrogenComm,cityAgentWholesaleComm,cityAgentHydrogenCommStats,cityAgentWholesaleCommStats } from "@/services/city-office-management/hydrogen-atom-generation/generation-management"
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
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState({})
  const ref = useRef()
  const [visit, setVisit] = useState<boolean>(false)

  const divideName=()=>{
    switch (type) {
      case 2:
        return '销售提成'
      case 3:
        return '新集约批发业绩提成'
      default:
        return ''
    }
  }
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
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
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
      title: '收益',
      dataIndex: 'commission',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(parseFloat(_)){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return _
        }
      },
    }
  ]
  useEffect(()=>{
    const params={
      agentId:msgDetail?.agentId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      orderType:time?.orderType
    }
    if(type==2){
      cityAgentHydrogenCommStats(params).then(res=>{
        if(res.code==0){
          setOrderSum(res?.data?.[0]?.amount)
        }
      })
    }else{
      cityAgentWholesaleCommStats(params).then(res=>{
        if(res.code==0){
          setOrderSum(res?.data?.[0]?.amount)
        }
      })
    }

  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      agentId:msgDetail?.agentId,
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.agentName} ${divideName()} （ID:${msgDetail?.agentId}）`}
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
        request={type==2?cityAgentHydrogenComm:cityAgentWholesaleComm}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          type:type,
          agentId:msgDetail?.agentId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={type==2?'cityAgentHydrogenComm':'cityAgentWholesaleComm'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={type==2?'cityAgentHydrogenComm':'cityAgentWholesaleComm'}/>
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
  );
};
