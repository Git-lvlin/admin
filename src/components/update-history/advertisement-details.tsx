import { useEffect } from 'react';
import { Form, message, Button } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { CumulativeProps } from './data';
import { cancelConfirm } from '@/services/user-management/cancellation-application-record'

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail, callback } = props;
  const [form] = Form.useForm();
  const waitTime = (values: { id:string,remark:string,voucher:string}) => {
    cancelConfirm({id:msgDetail?.id,remark:values.remark,voucher:values.voucher}).then(res=>{
      if(res.code==0){
        message.success('操作成功')
        callback()
        setVisible(false)
      }
    })
  };
  useEffect(()=>{
    form.setFieldsValue(msgDetail)
  },[msgDetail])
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>广告详情</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(values);
        return true;
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
            <span style={{display:'inline-block',marginRight:'370px',color:'#979797'}}>app切换到后台超过3分钟后，再切换到前台时展示</span>,
            <Button type="primary" onClick={() => setVisible(false)}>
              关闭
            </Button>
            ];
        },
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='前端位置'
        name="reason"
        readonly
      />
      <ProFormText
        label='广告名称'
        name="createTime"
        readonly
      />
      <ProFormText
        label='样式'
        name="createTime"
        readonly
      />
      <ProFormText
        label='展示次序'
        name="createTime"
        readonly
      />
      <ProFormText
        label='每人每日最多展示'
        name="createTime"
        readonly
      />
      <ProFormText
        label='备注'
        name="createTime"
        readonly
      />
      <ProFormText
        label='展示状态'
        name="createTime"
        readonly
      />
      <ProFormText
        label='操作人'
        name="createTime"
        readonly
      />
    </ModalForm >
  );
};
