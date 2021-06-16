import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Tree, message, Checkbox } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { storeAdd, storeEdit } from '@/services/daifa-store-management/list';
import { categoryAll } from '@/services/common';
import { arrayToTree } from '@/utils/utils'
import FormModal from './form';


const CTree = (props) => {
  const { value, onChange, treeData, data, keys, ...rest } = props;
  const [selectKeys, setSelectKeys] = useState(keys);
  const [selectAll, setSelectAll] = useState(false);
  const onSelectAll = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setSelectKeys(data.map(item => item.id));
      onChange(data.map(item => item.id))

    } else {
      setSelectKeys([]);
      onChange([])
    }
    setSelectAll(checked);
  }

  const onCheck = (checkedKeys) => {
    setSelectKeys(checkedKeys)
    onChange(checkedKeys)
    setSelectAll(!treeData.some(item => {
      return !checkedKeys.includes(item.key);
    }))
  }

  useEffect(() => {
    onChange(keys)
  }, [])

  return (
    <div style={{ flex: 1 }}>
      <Checkbox
        onChange={onSelectAll}
        checked={selectAll}
        style={{ marginLeft: 23, marginBottom: 5 }}
      >
        全部分类
      </Checkbox>
      <Tree
        {...rest}
        treeData={treeData}
        onCheck={onCheck}
        checkedKeys={selectKeys}
      />
    </div>

  )
}

export default (props) => {
  const { visible, setVisible, detailData, callback = () => { }, onClose = () => { } } = props;
  const [form] = Form.useForm()
  const [formVisible, setFormVisible] = useState(false)
  const [selectData, setSelectData] = useState([]);
  const [treeData, setTreeData] = useState([])
  const [selectKeys, setSelectKeys] = useState([]);
  const originData = useRef([])

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


  const submit = (values) => {
    const { password, gc, ...rest } = values;
    return new Promise((resolve, reject) => {
      const apiMethod = detailData ? storeEdit : storeAdd;

      const obj = {};
      let gcArr = []
      if (gc?.length) {
        const parentIds = [];

        gc.forEach(element => {
          originData.current.forEach(it => {
            if (it.id === element) {
              parentIds.push(it.gcParentId)
            }
          })
        });

        const gcData = [...new Set([...gc, ...parentIds].filter(item => item !== 0))]
        gcData.forEach(item => {
          const findItem = originData.current.find(it => item === it.id);
          const { gcParentId, id } = findItem;
          // if (gcParentId == 0) {
          //   if (!obj[gcParentId]) {
          //     obj[id] = []
          //   }
          // } else if (obj[gcParentId]) {
          //   obj[gcParentId].push(id)
          // } else {
          //   console.log('gcParentId', gcParentId)
          //   obj[gcParentId] = [id];
          //   console.log('id', obj)
          // }

          if (gcParentId !== 0) {
            if (obj[gcParentId]) {
              obj[gcParentId].push(id)
            } else {
              obj[gcParentId] = [id];
            }
          }

        })

        let hasError = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) {
            const g = { gc_id1: key };
            if (obj[key].length) {
              g.gc_id2 = obj[key].join(',')
            } else {
              hasError = true;
            }
            gcArr.push(g)
          }
        }

        if (hasError) {
          message.error('选择的一级分类下无二级分类，请到分类管理添加二级分类');
          reject()
          return;
        }

      } else {
        gcArr = ''
      }
      apiMethod({
        ...rest,
        storeNo: detailData.storeNo,
        businessScope: JSON.stringify(gcArr),
      }, { showSuccess: true }).then(res => {
        if (res.code === 0) {
          resolve();
          callback();
        } else {
          reject();
        }
      })
    });
  }

  useEffect(() => {
    if (detailData) {
      form.setFieldsValue({
        ...detailData
      })
      setSelectData(detailData.supplierIds)
      const ids = [];
      const businessScope = JSON.parse(detailData.businessScope);
      businessScope?.forEach(item => {
        const gcId = item.gc_id2.split(',').map(item => +item)
        ids.push(...gcId)
      })
      setSelectKeys(ids)
    }
    categoryAll()
      .then(res => {
        if (res.code === 0) {
          originData.current = res.data.records;
          const tree = arrayToTree(res.data.records.map(item => ({
            ...item,
            pid: item.gcParentId,
            title: item.gcName,
            key: item.id,
            value: item.id,
            selectable: false
          })))
          setTreeData(tree)
        }
      })
  }, [form, detailData]);

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 800,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        return true;
      }}
      visible={visible}
      initialValues={{
        status: 1,
      }}
      {...formItemLayout}
    >
      <ProFormText
        name="realname"
        label="店主姓名"
        placeholder="请输入店主姓名"
        rules={[{ required: true, message: '请输入店主姓名' }]}
        fieldProps={{
          maxLength: 30,
        }}
        disabled={!!detailData}
      />
      <ProFormText
        name="mobile"
        label="店主手机号码"
        placeholder="请输入店主手机号码"
        rules={[{ required: true, message: '请输入店主手机号码' }]}
        fieldProps={{
          maxLength: 11,
        }}
        disabled={!!detailData}
      />
      <ProFormText
        name="storeName"
        label="店铺名称"
        placeholder="请输入店铺名称"
        rules={[{ required: true, message: '请输入店铺名称' }]}
        fieldProps={{
          maxLength: 11,
        }}
      />
      <Form.Item
        label="手持身份证照片"
        name="idHandheld"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={1} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <Form.Item
        label="身份证正面照片"
        name="idFront"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={1} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <Form.Item
        label="身份证背面照片"
        name="idBack"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={1} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <ProFormText
        name="idNumber"
        label="店主身份证号"
        placeholder="请输入店主身份证号"
        rules={[{ required: true, message: '请输入店主身份证号' }]}
      />

      <ProFormText
        name="wechatNo"
        label="微信号"
        placeholder="请输入微信号"
      />
      <ProFormText
        name="station"
        label="店主内部岗位或身份"
        placeholder="请输入店主内部岗位或身份"
      />
      <ProFormText
        name="remark"
        label="备注"
        placeholder="请输入备注"
      />

      <Form.Item
        label="主营商品类型"
        name="gc"
        // rules={[{ required: true }]}
      >
        <CTree
          checkable
          style={{
            width: '100%',
          }}
          treeData={treeData}
          multiple
          height={200}
          data={originData.current}
          virtual={false}
          keys={selectKeys}
        />
      </Form.Item>

      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[{ required: true }]}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 3,
          },
        ]}
      />
      {formVisible && <FormModal
        visible={formVisible}
        setVisible={setFormVisible}
        callback={(v) => { setSelectData(v) }}
        selectData={selectData}
      />}
    </DrawerForm>
  );
};