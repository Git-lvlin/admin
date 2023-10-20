import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { applySubPage, applyDetail } from "@/services/aed-team-leader/performance-settlement-management"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, Statistics } from "../../supplier-management/supplier-list/qualification-audit-list/data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import { Descriptions } from 'antd';
import Export from "@/pages/export-excel/export"
import ExportHistory from "@/pages/export-excel/export-history"
import moment from "moment"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail, onClose, type} = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()
  const [detailList,setDetailList]=useState<Statistics>()
  const [visit, setVisit] = useState<boolean>(false)
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
      title: type=='1'?'订单编号/子单号':'订单编号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeDesc',
      align: 'center',
      hideInSearch: true,
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
      hideInSearch: true,
      hideInTable: type == '2'
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
      renderFormItem: () => <TimeSelect />,
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
      renderFormItem: () => <TimeSelect />,
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
      hideInSearch: true,
      hideInTable: msgDetail?.settlementStatus == 16
    },
  ]

  const getFieldValue = (searchConfig: any) => {
    const {  dateRange, remittanceTime, ...rest } = searchConfig.form.getFieldsValue()
    const params = {
      ...rest,
      settlementId:msgDetail?.settlementId,
      payTimeStart: dateRange&&moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      payTimeEnd: dateRange&&moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      remittanceTimeStart: remittanceTime&&moment(remittanceTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      remittanceTimeEnd: remittanceTime&&moment(remittanceTime[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
    return params
  }


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算查看</strong>
        <p style={{ color:'#8D8D8D' }}>{type=='1'?'子公司ID':'账号ID'}：{msgDetail?.applyId}&nbsp;&nbsp;{type=='1'?' 子公司名称':'账号名称'}：{msgDetail?.applyName}&nbsp;&nbsp;结算申请单号：{msgDetail?.settlementId}&nbsp;&nbsp;结算状态：{msgDetail?.settlementStatusDesc}&nbsp;&nbsp;申请时间：{msgDetail?.applyTime} </p>
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
        postData={(data:any)=>{
          return data.records
        }}
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'export_SettlementAudit_applySubPage'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='export_SettlementAudit_applySubPage'/>,
          ],
        }}
      />
    </DrawerForm >
  )
}
