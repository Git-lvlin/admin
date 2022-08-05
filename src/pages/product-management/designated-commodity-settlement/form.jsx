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
import { saveCommissionConfig } from '@/services/product-management/designated-commodity-settlement';
import { PlusOutlined } from '@ant-design/icons';
import AddRoleModal from './add-role-modal'

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
      name: '社区店主和用户-服务佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 3,
      name: '社区店主和用户-管理佣金(间)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 4,
      name: 'VIP店主-服务佣金(直)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 5,
      name: 'VIP店主-管理佣金(间)',
      tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费'
    },
    {
      id: 6,
      name: '供应商-货款',
      tip: '销售订单承担通道费'
    },
    {
      id: 7,
      name: '运营中心',
      tip: '线上记账线下结算,不承担通道费 销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心'
    },
    {
      id: 8,
      name: '省代',
      tip: '线下结算 销售订单按订单收货地址判断业绩归属'
    },
    {
      id: 9,
      name: '市代',
      tip: '线下结算 销售订单按订单收货地址判断业绩归属'
    },
    {
      id: 10,
      name: '全国分红奖',
      tip: '线下结算 每月统计全国各省市的总共业绩（含租赁+销售）前三名'
    },
    {
      id: 11,
      name: '汇能科技',
      tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台'
    }
  ]

export default (props) => {
  const { onClose, visible, setVisible, detailData, callback } = props;
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState(bloodData?.map(item => item.id));
  const [dataSource, setDataSource] = useState(() => bloodData);
  const [roleVisible, setRoleVisible] = useState();
  const [sum, setSum] = useState(11)
  const actionRef = useRef();
  const submit = (values) => {
    const params={
      ...values
    }
    saveCommissionConfig(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
      }
    })
   }
  const columns = [
    {
      title: '参与角色',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '序号',
          dataIndex:'id',
          width:50,
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
        }
      ]
    },
    {
      title: '参与商品和对应金额',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title:  <ProFormText
                    width={500}
                    name="dateRange"
                    placeholder='输入商品名称或skuID搜索'
                    />,
          dataIndex: 'price',
          renderFormItem: (_,r) => {
            if(_?.entry?.id==6){
              return <>
                       <p>0.00元</p>
                       <p style={{color:'#F88000'}}>（取供应商提供的零售供货价）</p>
                     </>
            }else if(_?.entry?.id==11){
              return <>
                       <p>0.00元</p>
                       <p style={{color:'#F88000'}}>= 售价  -  前10项之和（随前10项数据即时更新）</p>
                     </>
            }
            return  <Input style={{width:'450px'}} addonAfter='元' placeholder='请输此行角色的结算金额，0.00至售价。总结算金额<售价'/>
            },
        }
      ]
    },
   
  ]

  return (
    <DrawerForm
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1200,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        searchConfig:{
            resetText:'',
            submitText:'提交'
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
     <EditableProTable
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        actionRef={actionRef}
        bordered
        search={false}
        columns={columns}
        toolbar={{
            settings: false
        }}
        pagination={false}
        editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row);
            //   await waitTime(2000);
            },
            onValuesChange:(record, recordList)=>{
                console.log('recordList',recordList)
            }
          }}
        recordCreatorProps = {false}
        />
        <Button
          onClick={() => {
            setRoleVisible(true)
            setSum(sum+1)
          }}
          style={{width:'1100px',marginLeft:'20px',border:'1px dashed #B4B0B0'}}
          icon={<PlusOutlined />}
        >
          添加
        </Button>
        {roleVisible&&
         <AddRoleModal
            visible={roleVisible}
            setVisible={setRoleVisible}
            callback={(val)=>{
                setDataSource([...dataSource,{
                    id: sum,
                    price:'',
                    ...val
                }])
                setEditableRowKeys([...dataSource?.map(item => item.id),sum])
            }}
          />
        }
    </DrawerForm>
  );
};