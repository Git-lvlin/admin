import { useState, useRef } from 'react';
import { Form,Button } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';
import { accountCityResetPwd } from "@/services/city-office-management/hydrogen-atom-generation/generation-management"
import ConfirmModel from './confirm-model';
import type { FormInstance } from "@ant-design/pro-form"

const checkConfirm = (rule: any, value: string, callback: any) => {
return new Promise<void>(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
    await reject('请输入正确的手机号')
    }else {
    await resolve()
    }
})
}

export default ( props: { visible: boolean; setVisible: any; callback: any; } ) => {
  const { visible, setVisible, callback} = props;
  const [ confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [form] = Form.useForm();
  const [ phone, setPhone ] = useState<string>('')
  const ref=useRef<FormInstance>()
  return (
    <ModalForm
      title='修改指定用户每日可启用氢原子次数'
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      formRef={ref}
      submitter={{
        render: (props, defaultDoms) => {
            return [
            <span style={{display:'inline-block',marginRight:'330px',color:'#E58101'}}>修改后立即生效，请慎重确认无误后再操作！</span>,
            <Button type="default" onClick={() => { setVisible(false) }}>
                取消
            </Button>,
            <Button type="primary" key="submit" onClick={() =>{ phone?setConfirmVisible(true):props?.form?.submit()}}>
                确定
            </Button>,
            ];
        },
      }}
      onFinish={async (values) => {
        accountCityResetPwd(values).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      <ProFormText
        name="accountId"
        label='用户手机'
        rules={[
          { required: true, message: '请输入手机号码' },
          { validator: checkConfirm}
        ]}
        fieldProps={{
            onChange:(val)=>{
              setPhone(val?.target?.value)
            }
        }}
      />
      <ProFormText
        name="agencyId"
        label='可启动次数修改为'
        fieldProps={{
            addonAfter:'次/日'
        }}
        labelCol={{ span: 5 }}
        rules={[{ required: true, message: '请输入启动次数' }]}
        extra={<span style={{ color:'#E58101' }}>仅限对租赁的氢原子设备启动</span>}
      />
      <ProFormTextArea
        name=''
        label='修改原因'
        fieldProps={{
            minLength:5,
            maxLength:20
        }}
        rules={[{ required: true, message: '请填写修改原因' }]}
        placeholder='请输入5-20个字符'
      />
      <ProFormText
        name=''
        label='操作人'
        readonly
      />
      {
        confirmVisible&&
        <ConfirmModel
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          callback={()=>{ ref.current?.submit?.(); }}
          msgDetail={ phone }
        />
      }
    </ModalForm >
  );
};