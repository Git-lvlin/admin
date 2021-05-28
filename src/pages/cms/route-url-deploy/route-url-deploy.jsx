
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import React from 'react';

export default () => {



  const pages = async () => [
    { label: '首页', value: '/home' },
    { label: '商品详情页', value: '/goods/details/goodsDetail' },
    { label: '售后中心', value: '/afterSales/center' },
    { label: '个人中心', value: '/userCenter' },
  ]
  const prefix = async () => [
    { label: 'IOS', value: 'all' },
    { label: 'H5', value: 'open' },
    { label: 'Android', value: 'closed' },
    { label: 'PC', value: 'processing' },
    { label: '微信小程序', value: 'processing' },
  ]

  const attr = async () => [
    { label: '商品id', value: 'goodsId' },
    { label: '商品分类id', value: 'goodsClassId' },
    { label: '售后订单', value: 'afterOrder' },
    { label: '普通订单', value: 'order' },
  ]
  return (
    <ProForm
      initialValues={{
        list: ['1', '2', '3', '4'],
      }}
    >
      <ProFormFieldSet
        name="list"
        label="完整链接"
        readonly
        transform={(value) => ({ startTime: value[0], endTime: value[1] })}
      >
        <ProFormText width="md" readonly />
        <ProFormText width="md" readonly />
        ?
        <ProFormText width="md" readonly />
        =
        <ProFormText width="md" readonly />
      </ProFormFieldSet>
      <ProFormFieldSet name="list">
        <ProFormSelect
          request={prefix}
          name="prefix"
          label=""
        />
        <ProFormSelect
          request={pages}
          name="pageName"
          label=""
        />
        <ProFormSelect
          request={attr}
          name="attrs"
          label=""
        />
        <ProFormText width="md" />
      </ProFormFieldSet>

    </ProForm>
  );
};



