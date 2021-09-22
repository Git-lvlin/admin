import React, { useRef, useEffect } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { bannerAdd } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible, verifyVersionId } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const waitTime = (values) => {
    const { id, ...rest } = values
    const param = {
      ...rest
    }
    if (id) {
      param.id = id
    }
  
    if (verifyVersionId) {
      param.verifyVersionId = verifyVersionId
    }
    return new Promise((resolve, reject) => {
      bannerAdd(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        } else {
          reject(false);
        }
      })
  
    });
  };

  useEffect(() => {
    if (detailData) {
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      title={`${detailData ? '编辑' : '新建'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序序号' }]}  
        />
      </ProForm.Group>
      <ProForm.Group>
        二级分类
        <ProForm.Group>
          <ProCard>
          </ProCard>
        </ProForm.Group>
      </ProForm.Group>
      <ProFormText
        name="id"
        label="id"
        hidden
      />
    </ModalForm>
  );
};