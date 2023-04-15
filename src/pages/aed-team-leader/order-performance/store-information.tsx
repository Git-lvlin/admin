import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { AEDOrder,AEDOrderStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState<DrtailItem>({})
  const ref = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const divideName=()=>{
    switch (type) {
      case 1:
        return '累计业绩'
      case 2:
        return '提成'
      default:
        return ''
    }
  }

  const Columns: ProColumns[] = [
    {
      title: '订单日期',
      dataIndex: 'createTime',
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
      title: '团长手机号',
      dataIndex: 'teamLeaderPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号'
      },
      order: -2
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
      valueType: 'select',
      valueEnum:{
        'aedCourses': 'AED课程订单',
        'aedTrain': 'AED区县培训订单',
      },
      hideInTable: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '客户手机',
      dataIndex: 'teamPhone',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder:'请输入当前大团队长的客户手机号码'
      },
      order: -1
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
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
        if(_&&_>0){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInTable: type==1
    },
    {
      title: '扣除通道费后收益',
      dataIndex: 'reduceFeeCom',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_&&_>0){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInTable: type==1
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        'aedCourses': 'AED课程订单',
        'aedTrain': 'AED区县培训订单',
      },
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已签订',
        2: '未签订',
      },
      fieldProps: {
        placeholder: '全部'
      },
      hideInTable: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已签订',
        2: '未签订',
      },
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已学习',
        2: '未学习',
      },
      fieldProps: {
        placeholder: '全部'
      },
      hideInTable: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已学习',
        2: '未学习',
      },
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已通过',
        2: '未通过',
        3: '未考试'
      },
      fieldProps: {
        placeholder: '全部'
      },
      hideInTable: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '已通过',
        2: '未通过',
        3: '未考试'
      },
      hideInSearch: true
    },
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      teamPhone:time?.teamPhone,
      orderType:time?.orderType,
      contractStatus:time?.contractStatus,
      learnStatus:time?.learnStatus,
      examStatus:time?.examStatus,
      teamLeaderPhone:time?.teamLeaderPhone
    }
    AEDOrderStats(params).then(res=>{
      if(res.code==0){
        type==1? setOrderSum(res?.data?.[0]?.totalPayAmount):setOrderSum(res?.data?.[0]?.totalCommission)
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
      title={`${msgDetail?.managerPhone} ${divideName()} （ID:${msgDetail?.agencyId}）`}
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
       <ProTable
        rowKey="date"
        columns={Columns}
        request={AEDOrder}
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
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={type==1?'AEDOrderPm':'AEDOrderAdm'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={type==1?'AEDOrderPm':'AEDOrderAdm'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计{type==1?'金额':'收益'}：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
                <span style={{ marginLeft:'570px', display:type==1? 'none':'inline-block' }}>对未完成法大大合同签写、培训视频学习和考试通过的提成，将冻结提现</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};
