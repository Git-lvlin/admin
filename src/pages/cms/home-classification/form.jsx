import React, { useRef, useEffect, useState } from 'react';
import { message, Form, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormSwitch,
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { homeClassCategorySecondCategory } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible, onChangeSwitch } = props;
  const formRef = useRef();
  const [list, setList] = useState()
  const [form] = Form.useForm();

  const waitTime = () => {
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  useEffect(() => {
    homeClassCategorySecondCategory({parentId:detailData.id}).then((res) => {
      setList(res.data.records)
    })
  }, [])

  return (
    <ModalForm
      width={400}
      title={`${detailData.gcName}`}
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
        二级分类
      </ProForm.Group>
      <ProForm.Group style={{textAlign: 'center'}}>
        {list&&<ProCard>
          {list.map((item) => {
            return <ProForm.Group style={{borderBottom: '1px solid #f0f0f0'}}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} src={item.gcIcon}/>
              <span style={{width: 120}}>{item.gcName}</span>
              <ProFormSwitch
                name={item.id}
                fieldProps={{
                  style: {marginTop: 24},
                  defaultChecked:item.homeStatus?true:false,
                  onChange: () => {
                    item.homeStatus = item.homeStatus?0:1
                    onChangeSwitch(item)
                  },
                }}
              />
              </ProForm.Group>
          })}
        </ProCard>}
      </ProForm.Group>
      <ProFormText
        name="id"
        label="id"
        hidden
      />
    </ModalForm>
  );
};