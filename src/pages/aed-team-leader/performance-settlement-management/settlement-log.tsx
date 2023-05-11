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
      dataIndex: 'create',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入操作人或备注'
      }
    },
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'consignee',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作项',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '操作备注',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true,
    }
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算日志</strong>
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
