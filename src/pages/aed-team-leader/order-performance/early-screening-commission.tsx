import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { scrSpecOrderPmDetail, scrSpecOrderPmDetailStats } from "@/services/aed-team-leader/order-performance"
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
  const { visible, setVisible,msgDetail,onClose,searchTime} = props;
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
      initialValue: [moment(searchTime?.dateRange[0]),moment(searchTime?.dateRange[1])]
    },
    {
      title: '早筛码',
      dataIndex: 'signCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子订单号',
      dataIndex: 'orderSn',
      align: 'center',
      fieldProps: {
        placeholder: '请输入子订单号'
      },
      hideInTable: true
    },
    {
      title: '子订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '总单号',
      dataIndex: 'sumOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单分账时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
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
      dataIndex: 'comission',
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
      dataIndex: 'sourceAgencyId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '早筛状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '结算状态',
      dataIndex: 'auditStatusDesc',
      align: 'center',
      hideInSearch: true
    },
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      ...searchTime,
      ...time
    }
    scrSpecOrderPmDetailStats(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.[0]?.comission)
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
        rowKey="agencyId"
        columns={Columns}
        request={scrSpecOrderPmDetail}
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
              type={'scrSpecOrderPmDetail'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'scrSpecOrderPmDetail'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计提成金额：
                <span>{amountTransform(orderSum,'/').toFixed(2)}</span>元
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  )
}
