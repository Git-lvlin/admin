import React from 'react';
import { Form,List } from 'antd';
import {
  ModalForm
} from '@ant-design/pro-form';


export default (props) => {
  const { visible, setVisible,phones,onClose} = props;
  const [form] = Form.useForm();
  return (
    <ModalForm
      title='查看指定中奖人'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return []
        },
        }}
        onFinish={async (values) => {
        }} 
    >
        <List
              itemLayout="horizontal"
              dataSource={phones?.split(',')}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item}
                  />
                </List.Item>
              )}
        />
    </ModalForm >
  );
};