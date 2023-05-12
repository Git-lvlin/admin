import { useRef,useEffect, useState } from "react"
import { Form, Image, Divider, Button, Space, Row, Col } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDependency
} from '@ant-design/pro-form';
import { AEDOrder, AEDOrderStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
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
  const { visible, setVisible,msgDetail,onClose,type,callback} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState<number>(0)
  const [time,setTime]=useState<DrtailItem>({})
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [remittanceVisible, setRemittanceVisible] = useState<boolean>(false)

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
      name="name"
      width={400}
      disabled
    />

    <ProFormText
      label='收款银行卡号'
      width={400}
      name="credit"
      rules={[
        { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '银行卡号格式不正确' }
      ]}
    />
    <ProForm.Group style={{ marginLeft: '70px' }}>
      <ProFormText
        label='审核通过结算单数'
        name="singular"
        disabled
        width={400}
        labelCol={5}
      />
      <p>已汇款 5 单</p>
    </ProForm.Group>

    <ProForm.Group style={{ marginLeft: '70px' }}>
      <ProFormText
        label='审核通过结算金额'
        name="结算金额"
        fieldProps={{
          addonAfter: '元'
        }}
        width={400}
        labelCol={5}
        disabled
      />
      <p>已汇款 3750 元，扣除通道费X元，实际已汇款 3315 元</p>
    </ProForm.Group>

    <ProFormRadio.Group
      name="status"
      label='待汇款提成业绩'
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
      rules={[{required: true, message: '请选择待汇款提成业绩'}]}
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

    <p style={{ marginLeft: '180px' }}>应结算金额 12000 元</p>
    <ProForm.Group style={{ marginLeft: '90px' }}>
      <ProFormText
        label='扣除通道费'
        name="通道费"
        width={400}
        rules={[{required: true, message: '请输入扣除通道费'}]}
        fieldProps={{
          addonAfter: '元'
        }}
        disabled
        labelCol={5}
      />
      <p>交易通道费为第三方支付渠道收取；</p>
    </ProForm.Group>

    <ProFormText
      label='应结算汇款金额'
      name="remittance"
      width={400}
      fieldProps={{
        addonAfter: '元'
      }}
      disabled
    />

    <ProFormText
      label='实际汇款金额'
      name="practical"
      width={400}
      rules={[
        {required: true, message: '请输入实际汇款金额'},
        {pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message: '请输入正确的金额格式'}
      ]}  
      fieldProps={{ 
        addonAfter: '元'
      }}
    />

    <ProFormText
      label='汇款时间'
      name="time"
      width={400}
      rules={[
        { required: true, message: '请输入汇款时间' },
        { validator: (_, value) => {
            if (!value) {
              return Promise.resolve();
            }
            if (moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
              return Promise.resolve();
            }
            return Promise.reject('时间格式不正确');
          }
        }
      ]}
    />

    <Form.Item
      label="上传汇款凭证"
      name="cardImage"
      width={400}
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
      width={400}
      extra={<span style={{ color:'red' }}>此备注内容将会在AED子公司后台展示，请注意隐私，谨慎填写。</span>}
    />
    <Divider />

    <ProFormText
      label='汇款操作人'
      name="id"
      disabled
      width={400}
    />

    <ProFormText
    name="operator"
    hidden
    />

    {remittanceVisible&&
    <SelectRemittance
      visible={remittanceVisible}
      setVisible={setRemittanceVisible}
      msgDetail={msgDetail}
      onClose={()=>{}}
      callback={(rows)=>{  }}
    />
    }
    {forbiddenVisible&&
      <RemittanceInformation
        visible={forbiddenVisible}
        setVisible={setForbiddenVisible}
        msgDetail={msgDetail}
        callback={()=>{ setVisible(false) }}
        onClose={()=>{}}
      />
    }
    </DrawerForm >
  )
}
