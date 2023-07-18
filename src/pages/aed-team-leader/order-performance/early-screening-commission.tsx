import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { AEDTrainingsService, AEDTrainingsServiceStats } from "@/services/aed-team-leader/order-performance"
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

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose,} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState<number>(0)
  const [time,setTime]=useState<DrtailItem>({})
  const ref = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const Columns: ProColumns[] = [
    {
      title: '订单分账时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      hideInTable: true,
    },
    {
      title: '早筛码',
      dataIndex: 'sinCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '订单分账时间',
      dataIndex: 'dateRange',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '提成金额',
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
      title: '原子公司ID',
      dataIndex: 'teamMemberId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '结算状态',
      dataIndex: 'auditStatus',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '未解冻',
        2: '未到期',
        3: '待申请',
        4: '待审核',
        5: '审核通过待汇款',
        6: '已结算',
        7: '审核不通过',
        8: '已失效'
      },
      fieldProps: {
        placeholder: '请选择结算状态'
      },
     hideInSearch: true
    },
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      ...time
    }
    AEDTrainingsServiceStats(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.[0]?.totalPayAmount)
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
      title={`子公司：${msgDetail?.name} （${msgDetail?.managerPhone}）提成明细 （ID:${msgDetail?.agencyId}）`}
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
        request={AEDTrainingsService}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          agencyId:msgDetail?.agencyId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        scroll={{ x: 'max-content' }}
        onSubmit={(val)=>{
          setOrderSum(0)
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
                累计提成：
                <span>{amountTransform(orderSum,'/').toFixed(2)}</span>元
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  )
}
