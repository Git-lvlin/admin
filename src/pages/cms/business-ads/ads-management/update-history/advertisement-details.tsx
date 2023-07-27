import { useEffect } from 'react';
import { Form, message, Button } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { CumulativeProps } from './data';
import { advPositionPage } from "@/services/cms/tripartite-advertising-data-statistics"

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail, callback } = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    advPositionPage({code:msgDetail?.positionCode}).then(res=>{
      console.log('res',res)
      form.setFieldsValue({
        ...res.data?.[0],
        switch:res.data?.[0]?.switch==1?'开启':"关闭",
        maxPerPersonPerDay: `${res.data?.[0]?.maxPerPersonPerDay}次`,
        intervalDisplay:`${res.data?.[0]?.intervalDisplay}秒`
      })
    })
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
        name="title"
        readonly
      />
      <ProFormText
        label='广告类型'
        name="adTypeDesc"
        readonly
      />
      {/* <ProFormText
        label='样式'
        name="adTypeDesc"
        readonly
      />
      <ProFormText
        label='展示次序'
        name="displayOder"
        readonly
      /> */}
      <ProFormText
        label='每人每日最多展示'
        name="maxPerPersonPerDay"
        readonly
      />
      <ProFormText
        label='间隔展示最短时间'
        name="intervalDisplay"
        readonly
      />
      <ProFormText
        label='备注'
        name="remark"
        readonly
      />
      <ProFormText
        label='展示状态'
        name="switch"
        readonly
      />
      <ProFormText
        label='操作人'
        name="optAdminName"
        readonly
      />
    </ModalForm >
  );
};
