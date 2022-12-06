import { useEffect } from "react"
import { Form, Button, message } from 'antd';
import {
  ProFormText,
  ProFormRadio,
  ModalForm,
  ProFormDependency
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import { updateAdminInvoiceInfo} from "@/services/order-management/invoice-management"

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
        updateAdminInvoiceInfo(values).then((res) => {
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
      title={<span style={{ fontWeight:'bold' }}>修改开票信息</span>}
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
        message.success('修改成功');
        return true;
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
                <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确认修改
                </Button>
            ]
        }
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='税费'
        name="payAmount"
        fieldProps={{
          value:`￥${msgDetail?.editInfo?.payAmount}（${msgDetail?.editInfo?.payStatus==1?'已支付':'无需支付'}）`
        }}
        readonly
      />
      <ProFormRadio.Group
        label='发票类型'
        name="invType"
        options={[
          {
            value: 1,
            label: '普通发票',
          },
          {
            value: 2,
            label: '专用发票',
          }
        ]}
      />
    <ProFormDependency name={['invType']}>
      {({ invType })=>{
        if(invType==1){
          return <ProFormRadio.Group
                    label='抬头类型'
                    name="invTitleType"
                    options={[
                      {
                        value: 1,
                        label: '个人',
                      },
                      {
                        value: 2,
                        label: '单位',
                      }
                    ]}
                  />
        }
        if(invType==2){
          return <ProFormRadio.Group
                  label='抬头类型'
                  name="invTitleType"
                  options={[
                    {
                      value: 2,
                      label: '单位',
                    }
                  ]}
                />
        }
      }}
    </ProFormDependency>
      
      <ProFormDependency name={['invTitleType']}>
        {({ invTitleType }) => { 
          if(invTitleType==1){
            return  <ProFormText
                      label='抬头名称'
                      name="invTitleName"
                    />
          }
          if(invTitleType==2){
            return <>
                    <ProFormText
                      label='抬头名称'
                      name="invTitleName"
                    />
                    <ProFormText
                      label='单位税号'
                      name="invNumber"
                    />
                    <ProFormText
                      label='开户银行'
                      name="invBankName"
                    />
                    <ProFormText
                      label='银行账号'
                      name="invBankNo"
                    />
                    <ProFormText
                      label='单位地址'
                      name="invAddress"
                    />
                    <ProFormText
                      label='单位电话'
                      name="invPhone"
                    />
                    <ProFormText
                      label='接收邮箱'
                      name="invEmail"
                    />
                   </>
          }
        }}
      </ProFormDependency>
      
      <ProFormText
        name="id"
        hidden
      />
      <ProFormText
        name="supplierId"
        hidden
      />
    </ModalForm >
  );
};
