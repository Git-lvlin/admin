import { useEffect, useRef } from 'react';
import { message, Form } from 'antd';
import {
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';
import { provideSaveClassTagData } from '@/services/outpatient-service-management/supply-chain-commodity-label-management'

type MyComponentProps = {
  setVisible: (visible: boolean) => void;
  visible: boolean;
  callback: (data?: any) => void;
  onClose: () => void;
  msgDetail?: {
    name: string;
    sort: number;
    id: string;
    tagNum: number;
  };
}

export default (props:MyComponentProps) => {
  const { setVisible, visible, msgDetail, callback, onClose } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(()=>{
    if(msgDetail){
      form.setFieldsValue({
        ...msgDetail
      })
    }
  },[])


  const onsubmit = (values:{ name: string, sort: number }) => {
    const params={
      id: msgDetail?.id?msgDetail?.id:0,
      ...values
    }
    provideSaveClassTagData(params).then(res=>{
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
      layout='horizontal'
      title={<p style={{ fontWeight:'bold' }}>{msgDetail?.id?'编辑标签':'新增标签'} <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></p>}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={600}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel:()=>{
          onClose()
        }
      }}
      onFinish={async (values) => {
        await onsubmit(values);
      }}
      submitter={{
        searchConfig: {
          submitText: '确定',
          resetText: '取消'
        }
      }}
    >
      <ProFormText
        label='标签名称'
        name='name'
        width={200}
        rules={[
          { required: true, message: '请输入标签名称' },
          { min: 2, max: 6, message: '请输入2-6个字' }
        ]}
        placeholder='请输入2-6个字'
      />
       <ProFormText
        label='显示序号'
        name='sort'
        width={200}
        rules={[
          { required: true, message: '请输入显示序号' },
          { pattern: /^[0-9]*$/, message: '只能输入数字' }
        ]}
        placeholder='请输入显示序号，越小越靠前'
      />
    </ModalForm>
  );
};