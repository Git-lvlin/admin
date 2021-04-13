import React, { useState, useEffect } from 'react';
import { Button, message, Form, Cascader, Input } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Upload from '@/components/upload'
import { uploadImageFormatConversion } from '@/utils/utils'
import * as api from '@/services/product-management/product-list';
import styles from './edit.less'
import FormModal from './form';

const columns = [
  {
    title: '规格图片',
    dataIndex: 'decs',
    editable: false,
  },
  {
    title: '活动名称',
    dataIndex: 'title',
    width: '30%',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
        {
          max: 16,
          whitespace: true,
          message: '最长为 16 位',
        },
        {
          min: 6,
          whitespace: true,
          message: '最小为 6 位',
        },
      ],
    },
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '描述',
    dataIndex: 'decs',
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: () => {
      return null;
    },
  },
];

const defaultData = [
  {
    id: 1,
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 2,
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
];

const options = [
  {
    value: '食品',
    label: '食品',
    children: [
      {
        value: '肉',
        label: '肉',
      },
    ],
  },
  {
    value: '服饰',
    label: '服饰',
    children: [
      {
        value: '衣',
        label: '衣',
      },
    ],
  },
];

export default (props) => {
  const { visible, setVisible } = props;
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [form] = Form.useForm()
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

  const urlsTransform = (urls) => {
    return urls.map((item, index) => {
      return {
        imageUrl: item,
        imageSort: index,
      }
    })
  }

  const submit = (values) => {
    const { videoUrl, gcId, primaryImages, detailImages, advImages, isMultiSpec, ...rest } = values;
    const obj = {
      isMultiSpec,
      goods: {
        ...rest,
        gcId1: 1,
        gcId2: 2
      },
      primaryImages: urlsTransform(primaryImages),
      detailImages: urlsTransform(detailImages),
    };
    return new Promise((resolve, reject) => {
      api.addGoods(obj, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  const getFormData = (data) => {
    console.log('data', data)
  }

  useEffect(() => {
    console.log('form', form);
  }, [form])

  return (
    <DrawerForm
      title="新建商品"
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1200,
        className: styles.drawer_form,
        form
      }}
      onFinish={async (values) => {
        await submit(values);
        return true;
      }}

      visible={visible}
      initialValues={{
        isMultiSpec: 0,
        goodsSaleType: 0,
        isFreeFreight: 1,
        supportNoReasonReturn: 1,
        // primaryImages: uploadImageFormatConversion([
        //   {
        //     "ImageUrl": "http://img13.360buyimg.com/img/jfs/t1/147953/16/5479/234145/5f37430cE27a9036a/749a70e1d32cbe8b.png",
        //     "imageSort": 1,
        //   },
        //   {
        //     "ImageUrl": "http://img13.360buyimg.com/img/jfs/t1/147953/16/5479/234145/5f37430cE27a9036a/749a70e1d32cbe8b.png",
        //     "imageSort": 2,
        //   }
        // ], 'ImageUrl','imageSort')
        sights: [{
        }]
      }}
      {...formItemLayout}
    >
      <div>
        {formModalVisible &&
          <FormModal
            visible={formModalVisible}
            setVisible={setFormModalVisible}
            getData={getFormData}
          />
        }
      </div>
      <ProFormText
        name="goodsName"
        label="商品名称"
        placeholder="请输入商品名称"
        rules={[{ required: true, message: '请输入商品名称' }]}
      />
      <ProFormText
        name="goodsDesc"
        label="商品副标题"
        placeholder="请输入商品副标题"
        rules={[{ required: true, message: '请输入商品副标题' }]}
      />
      <ProFormText
        name="supplierSpuId"
        label="商品编号"
        placeholder="请输入商品编号"
        rules={[{ required: true, message: '请输入商品编号' }]}
      />
      <ProFormText
        name="goodsKeywords"
        label="搜索关键字"
        placeholder="请输入搜索关键字"
      />
      <Form.Item
        label="商品品类"
        name="gcId"
        rules={[{ required: true, message: '请选择商品品类' }]}
      >
        <Cascader options={options} placeholder="请选择商品品类" />
      </Form.Item>
      <ProFormSelect
        options={[
          {
            value: 'a',
            label: 'a',
          },
        ]}
        name="brandId"
        label="商品品牌"
      />
      <ProFormRadio.Group
        name="isMultiSpec"
        label="规格属性"
        rules={[{ required: true }]}
        options={[
          {
            label: '单规格',
            value: 0,
          },
          {
            label: '多规格',
            value: 1,
          },
        ]}
      />
      <ProFormText
        name="stockNum"
        label="规格一（可带图）"
        placeholder="请输入规格名称"
        rules={[{ required: true, message: '请输入规格名称' }]}
      />
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => {
              return (
                <Form.Item
                  key={key}
                  label=" "
                  name={[name, 'a']}
                  colon={false}
                >
                  <Input placeholder="请输入规格属性" addonAfter={
                    key === 0 ?
                      <Button type="primary" style={{ display: 'inline-block' }} onClick={() => { add() }}>添加</Button>
                      :
                      <Button type="primary" danger style={{ display: 'inline-block' }} onClick={() => { remove(name) }}>删除</Button>
                  } />

                </Form.Item>
              )
            })}
          </>
        )}
      </Form.List>
      <ProFormText
        name="stockNum"
        label="规格二（无图）"
        placeholder="请输入规格名称"
      />
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => {
              return (
                <Form.Item
                  key={key}
                  label=" "
                  name={[name, 'a']}
                  colon={false}
                >
                  <Input placeholder="请输入规格属性" addonAfter={
                    key === 0 ?
                      <Button type="primary" style={{ display: 'inline-block' }} onClick={() => { add() }}>添加</Button>
                      :
                      <Button type="primary" danger style={{ display: 'inline-block' }} onClick={() => { remove(name) }}>删除</Button>
                  } />
                </Form.Item>
              )
            })}
          </>
        )}
      </Form.List>
      <Form.Item
        label=" "
        colon={false}
      >
        <Button type="primary" onClick={() => { setFormModalVisible(true) }}>填写批量规格参数 生成规格配置表</Button>
      </Form.Item>
      <EditableProTable
        columns={columns}
        rowKey="id"
        value={defaultData}
        editable={{
          editableKeys: [1, 2],
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          }
        }}
        bordered
        // onChange={setDataSource}
        recordCreatorProps={false}
        style={{ marginBottom: 20 }}
      />
      <ProFormText
        name="stockNum"
        label="可用库存"
        placeholder="请输入可用库存"
        rules={[{ required: true, message: '请输入可用库存数量' }]}
      />
      <ProFormText
        name="stockAlarmNum"
        label="库存预警值"
        placeholder="请输入数字 可用库存小于等于此值时提醒"
      />
      <ProFormRadio.Group
        name="goodsSaleType"
        label="供货类型"
        rules={[{ required: true }]}
        options={[
          {
            label: '批发+零售',
            value: 0,
          },
          {
            label: '仅批发',
            value: 1,
          },
          {
            label: '零售',
            value: 2,
          },
        ]}
      />
      <ProFormText
        name="wholesalePrice"
        label="批发价"
        placeholder="请输入批发价"
        rules={[{ required: true, message: '请输入供货价' }]}
      />
      <ProFormText
        name="wholesaleMinNum"
        label="批发起购量"
        placeholder="请输入批发起购量"
        rules={[{ required: true, message: '请输入数字 需大于可用库存' }]}
      />
      <ProFormText
        name="retailSupplyPrice"
        label="零售供货价"
        placeholder="请输入零售供货价"
        rules={[{ required: true, message: '请输入供货价' }]}
      />
      <ProFormText
        name="suggestedRetailPrice"
        label="建议零售价"
        placeholder="请输入建议零售价"
        rules={[{ required: true, message: '请输入建议零售价' }]}
      />
      <ProFormText
        name="buyMinNum"
        label="起售数量"
        placeholder="请输入起售数量"
        rules={[{ required: true, message: '请输入起售数量' }]}
      />
      <ProFormText
        name="buyMaxNum"
        label="单次最多零售购买数量"
        placeholder="请输入单次最多零售购买数量"
      />
      <ProFormRadio.Group
        name="isFreeFreight"
        label="是否包邮"
        rules={[{ required: true }]}
        options={[
          {
            label: '包邮',
            value: 1,
          },
          {
            label: '不包邮',
            value: 0,
          },
        ]}
      />
      <ProFormRadio.Group
        name="supportNoReasonReturn"
        label="七天无理由退货"
        rules={[{ required: true }]}
        fieldProps={{
          defaultValue: 'a'
        }}
        options={[
          {
            label: '支持',
            value: 1,
          },
          {
            label: '不支持',
            value: 0,
          },
        ]}
      />
      <ProFormTextArea
        name="goodsRemark"
        label="特殊说明"
      />
      <Form.Item
        label="商品主图"
        name="primaryImages"
        rules={[{ required: true, message: '请上传商品主图' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片比例1:1</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>4.至少上传3张</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={10} accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品详情"
        name="detailImages"
        rules={[{ required: true, message: '请上传商品详情' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小2MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品横幅"
        name="advImages"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片尺寸702*320px</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>注：商品横幅用于VIP商品推广，非必填</dd>
          </dl>
        }
      >
        <Upload accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品视频"
        name="videoUrl"
        tooltip={
          <dl>
            <dt>视频要求</dt>
            <dd>1.视频大小20MB以内</dd>
            <dd>2.视频格式mp4</dd>
          </dl>
        }
      >
        <Upload accept="video/mp4" />
      </Form.Item>
    </DrawerForm>
  );
};