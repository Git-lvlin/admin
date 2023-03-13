import React, { useEffect, useState } from 'react';
import { Form, Divider } from 'antd';
import { getUser } from "@/services/finger-doctor/user-health-data-management"
import type {  DetailProps, DataType } from './data'
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';

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

const StartingChargeConfiguration: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, onClose } = props;
  const [detailData, setDetailData] = useState<DataType>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    (getUser({
      imei:datailMsg?.imei
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [datailMsg])

  return (
    <DrawerForm
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
        // const params={
        //   ...values,
        //   password:values?.password&&md5(values?.password)
        // }
        // accountEdit(params).then(res=>{
        //   if(res.code==0){
        //     setVisible(false)
        //     callback(true)
        //   }
        // })
      }}
      {...formItemLayout}
    >
    <p style={{ marginBottom: -10, color:'#8D8D8D' }}>用户手机号：{datailMsg?.memberPhone}  &nbsp; 设备编号：{datailMsg?.imei}    &nbsp; 当前剩余管理期{datailMsg?.remainManageDayStr}天</p>
      <Divider />
      <ProFormText
       label='设备编号'
       name=''
       readonly 
      />
      <ProFormText
       label='设备所属人手机号'
       name=''
       readonly 
      />
      <ProFormText
       label='设备启动费金额'
       name=''
       fieldProps={{
        placeholder:"请输入手指医生扫码启用费金额，最低1.00元，最高9999.99元",
        addonAfter: '元'
       }}
      />
    </DrawerForm>
  )
}

export default StartingChargeConfiguration;
