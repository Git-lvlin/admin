import React, { useEffect, useState } from 'react';
import { Form, Divider } from 'antd';
import { queryMemberDevice, modifyStartFee } from "@/services/finger-doctor/device-management-period-management"
import type {  DetailProps, DetailType } from './data'
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils';
import ConfirmModal from './confirm-modal'
import { ExclamationCircleFilled } from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

type paramsItem = {
  imei: string;
  memberPhone: string;
  startFee: number;
}

const StartingChargeConfiguration: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg,callback, onClose } = props;
  const [form] = Form.useForm();
  const [confirmVisible, setConfirmVisible] = useState<boolean>()
  const [params, setParams] = useState<paramsItem | undefined>()

  useEffect(() => {
    (queryMemberDevice({
      imei:datailMsg?.imei
    }) as Promise<{ data: DetailType, code: number }>).then(res => {
      if (res.code === 0) {
        if (res.code === 0) {
          form.setFieldsValue({
            startFee:amountTransform(datailMsg?.startFee,'/'),
            ...res.data
          })
        }
      }
    }).finally(() => {

    })
  }, [])

  return (
    <DrawerForm
      layout="horizontal"
      title="设备启动费配置"
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
          submitText:'保存'
        }
      }}
      onFinish={async (values) => {
        const params={
          ...values,
          startFee:amountTransform(values?.startFee,'*')
        }
        setConfirmVisible(true)
        setParams(params)
      }}
      {...formItemLayout}
    >
    <p style={{ marginBottom: -10, color:'#8D8D8D' }}>用户手机号：{datailMsg?.memberPhone}  &nbsp; 设备编号：{datailMsg?.imei}    &nbsp; 当前剩余管理期{datailMsg?.remainManageDayStr}天</p>
      <Divider />
      <ProFormText
       label='设备编号'
       name='imei'
       readonly 
      />
      <ProFormText
       label='设备所属人手机号'
       name='memberPhone'
       readonly 
      />
      <ProFormText
       label='设备启动费金额'
       name='startFee'
       fieldProps={{
        placeholder:"请输入手指医生扫码启用费金额，最低1.00元，最高9999.99元",
        addonAfter: '元'
       }}
       rules={[
        () => ({
          validator(_, value) {
            if (value&&!/^\d+\.?\d*$/g.test(value) || value <1 || value > 9999.99 || `${value}`?.split?.('.')?.[1]?.length > 2) {
              return Promise.reject(new Error('请输入1.00-9999.99,保留2位小数'));
            }
            return Promise.resolve();
          },
        })
      ]}
      />
      {confirmVisible &&
        <ConfirmModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/> 请确认要修改设备（编号：{datailMsg?.imei}）启动费么？</p>}
          params={params}
          callback={()=>{  setVisible(false); callback() }}
          api={ modifyStartFee }
          resetText={'取消修改'}
          submitText={'确认修改'}
        />
      }
    </DrawerForm>
  )
}

export default StartingChargeConfiguration;
