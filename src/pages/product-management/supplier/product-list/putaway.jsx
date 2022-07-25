import React, { useEffect, useState, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { Select, Form, Input, Tooltip, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  ProFormText,
  DrawerForm,
  ProFormRadio,
  ProFormDependency,
} from '@ant-design/pro-form';
import { findAllProvinces, postageSave } from '@/services/product-management/freight-template'
import { PlusOutlined } from '@ant-design/icons';
import Edit from '@/pages/product-management/designated-commodity-settlement/form'

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

const bloodData = [
    {
      id: 1,
      name: '省办事处-管理奖',
      tip: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）'
    },
    {
      id: 2,
      name: '社区店主-服务佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 3,
      name: '用户-服务佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 4,
      name: '社区店主-管理佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 5,
      name: '用户-管理佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 6,
      name: 'VIP店主-服务佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 7,
      name: 'VIP店主-管理佣金(间)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 8,
      name: '供应商-货款',
      tip: '销售订单承担通道费'
    },
    {
      id: 9,
      name: '运营中心',
      tip: '线上记账线下结算,不承担通道费 销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心'
    },
    {
      id: 10,
      name: '省代',
      tip: '线下结算 销售订单按订单收货地址判断业绩归属'
    },
    {
      id: 11,
      name: '市代',
      tip: '线下结算 销售订单按订单收货地址判断业绩归属'
    },
    {
      id: 12,
      name: '全国分红奖',
      tip: '线下结算 每月统计全国各省市的总共业绩（含租赁+销售）前三名'
    },
    {
      id: 13,
      name: '汇能科技',
      tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台'
    }
  ]

export default (props) => {
  const { onClose, visible, setVisible, detailData, callback } = props;
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState(bloodData?.map(item => item.id));
  const [dataSource, setDataSource] = useState(() => bloodData);
  const [formVisible, setFormVisible] = useState(false);
  const [sum, setSum] = useState(11)
  const actionRef = useRef();
  const submit = (values) => {

   }
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      align: 'center',
      editable:false,
    },
    {
      title: '对象和对应结算项名称',
      dataIndex: 'name',
      align: 'center',
      editable:false,
      render:(_,data)=>{
        return  <p>
        {_}
        <Tooltip placement="top" title={data?.tip}>
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </p>
      }
    },
    {
      title: '风凉茶',
      align: 'center',
      dataIndex: 'price',
    }
   
  ]

  return (
    <DrawerForm
      onVisibleChange={setVisible}
      title='商品上架应用结算配置'
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1200,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: ({ form }) => {
          return [
            <Button
              onClick={() => {
                form?.submit()
              }}
              key='direct'
            >
            不应用，直接上架商品
          </Button>,
          <Button
            type='primary'
            onClick={() => {
              form?.submit()
            }}
            key='adhibition'
          >
            应用结算配置，并上架商品
          </Button>
          ]
        }
      }}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        callback();
        return true;
      }}
      visible={visible}
      {...formItemLayout}
    >
     <ProTable
        rowKey="id"
        dataSource={dataSource}
        actionRef={actionRef}
        bordered
        search={false}
        columns={columns}
        toolbar={{
            settings: false
        }}
        pagination={false}
        />
        <a style={{float:'right'}} onClick={()=>{setFormVisible(true)}}>修改结算配置</a>
        {formVisible && <Edit
          visible={formVisible}
          setVisible={setFormVisible}
          onClose={() => { setFormVisible(false)}}
          // detailData={detailData}
          callback={() => { actionRef.current.reload() }}
        />}
    </DrawerForm>
  );
};