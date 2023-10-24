import { useRef, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { getLogsListByParams } from "@/services/aed-team-leader/performance-settlement-management"
import type { CumulativeProps } from "../../supplier-management/supplier-list/qualification-audit-list/data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import RemittanceDetails from './remittance-details'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail, onClose, type} = props;
  const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
  const [remittanceId, setRemittanceId] = useState()
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()

  const Columns: ProColumns[] = [
    {
      dataIndex: 'searchKey',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入备注'
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
      dataIndex: 'operateRole',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'operateName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作项',
      dataIndex: 'type',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '操作备注',
      dataIndex: 'remark',
      align: 'center',
      width: 400,
      hideInSearch: true,
      render: (_,data) =>{
        return <p>{_} {data?.type == '汇款'&&<a onClick={()=>{ setPaymentVisible(true); setRemittanceId(data.actParams.jumpId) }}>{data.actParams.title}</a>}</p>
      }
    }
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算日志</strong>
        <p style={{ color:'#8D8D8D' }}>{type=='1'?'子公司ID':'账号ID'}：{msgDetail?.applyId}&nbsp;&nbsp;{type=='1'?' 子公司名称':'账号名称'}：{msgDetail?.applyName}&nbsp;&nbsp;结算申请单号：{msgDetail?.settlementId}&nbsp;&nbsp;结算状态：{msgDetail?.settlementStatusDesc}&nbsp;&nbsp;{type=='1'?`订单类型：${msgDetail?.orderTypeDesc}`:''}&nbsp;&nbsp;申请时间：{msgDetail?.applyTime} </p>
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
        rowKey="id"
        columns={Columns}
        request={getLogsListByParams}
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
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
      />
       {
        paymentVisible&&
        <RemittanceDetails
          visible={paymentVisible}
          setVisible={setPaymentVisible}
          id={remittanceId}
          onClose={()=>{ setRemittanceId(undefined)}}
          type={type}
        />
      }
    </DrawerForm >
  )
}
