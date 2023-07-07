import React, { useState, useEffect, useRef } from 'react';
import { Form, Tree, Checkbox } from 'antd';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { computedChildCount } from '@/utils/utils'
import * as api from '@/services/setting/role-management'

const getPid = (item, originTreeData) => {
  let id = item;
  const arr = [];
  let findItem = originTreeData.find(it => it.id === id);
  while (findItem) {
    if (findItem && findItem.pid !== 0) {
      arr.push(findItem.pid)
    }
    id = findItem.pid;
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    findItem = originTreeData.find(it => it.id === id);
  }

  return arr;
}

export default (props) => {
  const { visible, setVisible, treeData, originTreeData, data, onClose, callback = () => { } } = props;
  const [selectKeys, setSelectKeys] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [form] = Form.useForm();
  const treeRef = useRef();

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
      setSelectKeys(originTreeData.map(item => item.id));
    } else {
      setSelectKeys([]);
    }
    setSelectAll(checked);
  }

  const onCheck = (checkedKeys) => {
    const keys = checkStrictly ? checkedKeys.checked : checkedKeys
    setSelectKeys(keys)
    // setHalfKeys(halfCheckedKeys)
    setSelectAll(!treeData.some(item => {
      return !keys.includes(item.key);
    }))
  }

  const reset = () => {
    setSelectKeys([]);
    setSelectAll(false);
  }

  const submit = (values) => {
    const { title } = values;
    return new Promise((resolve, reject) => {
      const apiMethod = data ? api.groupEdit : api.groupAdd;
      let pid = []
      const keyArr = [...selectKeys]
      keyArr.forEach(item => {
        pid.push(...getPid(item, originTreeData))
      })
      pid = [...new Set(pid)];
      let keys = [...selectKeys, ...pid];
      keys = [...new Set(keys)];
      const obj = { title, status: 1, rules: keys.join(',') };
      if (data) {
        obj.id = data.id;
      }
      apiMethod(obj, { showSuccess: true }).then(res => {
        if (res.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  const changeMode = () => {
    setCheckStrictly(!checkStrictly)
    const keys = selectKeys
    setSelectKeys([])
    setTimeout(() => {
      setSelectKeys(keys)
    });
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title
      })
      api.adminRule({
        groupId: data.id
      }).then(res => {
        if (res.code === 0) {
          // const originData = originTreeData;
          // const filterData = res.data.filter(item => !originData.some(it => it.pid === item.id))
          const allCount = computedChildCount(originTreeData);
          const selfCount = computedChildCount(res.data);
          const filterData = res.data.filter(item => allCount[item.id] === selfCount[item.id])
          setSelectKeys(filterData.map(item => item.id));
        }
      })
    }
  }, [])

  return (
    <ModalForm
      title={`${data ? '编辑' : '新建'}角色`}
      modalProps={{
        onCancel: () => { reset(); onClose(); },
      }}
      form={form}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={async (values) => {
        try {
          await submit(values)
        } catch (error) {
          console.log('error', error)
        }
        reset();
        callback();
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
        rules={[{ required: true, message: '请输入角色名称' }]}
      />

      <div style={{ display: 'flex', paddingLeft: 55 }}>
        <div>角色权限</div>
        <div style={{ flex: 1 }}>
          {treeData.length &&
            <div>
              <Checkbox
                onChange={onSelectAll}
                checked={selectAll}
                style={{ marginLeft: 23, marginBottom: 5 }}
              >
                全部功能
              </Checkbox>
              <a onClick={changeMode}>{checkStrictly?'当前不自动关联父子级':'当前自动关联父子级'}</a>
            </div>}
          <Tree
            checkable
            treeData={treeData}
            checkedKeys={selectKeys}
            onCheck={onCheck}
            selectable={false}
            height={500}
            ref={treeRef}
            checkStrictly={checkStrictly}
          />
        </div>
      </div>

    </ModalForm>
  );
};