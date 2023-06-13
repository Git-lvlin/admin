import { useEffect,useState } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import { deviceFreeUseSave,queryByMobile } from "@/services/user-management/hydrogen-atom-user-management"
import TimeSelect from '@/components/time-select'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

const checkConfirm = (rule, value, callback) => {
  return new Promise(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      await reject('请输入正确的手机号')
    }else {
      await resolve()
    }
  })
}

const checkConfirm2=(rule, value, callback)=>{
  return new Promise(async (resolve, reject) => {
  if (value&&value.length<5) {
      await reject('至少5个字符')
  }else {
      await resolve()
  }
  })
}

export default (props) => {
  const { visible, setVisible,onClose} = props;
  const [form] = Form.useForm();
  const [phone, setPhone] = useState()
  const user=JSON.parse(window.localStorage.getItem('user'))
  useEffect(()=>{
    if(phone&&phone.length==11){
      queryByMobile({memberPhone:phone}).then(res=>{
        if(res?.code === 0){
          form.setFieldsValue({
            ...res.data,
            memberPhone:phone,
            usableTimes:res.data?.usableTimes?`${res.data?.usableTimes}次  于 ${res.data?.freeEndTime} 失效`:'0次',
            operater:user?.username
          })
        }
      })
    }
  },[phone])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
       deviceFreeUseSave(values).then((res) => {
        if (res.code === 0) {
          resolve(true);
          onClose();
        } else {
          reject(false);
        }
      })

    });
  };
  return (
    <ModalForm
      title={<span style={{ fontWeight:'bold' }}>添加免费启用氢原子机会 </span>}
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
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='免费用户手机'
        name="memberPhone"
        rules={[
          { required: true, message: '请输入手机号' },
          { validator: checkConfirm }
        ]}
        fieldProps={{
          onChange:(val)=>{
            setPhone(val.target.value)
          }
        }}
      />
      <ProFormText
        label='用户注册时间'
        name="memberRegisterTime"
        readonly
      />
      {/* <ProFormText
        label='用户所在地区'
        name="address"
        readonly
      /> */}
      <ProFormText
        label='用户还有免费机会'
        name="usableTimes"  
        readonly
      />
      <ProFormText
        label='免费次数'
        name="freeTimes"
        rules={[{ required: true, message: '请输入免费次数' }]}
        fieldProps={{
          addonAfter:'次'
        }}
      />
      <ProForm.Item
        label="免费有效期"
        rules={[{ required: true, message: '请选择有效期' }]}
        name="time"
      >
        <TimeSelect/>
      </ProForm.Item>
      <ProFormTextArea
        label='免费原因'
        name="freeReason"
        rules={[
          { required: true, message: '请输入免费原因' },
          { validator: checkConfirm2 }
        ]}
        fieldProps={{
          minLength:5,
          placeholder:'请输入至少5个字符'
        }}
      />
      <ProFormText
        label='操作人'
        name="operater"
        readonly
      />
      <ProFormText
        name="operateId"
        hidden
      />
    </ModalForm >
  );
};
