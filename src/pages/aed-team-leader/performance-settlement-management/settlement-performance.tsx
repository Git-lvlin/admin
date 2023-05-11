import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { AEDOrder } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()

  const Columns: ProColumns[] = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '下单人用户手机',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInTable: true
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
      title: '提成金额',
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
      title: '团长手机号',
      dataIndex: 'teamLeaderPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号'
      },
      hideInSearch: true
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
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间', '结束时间']
      }
    },
    {
      title: '订单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '汇款时间',
      valueType: 'dateRange',
      dataIndex: 'createTime',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '汇款时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'depositOrderStatus',
      align: 'center',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
    },
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算业绩</strong>
        <p style={{ color:'#8D8D8D' }}>子公司ID：26    子公司名称：{msgDetail?.name}    结算单号：2038388893    结算状态：待审核    订单类型：AED培训服务套餐订单   申请时间：2023-04-26 18:05:27</p>
      </>}
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
        render: ({ form }) => {
          return []
        }
      }}
      {...formItemLayout}
      className={styles.settlement_performance}
    >
      <ProTable
        rowKey="orderSn"
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
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
      />
    </DrawerForm >
  )
}
