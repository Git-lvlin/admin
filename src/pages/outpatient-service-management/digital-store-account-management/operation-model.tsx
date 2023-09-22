import { useRef } from 'react';
import { message, Form } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { ExclamationCircleFilled} from '@ant-design/icons';
import { providerAdd, accountAddProvider } from '@/services/outpatient-service-management/digital-store-account-management'

export default (props) => {
  const { setVisible, visible, msgDetail, callback, type } = props;
  const formRef = useRef();
  const [form] = Form.useForm();


  const onsubmit = () => {
    const params={
      ...msgDetail
    }
    const api=type==1?providerAdd:accountAddProvider
    api(params).then(res=>{
      if(res.code==0){
        callback()
        setVisible(false)
        message.success('操作成功')
      }
    })
  };

  return (
    <ModalForm
      key="sort"
      title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/>确认添加{type==1?'数字化门店账号':'服务区域'}？</p>}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel:()=>{
        }
      }}
      onFinish={async () => {
        await onsubmit();
      }}
      submitter={{
        searchConfig: {
          submitText: '确认添加',
          resetText: '不添加'
        }
      }}
    >
      <p style={{ color:'red' }}>确认后将创建成功 <span style={{ color:'#999999' }}>你还要继续吗？</span></p>
    </ModalForm>
  );
};