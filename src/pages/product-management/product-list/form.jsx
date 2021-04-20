import React from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const { visible, setVisible, getData } = props;
  return (
    <ModalForm
      title="新建表单"
      modalProps={{
        width: 740,
      }}
      onFinish={async (values) => {
        getData(values)
        return true;
      }}
      onVisibleChange={setVisible}
      visible={visible}
      initialValues={{
        retailSupplyPrice: 1,
        suggestedRetailPrice: 1,
        wholesalePrice: 1,
        wholesaleMinNum: 1,
        stockAlarmNum: 1,
        stockNum: 1,
        salePrice: 1,
        marketPrice: 1,
      }}
    >
      <p>请输入要批量填写的规格参数。</p>
      <p style={{ color: 'red' }}>若已输入规格参数，重新批量填写会将已有的规格参数全部重置，请确认后操作！</p>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="retailSupplyPrice"
          label="零售供货价"
          placeholder="请输入零售供货价"
          rules={[{ required: true, message: '请输入零售供货价' }]}
        />
        <ProFormText
          width="md"
          name="suggestedRetailPrice"
          label="建议零售价"
          placeholder="请输入建议零售价"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="wholesalePrice"
          label="批发价"
          placeholder="请输入批发价"
          rules={[{ required: true, message: '请输入批发价' }]}
        />
        <ProFormText
          width="md"
          name="wholesaleMinNum"
          label="批发起售量"
          placeholder="请输入批发起售量"
          rules={[{ required: true, message: '请输入批发起售量' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="stockAlarmNum"
          label="库存预警值"
          placeholder="请输入库存预警值"
        />

        <ProFormText
          width="md"
          name="stockNum"
          label="可用库存"
          placeholder="请输入可用库存"
          rules={[{ required: true, message: '请输入可用库存' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="salePrice"
          label="销售价"
          placeholder="请输入销售价"
          rules={[{ required: true, message: '请输入销售价' }]}
        />
        <ProFormText
          width="md"
          name="marketPrice"
          label="市场划线价"
          placeholder="请输入市场划线价"
        />
      </ProForm.Group>
    </ModalForm >
  );
};