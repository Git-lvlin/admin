import { useRef,useEffect, useState } from "react"
import { Form, Image, Divider, Button, Space,Checkbox } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDependency
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { AEDOrder, AEDOrderStats, AEDTrainingsService, AEDTrainingsServiceStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import SelectRemittance from './select-remittance'
import Upload from '@/components/upload';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState<number>(0)
  const [time,setTime]=useState<DrtailItem>({})
  const [dataStatus,setDataStatus]=useState([])
  const ref = useRef<ActionType>()
  const [selectedRows, setSelectedRows] = useState([]);
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [remittanceVisible, setRemittanceVisible] = useState<boolean>(false)

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
      dataIndex: 'buyerId',
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
      title: '结算状态',
      dataIndex: 'depositOrderStatus',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
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

  const handleSelectRows = (rows) => {
    console.log('rows',rows)
    setSelectedRows(rows);
    setDataStatus([])
  };

  const handleCheckAll = (val) => {
    setDataStatus(val)
    if (val[0]) {
      AEDOrder({ agencyId:msgDetail?.agencyId, pageSize:999 }).then(res=>{
        if(res.code==0){
          setSelectedRows(res.data.map(ele=>ele.orderSn));
        }
      })
     
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      teamPhone:time?.teamPhone,
      orderType:time?.orderType,
      contractStatus:time?.contractStatus,
      learnStatus:time?.learnStatus,
      examStatus:time?.examStatus,
      teamLeaderPhone:time?.teamLeaderPhone,
      offTrainStatus:time?.offTrainStatus
    }
    const api=AEDOrderStats
    api(params).then(res=>{
      if(res.code==0){
        type==1? setOrderSum(res?.data?.[0]?.totalPayAmount):setOrderSum(res?.data?.[0]?.totalCommission)
      }
    })
  },[time])

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
          return (
            <div>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    // form?.submit()
                    setForbiddenVisible(true)
                  }}
                >
                  确认完成汇款
                </Button>
                <Button
                  style={{ backgroundColor:'#5A5A5A', color:'#fff' }}
                  onClick={() => {
                    setVisible(false)
                    onClose();
                  }}
                >
                  返回
                </Button>
              </Space>
            </div>
          )
        }
      }}
      {...formItemLayout}
      className={styles.remittance_drawer}
    >

    <ProFormText
      label='收款子公司名称'
      name="id"
      disabled
    />

    <ProFormText
      label='收款银行卡号'
      name="id"
    />

    <ProFormText
      label='审核通过结算单数'
      name="id"
      disabled
    />

    <ProFormText
      label='审核通过结算金额'
      name="id"
      fieldProps={{
        addonAfter: '元'
      }}
      disabled
    />

    <ProFormRadio.Group
      name="status"
      label='汇款提成业绩'
      options={[
        {
            label:'全部订单（20单）',
            value: 1,
        },
        {
            label: '指定部分订单',
            value: 0,
        }
      ]}
      rules={[{required: true, message: '请选择汇款提成业绩'}]}
      initialValue={1}
    />

    <ProFormDependency name={['status']}>
        {({ status }) => {
            if(status==1) return null
            if(status==0){
              return <a style={{ display:'block', margin: '0 0 100px 230px' }} onClick={()=>{ setRemittanceVisible(true) }}>选择结算汇款的订单</a>
            }
        }}
    </ProFormDependency>

    <ProFormText
      label='扣除通道费'
      name="id"
      rules={[{required: true, message: '请输入扣除通道费'}]}
      fieldProps={{
        addonAfter: '元'
      }}
      extra='交易通道费为第三方支付渠道收取；'
    />

    <ProFormText
      label='应结算汇款金额'
      name="id"
      fieldProps={{
        addonAfter: '元'
      }}
      disabled
    />

    <ProFormText
      label='实际汇款金额'
      name="id"
      rules={[{required: true, message: '请输入实际汇款金额'}]}
      fieldProps={{
        addonAfter: '元'
      }}
    />

    <ProFormText
      label='汇款时间'
      name="id"
      rules={[{required: true, message: '请输入汇款时间'}]}
    />

    <Form.Item
      label="上传汇款凭证"
      name="cardImage"
      rules={[{ required: true, message: '请上传汇款凭证!' }]}
    >
      <Upload multiple  maxCount={1} accept="image/*"/>
    </Form.Item>

    <ProFormTextArea
      label='备注'
      name="cancelRemark"
      fieldProps={{
        maxLength:50,
        minLength:5,
        placeholder:'请输入5-50个字符'
      }}
      extra={<span style={{ color:'red' }}>此备注内容将会在AED子公司后台展示，请注意隐私，谨慎填写。</span>}
    />
    <Divider />

    <ProFormText
      label='汇款操作人'
      name="id"
      disabled
    />

    <ProFormText
    name="id"
    hidden
    />

    {remittanceVisible&&
    <SelectRemittance
      visible={remittanceVisible}
      setVisible={setRemittanceVisible}
      msgDetail={msgDetail}
      onClose={()=>{}}
    />
    }
    </DrawerForm >
  )
}
