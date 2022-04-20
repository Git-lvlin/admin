import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Switch, Input,InputNumber,message} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import ProTable from '@ant-design/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { ModalForm,ProFormText,ProFormDigit } from '@ant-design/pro-form';
import Upload from '@/components/upload';
import Big from 'big.js'



export default (props) => {
  const { visible, setVisible, callback,id,dataSource} = props;
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


  const onsubmit = (values) => {
    var flage=false
    for (let index = 0; index < dataSource.length; index++) {
      if(dataSource[index]?.skuId==0&&dataSource[index]?.salePrice==amountTransform(values.salePrice, '*')){
        flage=true
      }
    }
    if(flage){
      return message.error(`已有${values.salePrice}元红包，请直接增加${values.salePrice}元红包奖品库存，或添加其他面额红包！`)
    }
    setVisible(false)
    callback(values)
  };
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length < 2) {
        await reject('名称，不能少于2个字')
      }else {
        await resolve()
      }
    })
  }

  return (
    <ModalForm
      title={<p>添加现金红包 <span style={{color:'#929292',fontSize:'10px'}}>完善红包信息</span></p>}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      onFinish={async (values) => {
        await onsubmit(values);
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        width={300}
        label="名称"
        placeholder="输入名称"
        name="goodsName"
        rules={[
        { required: true, message: '请输入名称' },
        { validator: checkConfirm }
        ]}
        fieldProps={{
          maxLength:20
        }}
      />
      <ProFormDigit
        width={300}
        name="salePrice"
        label="面额"
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(2) : value,
        }}
        min={0.01}
        max={99999.99}
        rules={[
          { required: true, message: '请输入面额' },
        ]}
      />
      <Form.Item
          label="图片"
          name="imageUrl"
          rules={[{ required: true, message: '请上传图片' }]}
        >
           <Upload multiple maxCount={1} dimension="1:1" accept="image/*"/>
        </Form.Item>
      <ProFormDigit
        width={300}
        label="库存数"
        placeholder="输入库存数"
        name="baseStockNum"
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(0) : value
        }}
        min={0}
        max={999999}
        rules={[
          { required: true, message: '请输入库存数' },
        ]}
      />
      <ProFormDigit
        width={300}
        label="中奖概率"
        placeholder="输入中奖概率"
        name="probability"
        rules={[
        { required: true, message: '请输入中奖概率' },
        ]}
        fieldProps={{
          formatter: value => value ? +new Big(value).toFixed(2) : value
        }}
        min={0.00}
        max={100.00}
      />
    </ModalForm>
  );
};