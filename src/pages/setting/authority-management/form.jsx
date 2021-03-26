import React from 'react';
import { message, Form, TreeSelect } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormDependency,
} from '@ant-design/pro-form';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { visible, setVisible } = props;
  const formItemLayout = {
    labelCol: { span: 6 },
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

  return (
    <ModalForm
      title="新建权限"
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormSelect
        options={[
          {
            value: '1',
            label: '菜单',
          },
          {
            value: '2',
            label: '页面',
          },
          {
            value: '3',
            label: '按钮',
          },
        ]}
        width="md"
        name="useMode"
        label="类型"
        rules={[{ required: true, message: '请选择类型！' }]}
      />

      <ProFormText
        name="name1"
        label="名称"
        placeholder="请输入名称"
        width="md"
        rules={[{ required: true, message: '请输入名称！' }]}
      />

      <ProFormText
        name="name2"
        label="权限编码"
        placeholder="请输入权限编码"
        width="md"
        rules={[{ required: true, message: '请输入权限编码！' }]}
      />

      <ProFormDependency name={['useMode']}>
        {({ useMode }) => {
          return (useMode !== '3' && !!useMode) ? <ProFormText
            name="name3"
            label={`${useMode === '1' ? '菜单' : '页面'}URL`}
            placeholder={`请输入${useMode === '1' ? '菜单' : '页面'}URL`}
            width="md"
            rules={[{ required: true, message: `请输入${useMode === '1' ? '菜单' : '页面'}URL` }]}
          /> : null
        }}
      </ProFormDependency>

      <ProFormDependency name={['useMode']}>
        {({ useMode }) => {
          return useMode === '3' ? <ProFormText
            name="name3"
            label="接口URL"
            placeholder="请输入接口URL"
            width="md"
            rules={[{ required: true, message: '请输入接口URL！' }]}
          /> : null
        }}
      </ProFormDependency>

      <ProFormDependency name={['useMode']}>
        {({ useMode }) => {
          return useMode === '2' ? <Form.Item label="所属菜单" name="parentId">
            <TreeSelect
              style={{ width: 328 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={[
                {
                  title: 'Node1',
                  value: '0-0',
                  children: [
                    {
                      title: 'Child Node1',
                      value: '0-0-1',
                    },
                    {
                      title: 'Child Node2',
                      value: '0-0-2',
                    },
                  ],
                },
                {
                  title: 'Node2',
                  value: '0-1',
                },
              ]}
              placeholder="请选择"
              treeDefaultExpandAll
            />
          </Form.Item> : null
        }}
      </ProFormDependency>

      <ProFormDependency name={['useMode']}>
        {({ useMode }) => {
          return useMode === '3' ? <Form.Item label="所属页面" name="parentId" rules={[{ required: true, message: '请选择所属页面！' }]}>
            <TreeSelect
              style={{ width: 328 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={[
                {
                  title: 'Node1',
                  value: '0-0',
                  children: [
                    {
                      title: 'Child Node1',
                      value: '0-0-1',
                    },
                    {
                      title: 'Child Node2',
                      value: '0-0-2',
                    },
                  ],
                },
                {
                  title: 'Node2',
                  value: '0-1',
                },
              ]}
              placeholder="请选择"
              treeDefaultExpandAll
            />
          </Form.Item> : null
        }}
      </ProFormDependency>

    </ModalForm>
  );
};