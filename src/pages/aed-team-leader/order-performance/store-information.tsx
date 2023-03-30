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
    }
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      teamPhone:time?.teamPhone
    }
    AEDOrderStats(params).then(res=>{
      if(res.code==0){
        type==1? setOrderSum(res?.data?.payAmount):setOrderSum(res?.data?.commssion)
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
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'AEDOrderAdm'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'AEDOrderAdm'}/>
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
