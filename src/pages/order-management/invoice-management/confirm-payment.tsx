import { useEffect } from "react"
import { Form,message } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
  ProFormRadio,
  ProFormDependency
} from '@ant-design/pro-form';
import { updateAdminPayInfo } from "@/services/order-management/invoice-management"
import Upload from '@/components/upload';

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


const checkConfirm=(rule, value, callback)=>{
  return new Promise(async (resolve, reject) => {
      if(value&&!/^[0-9]+(.[0-9]{0,2})?$/.test(value)){
          await reject('只能输入数字，最多输入两位小数点')
      } else {
      await resolve()
  }
  })
}
const checkConfirm2=(rule, value, callback)=>{
  return new Promise(async (resolve, reject) => {
      if(value&&value.length<5){
          await reject('最少5个字符')
      } else {
      await resolve()
  }
  })
}

export default (props) => {
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])
  const waitTime = (values) => {
    return new Promise((resolve, reject) => {
        updateAdminPayInfo(values).then((res) => {
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
      title={<><span style={{ fontWeight:'bold' }}>确认支付</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
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
      <ProFormRadio.Group
        name="payStatus"
        label="支付状态"
        rules={[{ required: true, message: '请选择支付状态' }]}
        options={[
            {
                label: '已支付',
                value: 1
            },
            {
                label: '无需支付',
                value: 2
            },
        ]}
        initialValue={1}
      />
      <ProFormDependency name={['payStatus']}>
        {({ payStatus }) => { 
          if(payStatus==1){
            return  <>
                    <ProFormText
                      label='支付金额'
                      name="payAmount"
                      rules={[ { validator: checkConfirm }]} 
                    />
                    <Form.Item name='payUrl' label='支付凭证图片'>
                      <Upload  multiple maxCount={1} accept=".png, .jpg, .jpeg, .pdf" code={308} size={1 * 1024}/>
                    </Form.Item>
                    </>
          }
          if(payStatus==2){
            return null
          }
        }}
      </ProFormDependency>
      <ProFormTextArea
        label='备注'
        name="payRemark"
        fieldProps={{
          minLength:5,
          placeholder:'请输入至少5个字符'
        }}
        rules={[
          { required: true, message: '请填写备注' },
          { validator: checkConfirm2 }
        ]}
      />
      <ProFormText
        name="id"
        hidden
      />
    </ModalForm >
  );
};
