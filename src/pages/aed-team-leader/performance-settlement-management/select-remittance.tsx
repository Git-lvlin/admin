import { useEffect, useState, useRef } from "react"
import { Form, message, Divider } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { updateAdminCancel } from "@/services/order-management/invoice-management"
import styles from './styles.less'
import ProTable from "@ant-design/pro-table"
import { AEDOrder, AEDOrderStats, AEDTrainingsService, AEDTrainingsServiceStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { ProColumns, ActionType  } from "@ant-design/pro-table"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props) => {
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const ref = useRef<ActionType>()
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminCancel({id:values?.id,cancelRemark:values?.cancelRemark}).then((res) => {
        if (res.code === 0) {
          resolve(true);
          onClose();
        } else {
          reject(false);
        }
      })

    });
  };

  const handleSelectRows = (rows) => {
    console.log('rows',rows)
    setSelectedRows(rows);
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
      title: '订单支付日期',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
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
      width={1000}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('操作成功');
        return true;
      }}
      {...formItemLayout}
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
        search={false}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectRows,
          selectedRowKeys: selectedRows,
        }}
      />
      <p>汇款结算业绩：7500.00元（共10单）</p>
      <p>预计结算汇款金额：7075.00元（扣除税费：425.00元）</p>
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
