import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormRadio
} from '@ant-design/pro-form';
import { addSubsidiary, subCompanyAdd } from "@/services/aed-team-leader/team-leader-management"
import type { EnteringProps } from "./data"
import AddressCascader from '@/components/address-cascader'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
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

export default (props:EnteringProps) => {
  const { visible, setVisible, callback,msgDetail,onClose,type,name,subId} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
      form.setFieldsValue({
        accountId:msgDetail?.accountId,
        agencyId:msgDetail?.id,
        subId: subId
      })
  },[])
  return (
    <ModalForm
      layout="horizontal"
      title={<p><strong>录入{type==1?'合作公司':'团长'}</strong> <span style={{ color:type==1?'#B5B2B2':'red',fontSize:'10px' }}>{type==1?'辅助信息':`所属合作公司名称：${name}`}</span></p>}
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
      submitter={{
        render: (props, defaultDoms) => {
            return [
            ...defaultDoms
            ];
        },
      }}
      onFinish={async (values) => {
        const { area= [], ...rest } = values
        try {
          const params={
            ...rest,
            provinceId: area[0]?.value,
            cityId: area[1]?.value,
            areaId: area[2]?.value,
            provinceName: area[0]?.label,
            cityName: area[1]?.label,
            areaName: area[2]?.label,
          }
          const api=type==1? subCompanyAdd:addSubsidiary
          api(params).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback(true)
            }
          })
        } catch (error) {
          console.log('error',error)
        }
      }}
      {...formItemLayout}
    >
      {
        type?<ProFormText
        width={250}
        label='合作公司名称'
        name="name"
        placeholder='请输入3-50个字符'
        fieldProps={{
          minLength: 3,
          maxLength: 50
        }}
      />:null
      }
      {
        type?<ProFormText
        width={250}
        label='负责人'
        name="manager"
        placeholder='请输入负责人姓名'
      />:null
      }
      {
        type?<ProFormText
        width={250}
        label='负责人手机'
        name="managerPhone"
        placeholder='请输入'
        rules={[{validator: checkConfirm}]}
      />:null
      }
      {
        type?<ProFormRadio.Group
        name="type"
        label='类型'
        options={[
          {
            label: '合作公司',
            value: 1,
          },
          {
            label: '非合作公司',
            value: 2,
          },
        ]}
      />:null
      }

      {
        !type&&<ProFormText
        width={250}
        label="团长手机号"
        name="phone"
        placeholder='请输入团长手机号'
        rules={[
          { required: true, message: '请输入团长手机号' },
          {validator: checkConfirm}
        ]}
        fieldProps={{
          maxLength:18
        }}
      />
      }
     
      {
        !type&&<ProFormText
        width={250}
        label='团长名称'
        name="name"
        placeholder='请输入团长名称'
      />
      }

      {type?
        <Form.Item
          label="地址"
          rules={[{ required: true, message: '请选择省市区' }]}
          name="area"
        >
        <AddressCascader style={{ width: 250 }} />
        </Form.Item>
        :null
      }
      
      <ProFormText
        name="subId"
        hidden
      />
    </ModalForm >
  );
};