import { useEffect } from 'react';
import { Form, Button } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { CumulativeProps } from './data';

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail } = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue(msgDetail)
  },[msgDetail])
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>注销明细</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return <Button type="primary" onClick={()=>{setVisible(false)}}>关闭</Button>
        },
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='注销申请原因'
        name="reason"
        readonly
      />
      <ProFormText
        label='注销申请时间'
        name="createTime"
        readonly
      />
      <ProFormText
        label='确认注销类型'
        name="type"
        readonly
      />
      <Form.Item
        label="申请凭证"
        name="urlArr"
        >
        <Upload multiple  maxCount={3} accept="image/*" readonly/>
      </Form.Item>
      
      <ProFormTextArea
        label='备注'
        name="remark"
        readonly
      />
       <ProFormText
        label='确认注销操作人'
        name={["operator","nickName"]}
        readonly
      />
       <ProFormText
        label='确认注销时间'
        name="finishTime"
        readonly
      />
    </ModalForm >
  );
};
