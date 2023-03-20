import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import { fingerDoctorCover, fingerDoctorEditCover } from "@/services/finger-doctor/device-management-period-management"
import type {  DetailProps, DataType } from './data'
import ProForm,{
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import AddressCascader from '@/components/address-cascader'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

const checkConfirm = (rule: any, value: string) => {
  return new Promise<void>(async (resolve, reject) => {
    if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      await reject('请输入正确的手机号')
    }else {
      await resolve()
    }
  })
}

const CheckReportConfiguration: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, callback,onClose } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    (fingerDoctorCover({
      imei:datailMsg?.imei
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        form.setFieldsValue({
          area:res.data.provinceId?[
            {
              label: res.data.provinceName,
              value: res.data.provinceId,
            }, {
              label: res.data.cityName,
              value: res.data.cityId,
            },
            {
              label: res.data.areaName,
              value: res.data.areaId,
            }
          ]:null,
          memberPhone: datailMsg?.memberPhone,
          ...res.data,
          imei:datailMsg?.imei
        })
      }
    }).finally(() => {

    })
  }, [datailMsg])

  return (
    <DrawerForm
      layout="horizontal"
      title="设备检测报告封面信息配置"
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
          provinceName: values?.area[0].label,
          provinceId: values?.area[0]?.value,
          cityName: values?.area[1].label,
          cityId: values?.area[1]?.value,
          areaName: values?.area[2].label,
          areaId: values?.area[2]?.value,
          ...values,
          
        }
        fingerDoctorEditCover(params).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback()
          }
        })
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
       label='设备检测报告联系人'
       name='name'
       fieldProps={{
        placeholder:"请输入报告联系人姓名，16个汉字以内",
        maxLength: 16
       }}
       rules={[{ pattern: /^[\u4e00-\u9fa5]{1,16}$/, message: '请输入16个汉字以内的姓名' }]}
       width={400}
      />
      <ProFormText
       label='设备检测报告联系手机'
       name='phone'
       fieldProps={{
        placeholder:"请输入",
       }}
       rules={[{ validator: checkConfirm }]}
       width={400}
      />
      <ProForm.Item
        name='area'
        label='设备检测报告地址'
      >
        <AddressCascader placeholder="请选择所在街道" style={{ width:'400px' }}/>
      </ProForm.Item>
      <div style={{ marginLeft:'190px' }}>
      <ProFormText
       width={400}
       name='detailAddress'
       fieldProps={{
        placeholder:"请输入详细地址，60个字以内",
        maxLength: 60
       }}
      />
      </div>
    </DrawerForm>
  )
}

export default CheckReportConfiguration;
