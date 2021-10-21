import React, { useRef,useEffect } from 'react';
import { Button, message, Form } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import { articleTypeDetail,articleTypeAdd } from '@/services/business-school/save-or-update-article-type';


const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};


export default (props) => {
  const { setVisible, onClose, visible,detailData,callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const waitTime = (values) => {
    if (detailData?.id){
      values.id=detailData?.id
    }
    articleTypeAdd( values).then((res) => {
      if (res.code === 0) {
        message.success(detailData?.id?'编辑成功':'提交成功');
        setVisible(false)
        callback(true)
      }
    })
  };
  useEffect(() => {
    if (detailData?.id) {
      articleTypeDetail({id:detailData.id}).then(res=>{
        form.setFieldsValue({
          ...res.data
        })
      })
    }
  }, [form,detailData])

  return (
    <DrawerForm
      title={detailData?.id?'编辑分类':'新建分类'}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      {...formItemLayout}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                提交
              </Button>,
              <Button type="default" onClick={() => history.goBack()}>
                返回
              </Button>
            ];
          }
        }
      }
      onFinish={async (values) => {
        await waitTime(values);
        return true;
      }}
    >
      
        <ProFormText
            name="typeName"
            label="名称"
            placeholder="请输入分类名称，2-6个字符"
            rules={[{ required: true, message: '请输入分类名称，2-6个字符' }]}
            fieldProps={{
              maxLength: 6,
            }}
          />
      
      
        <ProFormText
            name="sortNum"
            label="序号"
            placeholder="请输入展示数字序号，升序展示，正整数"
            rules={[{ required: true, message: '请输入展示数字序号，升序展示，正整数' }]}
            fieldProps={{
              maxLength: 16,
            }}
          />
      
      
        <ProFormText
            name="typeDesc"
            label="描述"
            placeholder="请输入分类描述，30字以内"
            rules={[{ required: false, message: '请输入分类描述，30字以内' }]}
            fieldProps={{
              maxLength: 30,
            }}
          />
      
      <ProFormRadio.Group
          name="isShow"
          label="状态"
          required
          options={[
            {
              label: '开启',
              value: 1,
            },
            {
              label: '关闭',
              value: 0,
            },
          ]}
        />
    </DrawerForm>
  );
};