import React, { useEffect } from 'react';
import { Form,Button } from 'antd';
import ProForm, {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';
import { categoryPercentAudit } from '@/services/intensive-activity-management/platfor-bonus-percentage-audit'
import { amountTransform } from '@/utils/utils'

const formItemLayout = {
    labelCol: { span: 5 },
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
  const { visible, setVisible, callback,formDetail,onClose} = props;
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length < 5) {
        await reject('最小长度为5')
      } else if (value&&/[%&',;=?$\x22]/.test(value)) {
        await reject('不可以含特殊字符')
      } else {
        await resolve()
      }
    })
  }
  return (
    <ModalForm
      title={formDetail?.type==1?'编辑绑定支付宝':'绑定记录'}
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
          if(formDetail?.type==1){
            return [
              ...defaultDoms
              ];
          }else{
            return <Button type="primary" onClick={()=>{setVisible(false);onClose()}}>知道了</Button>
          }

        },
        }}
        onFinish={async (values) => {
          const params={
            id:formDetail?.id,
            storeAuditPercent:formDetail?.storeAuditPercent,
            ...values
          }
          categoryPercentAudit(params).then(res=>{
            if(res.code==0){
              setVisible(false)
              callback(true)
            }
          })
        }}
      {...formItemLayout}
    >
        <ProFormText
            width={250}
            label="用户可修改绑定"
            name="name"
            fieldProps={{
             addonAfter:'次'
            }}
            readonly={formDetail?.type==2}
        />
         <ProFormText
            width={250}
            label="原支付宝账号"
            name="name"
            readonly={formDetail?.type==2}
        />
         <ProFormText
            // width={250}
            label="原支付宝真实姓名"
            name="name"
            // labelCol={6}
            fieldProps={{
             addonAfter:'次'
            }}
            fieldProps={{
             addonAfter:'绑定时间：20220101 12:56'
          }}
          readonly={formDetail?.type==2}
        />
        <ProFormText
            width={250}
            label="支付宝账号"
            name="name"
            readonly={formDetail?.type==2}
        />
        <ProFormText
            width={250}
            label="支付宝真实姓名"
            name="name"
            readonly={formDetail?.type==2}
        />
    </ModalForm >
  );
};