import React, { useState } from 'react';
import { message, Tree, Checkbox } from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { visible, setVisible } = props;
  const [selectKeys, setSelectKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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

  const onSelectAll = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setSelectKeys(treeData.map(item => item.key));
    } else {
      setSelectKeys([]);
    }
    setSelectAll(checked);
  }

  const onCheck = (checkedKeys, e) => {
    console.log("🚀 ~ file: form.jsx ~ line 88 ~ onCheck ~ checkedKeys", checkedKeys)
    setSelectKeys(checkedKeys)
    setSelectAll(!treeData.some(item => {
      return !checkedKeys.includes(item.key);
    }))
  }

  const reset = () => {
    setSelectKeys([]);
    setSelectAll(false);
  }

  return (
    <ModalForm
      title="新建角色"
      modalProps={{
        onCancel: () => { console.log('run'); reset() },
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        reset();
        return true;
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        width="md"
        required
      />

      <div style={{ display: 'flex', paddingLeft: 55 }}>
        <div>角色权限</div>
        <div>
          <Checkbox
            onChange={onSelectAll}
            checked={selectAll}
            style={{ marginLeft: 23, marginBottom: 5 }}
          >
            全部功能
          </Checkbox>
          <Tree
            checkable
            treeData={treeData}
            checkedKeys={selectKeys}
            onCheck={onCheck}
            selectable={false}
            height={500}
          />
        </div>
      </div>

    </ModalForm>
  );
};