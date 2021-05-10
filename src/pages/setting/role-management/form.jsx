import React, { useState } from 'react';
import { message, Tree, Checkbox } from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import * as api from '@/services/setting/role-management'

export default (props) => {
  const { visible, setVisible, treeData, data } = props;
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
      setSelectKeys(data.map(item => item.id));
    } else {
      setSelectKeys([]);
    }
    setSelectAll(checked);
  }

  const onCheck = (checkedKeys) => {
    setSelectKeys(checkedKeys)
    setSelectAll(!treeData.some(item => {
      return !checkedKeys.includes(item.key);
    }))
  }

  const reset = () => {
    setSelectKeys([]);
    setSelectAll(false);
  }

  const submit = (values) => {
    const { title } = values;
    return new Promise((resolve, reject) => {
      api.groupAdd({
        title,
        status:1,
        rules: selectKeys.join(',')
      }, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  return (
    <ModalForm
      title="新建角色"
      modalProps={{
        onCancel: () => { reset() },
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        await submit(values)
        reset();
        return true;
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        name="title"
        label="角色名称"
        placeholder="请输入角色名称"
        width="md"
        required
      />

      <div style={{ display: 'flex', paddingLeft: 55 }}>
        <div>角色权限</div>
        <div style={{ flex: 1 }}>
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