import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Form, Image, Divider, Button, Space,Checkbox } from 'antd';
import {
  DrawerForm,
  ProFormCheckbox
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { applySubPage,settlementAuditAudit } from "@/services/aed-team-leader/performance-settlement-management"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import ForbiddenModel from './forbidden-model'
import RejectModel from './reject-model'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose,callback} = props;
  const [form] = Form.useForm();
  const [dataStatus,setDataStatus]=useState([])
  const ref = useRef<ActionType>()
  const [selectedRows, setSelectedRows] = useState([]);
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [rejectVisible, setRejectVisible] = useState<boolean>(false)
  const [totalSum, settotalSum] = useState()
  const [pendingAmount, setPendingAmount] = useState()
  const [pendingFee, setPendingFee] = useState()
  const [pendingUnfreezeAmount, setPendingUnfreezeAmount] = useState()
  const [confirmedAmount, setConfirmedAmount] = useState()

  const Columns: ProColumns[] = [
    {
      title: '审核本页业绩',
      dataIndex: 'check',
      align: 'left',
      render: (_, data) => {
        return '选中';
      },
      width:70,
      fixed: 'left',
      hideInSearch:true
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单用户ID',
      dataIndex: 'memberId',
      valueType: 'text',
      hideInSearch: true
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
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间', '结束时间'],
        style:{
          width: 330
        }
      }
    },
    {
      title: '订单时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true
    },
  ]

  const handleSelectRows = (rows,arr) => {
    setSelectedRows(arr);
    setDataStatus([])
  };

  const handleCheckAll = (val) => {
    setDataStatus(val)
    setSelectedRows([])
  };

  const waitTime = (values) => {
    const params={
      settlementId: msgDetail?.settlementId,
      divideItemIdList: dataStatus.length?'all':selectedRows.map(ele=>ele.divideItemId),
      action: 'approve',
      ...values
    }
    settlementAuditAudit(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
      }
    })
  };

  
  const rejectSubmit = (values) => {
    const params={
      settlementId: msgDetail?.settlementId,
      divideItemIdList: dataStatus.length?'all':selectedRows.map(ele=>ele.divideItemId),
      action: 'reject',
      ...values
    }
    settlementAuditAudit(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
      }
    })
  };

  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算业绩</strong>
        <p style={{ color:'#8D8D8D' }}>子公司ID：{msgDetail?.applyId}    子公司名称：{msgDetail?.applyName}    结算申请单号：{msgDetail?.settlementId}    结算状态：{msgDetail?.settlementStatusDesc}    订单类型：{msgDetail?.orderTypeDesc}   申请时间：{msgDetail?.applyTime} </p>
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
          return (
            <div>
              <Space>
                <span style={{ fontWeight:'bolder', marginRight:'100px' }}>审核通过后，请尽快为用户汇款！</span>
                <Button
                  type="primary"
                  disabled={!selectedRows.length&&!dataStatus.length}
                  style={{ backgroundColor:selectedRows.length||dataStatus.length?'#1890FF':'#A7A7A8', color:'#fff' }}
                  onClick={() => {
                    setForbiddenVisible(true)
                  }}
                >
                  {selectedRows.length?selectedRows.length==totalSum?'全部审核通过':'部分审核通过':dataStatus.length?'全部审核通过':'审核通过'}
                </Button>
                <Button
                  style={{ backgroundColor:(dataStatus.length&&msgDetail?.subOrderCount==totalSum)||(selectedRows.length==totalSum&&msgDetail?.subOrderCount==totalSum)?'red':'#A7A7A8', color:'#fff' }}
                  disabled={(!dataStatus.length&&selectedRows.length!=totalSum)||msgDetail?.subOrderCount!=totalSum}
                  onClick={() => {
                    setRejectVisible(true)
                  }}
                >
                  {(dataStatus.length&&msgDetail?.subOrderCount==totalSum)||(selectedRows.length==totalSum&&msgDetail?.subOrderCount==totalSum)?'全部审核拒绝':'审核拒绝'}
                </Button>
              </Space>
            </div>
          )
        }
      }}
      {...formItemLayout}
      className={styles.settlement_performance}
    >
      <div className={styles.hed}>
        <div>
          <p>申请信息</p>
           <div>
            <p>申请备注：{msgDetail?.applyRemark}</p>
            <p>申请附件：{msgDetail?.applyAttach?.map(item=><Image src={item} width={50} height={50} style={{ display:'inline-block',marginRight:'20px' }}/>)}</p>
           </div>
        </div>
        <ProFormCheckbox.Group
          name="checkbox"
          width={300}
          options={[
            {
              label: <strong>审核所有待审核的订单业绩</strong>,
              value: 1,
            }
          ]}
          fieldProps={{
            onChange:handleCheckAll,
            value:dataStatus
          }}
        />
      </div>
      <Divider />
      <ProTable
        rowKey="divideItemId"
        columns={Columns}
        request={applySubPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          settlementId:msgDetail?.settlementId,
          status: 10
        }}
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        postData={(data)=>{
          settotalSum(data.total)
          setPendingAmount(data.pendingAmount)
          setPendingFee(data.pendingFee)
          setPendingUnfreezeAmount(data.pendingUnfreezeAmount)
          setConfirmedAmount(data.confirmedAmount)
          return data.records
        }}
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectRows,
          selectedRowKeys: selectedRows?.map(ele=>ele.divideItemId),
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                <p>AED子公司：{msgDetail?.applyName}，业绩总分账金额 ：<span style={{ color:'red' }}>{amountTransform(selectedRows.length?selectedRows.reduce((sum, item) => sum + item?.amount, 0):pendingAmount,'/').toFixed(2)}</span>元，扣除通道费：<span style={{ color:'red' }}>{amountTransform(selectedRows.length?selectedRows.reduce((sum, item) => sum + item?.fee, 0):pendingFee,'/').toFixed(2)}</span>元，提成金额 ：<span style={{ color:'red' }}>{amountTransform(selectedRows.length?selectedRows.reduce((sum, item) => sum + item?.unfreezeAmount, 0):pendingUnfreezeAmount,'/').toFixed(2)}</span> 元（ {selectedRows.length?selectedRows.length:totalSum} 单）</p>
              </div>
            </div>
          </>
        }}
      />
      {
        forbiddenVisible&&
        <ForbiddenModel
          visible={forbiddenVisible}
          setVisible={setForbiddenVisible}
          msgDetail={selectedRows}
          callback={(values)=>{ waitTime(values) }}
          unfreezeAmount={pendingUnfreezeAmount}
          totalSum={totalSum}
          onClose={()=>{}}
          dataStatus={dataStatus}
        />
      }
       {
        rejectVisible&&
        <RejectModel
          visible={rejectVisible}
          setVisible={setRejectVisible}
          msgDetail={msgDetail}
          callback={(values)=>{ rejectSubmit(values)}}
          totalSum={totalSum}
          unfreezeAmount={pendingUnfreezeAmount}
          pendingFee={pendingFee}
          confirmedAmount={confirmedAmount}
          onClose={()=>{}}
        />
      }
    </DrawerForm >
  )
}
