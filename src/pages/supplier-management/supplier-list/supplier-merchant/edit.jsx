import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Tree, message, Checkbox } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { supplierAdd, supplierEdit, categoryAll } from '@/services/supplier-management/supplier-list';
import md5 from 'blueimp-md5';
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
      const apiMethod = detailData ? supplierEdit : supplierAdd;

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
            const g = { gc1: key };
            if (obj[key].length) {
              g.gc2 = obj[key]
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
        password: password ? md5(password) : '',
        supplierId: detailData?.supplierId,
        bindSupplierIds: selectData.map(item => item.id).join(','),
        gcInfo: gcArr,
      }, { showSuccess: true, showError: true }).then(res => {
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
      detailData.gcInfo.forEach(item => {
        if (item.gcParentId !== 0) {
          ids.push(item.id)
        }
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
      title={`${detailData ? '编辑' : '新建'}供应商`}
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
        name="companyName"
        label="供应商名称"
        placeholder="请输入供应商名称"
        rules={[{ required: true, message: '请输入供应商名称' }]}
        fieldProps={{
          maxLength: 30,
        }}
      />
      <ProFormText
        name="accountName"
        label="供应商登录账号"
        placeholder="请输入供应商登录账号"
        rules={[{ required: true, message: '请输入供应商登录账号' }]}
        fieldProps={{
          maxLength: 18,
        }}
      />
      <ProFormText.Password
        name="password"
        label="供应商登录密码"
        placeholder="请输入供应商登录密码"
        rules={[{ required: !detailData, message: '请输入供应商登录密码' }]}
        fieldProps={{
          maxLength: 32,
          visibilityToggle: false,
        }}
      />
      <Form.Item
        label="营业执照"
        name="businessLicense"
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
        label="相关资质"
        name="qualification"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小1MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
            <dd>3.图片数量20张以内</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={1} accept="image/*" size={1 * 1024} />
      </Form.Item>
      <Form.Item
        label="可关联顾问"
      >
        <Button type="primary" onClick={() => { setFormVisible(true) }}>选择顾问</Button>
        <div>
          {!!selectData.length && <div>已选择顾问</div>}
          {
            selectData.map(item => (<div key={item.id}>{item.companyName}</div>))
          }
        </div>
      </Form.Item>

      <ProFormText
        name="companyUserName"
        label="负责人"
        placeholder="请输入负责人"
        rules={[{ required: true, message: '请输入负责人' }]}
        fieldProps={{
          maxLength: 10,
        }}
      />
      <ProFormText
        name="companyUserPhone"
        label="负责人手机号"
        placeholder="请输入负责人手机号"
        rules={[{ required: true, message: '请输入负责人手机号' }]}
        fieldProps={{
          maxLength: 11,
        }}
      />
      <ProFormText
        name="orderTipphone"
        label="接收订单提醒的手机号"
        placeholder="请输入手机号码 产生待发货订单时自动发送短信"
        fieldProps={{
          maxLength: 11,
        }}
      />
      <ProFormText
        name="stockWarn"
        label="库存预警值"
        placeholder="请输入整数字 可用库存小于等于此值时提醒"
      />

      <Form.Item
        label="主营商品类型"
        name="gc"
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