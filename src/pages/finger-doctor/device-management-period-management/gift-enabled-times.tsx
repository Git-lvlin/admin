import React, { useEffect, useState } from 'react';
import { Form, Divider, Space } from 'antd';
import { saveDeviceDoctor } from "@/services/finger-doctor/device-management-period-management"
import type {  DetailProps } from './data'
import ProForm,{
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import moment from 'moment';
import ConfirmModal from './confirm-modal'
import { ExclamationCircleFilled } from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

type paramsItem= {
  operater: string;
  storeMobile: string;
  imei: string;
  storeName: string;
  memberPhone: string;
  freeTimes: string;
  effectiveDate: string;
  givenVoucher: string;
}

const CheckReportConfiguration: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, callback, onClose } = props;
  const [form] = Form.useForm();
  const userInfo = window.localStorage.getItem('user') as string;
  const user = userInfo && JSON.parse(userInfo);
  const [confirmVisible, setConfirmVisible] = useState<boolean>()
  const [params, setParams] = useState<paramsItem>()
  const [memberPhone, setMemberPhone] = useState<string>()

  const checkConfirm = (rule: any, value: string) => {
    return new Promise<void>(async (resolve, reject) => {
      if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
        await reject('请输入正确的手机号')
      }else {
        setMemberPhone(value)
        await resolve()
      }
    })
}

  useEffect(() => {
    form.setFieldsValue({
      storeMobile: datailMsg?.memberPhone,
      imei:datailMsg?.imei,
      storeName:datailMsg?.storeName
    })
  }, [datailMsg])

  return (
    <DrawerForm
      layout="horizontal"
      title="赠送启用服务次数"
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        searchConfig:{
          resetText:'返回',
          submitText:'提交'
        }
      }}
      onFinish={async (values) => {
        setConfirmVisible(true)
        setParams({
          operater: user?.username,
          storeMobile: values.storeMobile,
          imei: values.imei,
          storeName: values.storeName,
          memberPhone: values.memberPhone,
          freeTimes: values.freeTimes,
          effectiveDate: values.effectiveDate,
          givenVoucher: values.givenVoucher
        })
      }}
      {...formItemLayout}
    >
    <p style={{ marginBottom: -10, color:'#8D8D8D' }}>用户手机号：{datailMsg?.memberPhone}  &nbsp; 设备编号：{datailMsg?.imei}    &nbsp; 当前剩余管理期{datailMsg?.remainManageDayStr}天</p>
      <Divider />
      <ProFormText
       label='设备所属人手机号'
       name='storeMobile'
       readonly 
      />
      <ProFormText
       label='设备编号'
       name='imei'
       readonly 
      />
      <ProFormText
       label='设备所属人店铺名称'
       name='storeName'
       readonly 
      />
      <ProFormText
       label='赠送手指医生启用服务的用户手机'
       name='memberPhone'
       rules={[
        { required: true, message: '请输入用户手机号' },
        { validator: checkConfirm }
       ]}
       labelCol={{ span: 6 }}
       width={400}
      />
      <Space>
        <ProFormText
         label='赠送手指医生启用服务次数'
         name='freeTimes'
         fieldProps={{
            addonAfter: '次'
         }}
         rules={[
          {
            required: true,
            message: '请输入启用服务次数'
          },
          {
            pattern: /^[1-9]\d*$/, // 正则表达式，只允许输入数字（整数）
            message: '请输入正确的数字'
          }
        ]}
         width={400}
         labelCol={{ span: 8 }}
        />
        <ProFormText
         label='有效期'
         name='effectiveDate'
         fieldProps={{
            placeholder: '年/月/日',
            addonAfter: '前可用'
         }}
         rules={[
          {
            required: true,
            message: '请输入有效期'
          },
          {
            validator: (rule, value) => {
              const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/; // 正则表达式
              if (reg.test(value)) { // 如果符合日期格式
                const date = moment(value, 'YYYY-MM-DD'); // 使用 moment 处理日期
                if (date.isSameOrAfter(moment().startOf('day')) && date.isBefore(moment('2034-01-01'))) { // 如果大于或等于今天，且不超过2033年12月31日
                  return Promise.resolve();
                } else {
                  return Promise.reject('有效期需大于或等于当前日期，且不能超过2033年12月31日');
                }
              } else {
                return Promise.reject('请输入正确的日期格式，如 2023-01-01');
              }
            }
          }
        ]}
         width={400}
        />
      </Space>
      <ProForm.Item
        name='givenVoucher'
        label='上传申请调整启用次数凭证'
      >
        <Upload multiple maxCount={1} accept="image/*" />
      </ProForm.Item>

      {confirmVisible &&
        <ConfirmModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/> 请确认要为用户（{memberPhone}）赠送启用服务次数？</p>}
          params={params}
          callback={()=>{  setVisible(false); callback() }}
          api={ saveDeviceDoctor }
          resetText={'取消赠送'}
          submitText={'确认赠送'}
        />
      }
    </DrawerForm>
  )
}

export default CheckReportConfiguration;