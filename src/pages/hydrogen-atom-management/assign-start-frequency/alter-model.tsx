import { useState, useRef,useEffect } from 'react';
import { Form,Button } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';
import { modify,queryMemberBootTimes,save } from "@/services/hydrogen-atom-management/assign-start-frequency"
import ConfirmModel from './confirm-model';
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

const checkConfirm = (rule: any, value: string, callback: any) => {
return new Promise<void>(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
    await reject('请输入正确的手机号')
    }else {
    await resolve()
    }
})
}

const checkConfirm2 = (rule, value, callback) => {
  return new Promise(async (resolve, reject) => {
    if (value && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
      await reject('只能输入正整数')
    }else {
      await resolve()
    }
  })
}

export default ( props: { visible: boolean; setVisible: any; callback: any; msgDetail:TableProps,onClose:any } ) => {
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [ confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [form] = Form.useForm();
  const [ phone, setPhone ] = useState<string>('')
  const ref=useRef<FormInstance>()
  const user=JSON.parse(window.localStorage.getItem('user'))

  useEffect(()=>{
    if(msgDetail){
      form.setFieldsValue(msgDetail)
    }
  },[msgDetail])

  return (
    <ModalForm
      title={msgDetail?'修改指定用户每日可启用氢原子次数':'添加指定用户每日可启用氢原子次数'}
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
      formRef={ref}
      submitter={{
        render: (props, defaultDoms) => {
            return [
            <span style={{display:'inline-block',marginRight:'330px',color:'#E58101'}}>{msgDetail?'修改后立即生效，请慎重确认无误后再操作！':null}</span>,
            <Button type="default" onClick={() => { setVisible(false) }}>
                取消
            </Button>,
            <Button type="primary" key="submit" onClick={() =>{ msgDetail?setConfirmVisible(true):props?.form?.submit()}}>
                确定
            </Button>,
            ];
        },
      }}
      onFinish={async (values) => {
        if(msgDetail){
          const params={
            updater:user?.username,
            updateId:user?.id,
            ...values
          }
          modify(params).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback(true)
            }
          })
        }else{
          save(values).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback(true)
            }
          })
        }

      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      <ProFormText
        name="memberPhone"
        label='用户手机'
        rules={[
          { required: true, message: '请输入手机号码' },
          { validator: checkConfirm}
        ]}
        fieldProps={{
            onChange:(val)=>{
              setPhone(val?.target?.value)
            },
            onBlur:()=>{
              queryMemberBootTimes({ memberPhone:phone }).then(res=>{
                if(res.code==0){
                  form.setFieldsValue(res?.data)
                }
              })
            }
        }}
      />
      <ProFormText
        name="times"
        label='可启动次数修改为'
        fieldProps={{
            addonAfter:'次/日'
        }}
        labelCol={{ span: 5 }}
        rules={[
          { required: true, message: '请输入启动次数' },
          { validator: checkConfirm2}
        ]}
        extra={<span style={{ color:'#E58101' }}>仅限对租赁的氢原子设备启动</span>}
      />
      <ProFormTextArea
        name='modifyReason'
        label='修改原因'
        fieldProps={{
            minLength:5,
            maxLength:20
        }}
        rules={[{ required: true, message: '请填写修改原因' }]}
        placeholder='请输入5-20个字符'
      />
      <ProFormText
        name='creator'
        label='操作人'
        readonly
      />
      <ProFormText
        name='id'
        hidden
      />
      <ProFormText
        name='createId'
        hidden
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