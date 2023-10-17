import { useRef,useEffect, useState, SetStateAction } from "react"
import { Form, Divider, Button, Space, message, FormInstance } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDependency,
  ProFormDateTimePicker
} from '@ant-design/pro-form';
import { remitSave,getDataByAuditSumId } from "@/services/aed-team-leader/performance-settlement-management"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, ByAuditSumIdData } from "./data.d"
import styles from './styles.less'
import SelectRemittance from './select-remittance'
import Upload from '@/components/upload';
import moment from "moment";
import RemittanceInformation from './remittance-information'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail, onClose, callback, type} = props;
  const [form] = Form.useForm();
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [remittanceVisible, setRemittanceVisible] = useState<boolean>(false)
  const [dataDatil, setDataDatil] = useState<ByAuditSumIdData>()
  const [remarkMsg, setRemarkMsg] = useState()
  const [orderArr, setOrderArr] = useState([])
  const [submitMsg, setSubmitMsg] = useState()
  const formRef = useRef<FormInstance>()
  const user = JSON.parse(window.localStorage.getItem('user'))

  useEffect(()=>{
    getDataByAuditSumId({ auditSumId:msgDetail?.settlementId }).then(res=>{
      if(res.code==0){
       setDataDatil(res.data)
       form.setFieldsValue({
        ...res.data,
        ...msgDetail,
        allOrder:`${res.data.allOrder} 单`,
        allAmount:amountTransform(res.data.allAmount,'/').toFixed(2)
       })
      }
    })
  },[])

  const waitTime = (values) => {
    const fee=values?.status?dataDatil?.orderArr?.reduce((sum, item) => sum + item.fee, 0):orderArr.reduce((sum, item) => sum + item.fee, 0)
    const unfreezeAmount=values?.status?dataDatil?.orderArr?.reduce((sum, item) => sum + item.unfreezeAmount, 0):orderArr.reduce((sum, item) => sum + item.unfreezeAmount, 0)
    const params={
      auditSumId: msgDetail?.settlementId,
      orderArr:values?.status?dataDatil?.orderArr?.reduce((obj, item) => {
        obj[item.orderId] = item.orderNo;
        return obj;
      }, {}):orderArr.reduce((obj, item) => {
        obj[item.orderId] = item.orderNo;
        return obj;
      }, {}),
      fee:fee,
      unfreezeAmount:unfreezeAmount,
      ...values,
      remitAmount:amountTransform(values.remitAmount,'*'),
      remitTime:moment(values.remitTime).valueOf()/1000,
      urlArr:values?.urlArr?values?.urlArr:[],
      remark:remarkMsg?.remark?remarkMsg?.remark:''
    }
    return new Promise((resolve, reject) => {
      remitSave(params).then((res) => {
        if (res.code === 0) {
          resolve(true);
          setVisible(false)
          callback()
        } else {
          reject(false);
        }
      })

    });
  };

  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>{type=='1'?'结算业绩':'结算汇款'}</strong>
        <p style={{ color:'#8D8D8D' }}>{type=='1'?'子公司ID':'账号ID'}：{msgDetail?.applyId}   {type=='1'?' 子公司名称':'账号名称'}：{msgDetail?.applyName}    结算申请单号：{msgDetail?.settlementId}    结算状态：{msgDetail?.settlementStatusDesc}    {type=='1'?`订单类型：${msgDetail?.orderTypeDesc}`:''}    申请时间：{msgDetail?.applyTime} </p>
      </>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      formRef={formRef}
      width={1200}
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
                    if(form?.getFieldValue()?.bankNo){
                      setForbiddenVisible(true)
                      setSubmitMsg(form?.getFieldValue())
                    }else{
                      message.error('收款银行卡号必填！')
                    }
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
      onFinish={async (values) => {
        try {
          await waitTime(values);
          message.success('提交成功');
          // 不返回不会关闭弹框
          return true;
        } catch (error) {
          console.log("🚀 ~ file: remittance-drawer.tsx:143 ~ onFinish={ ~ error:", error)
        }
      }}
      {...formItemLayout}
      className={styles.remittance_drawer}
    >

    <ProFormText
      label='收款子公司名称'
      name="applyName"
      width={400}
      disabled
    />

    <ProFormText
      label='收款银行卡号'
      width={400}
      name="bankNo"
      rules={[
        {required: true, message: '请输入收款银行卡号'},
        { pattern: /^([1-9]\d{9,29})$/, message: '银行卡号格式不正确' }
      ]}
    />
    <ProForm.Group style={{ marginLeft: '70px' }}>
      <ProFormText
        label='审核通过结算单数'
        name="allOrder"
        disabled
        width={400}
        labelCol={5}
      />
      <p>已汇款 {dataDatil?.hasRemitOrder} 单</p>
    </ProForm.Group>

    <ProForm.Group style={{ marginLeft: '70px' }}>
      <ProFormText
        label='已审核通过业绩订单金额'
        name="allAmount"
        fieldProps={{
          addonAfter: '元'
        }}
        width={400}
        labelCol={5}
        disabled
      />
      <p>已分账 {amountTransform(dataDatil?.hasRemitAmount,'/').toFixed(2)} 元，扣除通道费{amountTransform(dataDatil?.hasFee,'/').toFixed(2)}元，实际已汇款 {amountTransform(dataDatil?.hasRemitReal,'/').toFixed(2)} 元</p>
    </ProForm.Group>

    <ProFormRadio.Group
      name="status"
      label='待汇款提成业绩'
      options={[
        {
            label:`全部订单（${dataDatil?.allOrder-dataDatil?.hasRemitOrder}单）`,
            value: 1,
        },
        {
            label: '指定部分订单',
            value: 0,
        }
      ]}
      rules={[{required: true, message: '请选择待汇款提成业绩'}]}
      initialValue={1}
    />

    <ProFormDependency name={['status']}>
        {({ status }) => {
            if(status==1) return <p style={{ marginLeft: '180px' }}>订单业绩 {amountTransform(dataDatil?.orderArr?.reduce((sum, item) => sum + item?.payAmount, 0),'/').toFixed(2)} 元  ，应分账金额 {amountTransform(dataDatil?.orderArr?.reduce((sum, item) => sum + item?.amount, 0),'/').toFixed(2)} 元</p>
            if(status==0){
              return <>
                <a style={{ display:'block', margin: '0 0 10px 180px' }} onClick={()=>{ setRemittanceVisible(true) }}>选择结算汇款的订单</a>
                {
                  orderArr?.length?<p style={{ margin: '0 0 10px 180px', fontWeight:'bold' }}>已选择 {orderArr.length} 单</p>:null
                }
                <p style={{ marginLeft: '180px' }}>订单业绩 {amountTransform(orderArr.reduce((sum, item) => sum + item?.payAmount, 0),'/').toFixed(2)} 元  ，应分账金额 {amountTransform(orderArr.reduce((sum, item) => sum + item?.amount, 0),'/').toFixed(2)} 元</p>
              </>
            }
        }}
    </ProFormDependency>


    <ProFormDependency name={['status']}>
        {({ status }) => {
            if(status==1) return <>
              <ProForm.Group style={{ marginLeft: '90px' }}>
              <ProFormText
                label='扣除通道费'
                name="fee"
                width={400}
                // rules={[{required: true, message: '请输入扣除通道费'}]}
                fieldProps={{
                  addonAfter: '元',
                  value:amountTransform(dataDatil?.orderArr?.reduce((sum, item) => sum + item.fee, 0),'/').toFixed(2)
                }}
                disabled
                labelCol={5}
              />
              <p>交易通道费为第三方支付渠道收取；</p>
            </ProForm.Group>
                <ProFormText
                label='提成金额'
                name="unfreezeAmount"
                width={400}
                fieldProps={{
                  addonAfter: '元',
                  value: amountTransform(dataDatil?.orderArr?.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2),
                  className:styles.my_input
                }}

                disabled
              />
            </>
            if(status==0){
              return <>
              <ProForm.Group style={{ marginLeft: '90px' }}>
                <ProFormText
                  label='扣除通道费'
                  name="fee"
                  width={400}
                  // rules={[{required: true, message: '请输入扣除通道费'}]}
                  fieldProps={{
                    addonAfter: '元',
                    value:amountTransform(orderArr.reduce((sum, item) => sum + item.fee, 0),'/').toFixed(2)
                  }}
                  disabled
                  labelCol={5}
                />
                <p>交易通道费为第三方支付渠道收取；</p>
              </ProForm.Group>
              <ProFormText
                label='提成金额'
                name="unfreezeAmount"
                width={400}
                fieldProps={{
                  addonAfter: '元',
                  value: amountTransform(orderArr.reduce((sum, item) => sum + item?.unfreezeAmount, 0),'/').toFixed(2),
                  className:styles.my_input
                }}
                disabled
              />
            </>
            }
        }}
    </ProFormDependency>

    <ProFormText
      label='实际汇款金额'
      name="remitAmount"
      width={400}
      rules={[
        {required: true, message: '请输入实际汇款金额'},
        {pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message: '请输入正确的金额格式'}
      ]}  
      fieldProps={{ 
        addonAfter: '元',
        className:styles.my_input
      }}
    />

    <ProFormDateTimePicker 
      label='实际汇款时间'
      name='remitTime'
      rules={[{ required: true, message: '请选择汇款时间' }]}
    />

    <Form.Item
      label="上传汇款凭证"
      name="urlArr"
      width={400}
    >
      <Upload multiple  maxCount={3} accept="image/*"/>
    </Form.Item>

    <ProFormDependency name={['remitAmount','status']}>
        {({ remitAmount, status }) => {
          console.log('remitAmount',remitAmount)
          if((status==1&&remitAmount)&& amountTransform(remitAmount,'*') != dataDatil?.orderArr?.reduce((sum, item) => sum + item?.unfreezeAmount, 0)){
            return <ProFormTextArea
                    label='备注'
                    name="remark"
                    fieldProps={{
                      maxLength:50,
                      minLength:5,
                      placeholder:'请输入5-50个字符'
                    }}
                    rules={[{required: true, message: '请输入备注'}]}
                    width={400}
                    extra={<span style={{ color:'red' }}>实际汇款金额与提成金额不相等，请核实确认并填写备注进行详细说明！</span>}
                  />
          }else if((status==0&&remitAmount)&& amountTransform(remitAmount,'*') != orderArr.reduce((sum, item) => sum + item?.unfreezeAmount, 0)){
            return <ProFormTextArea
                    label='备注'
                    name="remark"
                    fieldProps={{
                      maxLength:50,
                      minLength:5,
                      placeholder:'请输入5-50个字符'
                    }}
                    rules={[{required: true, message: '请输入备注'}]}
                    width={400}
                    extra={<span style={{ color:'red' }}>实际汇款金额与提成金额不相等，请核实确认并填写备注进行详细说明！</span>}
                  />
          }else{
            return <ProFormTextArea
                    label='备注'
                    name="remark"
                    fieldProps={{
                      maxLength:50,
                      minLength:5,
                      placeholder:'请输入5-50个字符'
                    }}
                    extra={<span style={{ color:'red' }}>{type=='1'?'':'此备注内容将会在区县服务商系统展示，请注意隐私，谨慎填写。'}</span>}
                    width={400}
                  />
          }  
        }}
    </ProFormDependency>

    <Divider />

    <ProFormText
      label='汇款操作人'
      name="operateName"
      fieldProps={{
        value:user.username
      }}
      disabled
      width={400}
    />

    {remittanceVisible&&
    <SelectRemittance
      visible={remittanceVisible}
      setVisible={setRemittanceVisible}
      msgDetail={dataDatil}
      onClose={()=>{}}
      orderArr={orderArr}
      callback={(rows: SetStateAction<never[]>)=>{ setOrderArr(rows) }}
    />
    }
    {forbiddenVisible&&
      <RemittanceInformation
        visible={forbiddenVisible}
        setVisible={setForbiddenVisible}
        msgDetail={submitMsg}
        orderArr={orderArr}
        callback={(values)=>{ setRemarkMsg(values); formRef.current?.submit()  }}
        onClose={()=>{}}
      />
    }
    </DrawerForm >
  )
}
