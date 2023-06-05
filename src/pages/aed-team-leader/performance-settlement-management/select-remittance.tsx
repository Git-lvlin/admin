import { useEffect, useState, useRef } from "react"
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
// import { getDataByAuditSumId } from "@/services/aed-team-leader/performance-settlement-management"
import ProTable from '@/components/pro-table'
import { amountTransform } from '@/utils/utils'
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import moment from "moment";
import type { CumulativeProps } from "./data"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible,msgDetail,onClose,callback,orderArr} = props;
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const ref = useRef<ActionType>()
  useEffect(()=>{
    setSelectedRows(orderArr)
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
      callback(selectedRows)
      resolve(true);
    });
  };

  const handleSelectRows = (rows,arr) => {
    setSelectedRows(arr);
  };

  const Columns: ProColumns[] = [
    {
      title: '全选',
      dataIndex: 'check',
      align: 'left',
      render: (_, data) => {
        return '选中';
      },
      width:50,
      fixed: 'left',
      hideInSearch:true
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberMobile',
      align: 'center',
      hideInSearch: true
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
      title: '支付日期',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
      render:(_,data)=>{
        return moment(_*1000).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      align: 'center',
      hideInSearch: true,
      render:(_,data)=>{
        return moment(_*1000).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  ]
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>选择指定汇款结算的订单</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        }
      }}
      width={1200}
      onFinish={async (values) => {
        await waitTime(values);
        return true;
      }}
      {...formItemLayout}
    >
      <ProTable
        rowKey="orderNo"
        columns={Columns}
        dataSource={msgDetail?.orderArr}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          auditSumId:msgDetail?.settlementId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={false}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectRows,
          selectedRowKeys: selectedRows.map(ele=>ele.orderNo),
        }}
      />
      <p>总计订单业绩：{amountTransform(selectedRows.reduce((sum, item) => sum + item.payAmount, 0),'/').toFixed(2)}元，分账金额：{amountTransform(selectedRows.reduce((sum, item) => sum + item.amount, 0),'/').toFixed(2)}元（共{selectedRows.length}单）</p>
      <p>预计提成金额：{amountTransform(selectedRows.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2)}元（扣除通道费：{amountTransform(selectedRows.reduce((sum, item) => sum + item.fee, 0),'/').toFixed(2)}元）</p>

      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
