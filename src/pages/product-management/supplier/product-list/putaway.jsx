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
import { getCommissionConfigBySpuId } from '@/services/product-management/designated-commodity-settlement';
import { PlusOutlined } from '@ant-design/icons';
import Edit from '@/pages/product-management/designated-commodity-settlement/form'
import { useLocation } from 'umi';
import * as api1 from '@/services/product-management/product-list';
import * as api2 from '@/services/product-management/product-list-purchase';
import { amountTransform } from '@/utils/utils'

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

export default (props) => {
  const { onClose, visible, setVisible, detailData, callback } = props;
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState();
  const [dataSource, setDataSource] = useState();
  const [formVisible, setFormVisible] = useState(false);
  const [configUser,setConfigUser] = useState()
  const [recordList, setRecordList] = useState([])
  const [sum, setSum] = useState(11)
  const [rowKeys,setRowKeys]=useState()
  const actionRef = useRef();
  const isPurchase = useLocation().pathname.includes('purchase')
  const api = isPurchase ? api2 : api1
  const submit = (values) => {
    const params={
      spuId: detailData?.spuId,
      configUser:configUser
    }
    api.onShelf(params, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        setVisible(false)
        callback()
      }
    })
   }
   const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center',
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    // {
    //   title: '省办事处-管理奖',
    //   dataIndex: 'provinceManageFee',
    //   align: 'center',
    //   tip:'销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
    //   render: (_)=>{
    //     return amountTransform(_,'/').toFixed(2)
    //   }
    // },
    {
      title: '市办事处-管理奖',
      dataIndex: 'cityManageFee',
      align: 'center',
      tip: '销售订单按直推人开店地址所属市办事处',
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '社区店主-服务佣金(直)',
      dataIndex: 'shopperChargeFee',
      align: 'center',
      tip:<><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '用户-服务佣金(直)',
      dataIndex: 'userChargeFee',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '社区店主-管理佣金(间)',
      dataIndex: 'shopperManageFee',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '用户-管理佣金(间)',
      dataIndex: 'userManageFee',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: 'VIP店主-服务佣金(直)',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: 'VIP店主-管理佣金(间)',
      dataIndex: 'shoppervipManageFee',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '供应商-货款',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      tip: '销售订单承担通道费',
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    // {
    //   title: '运营中心',
    //   dataIndex: 'companyAgent',
    //   align: 'center',
    //   tip: <><p>线上记账线下结算,不承担通道费</p><p>销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心</p></>,
    //   render: (_)=>{
    //     return amountTransform(_,'/').toFixed(2)
    //   }
    // },
    {
      title: '省代',
      dataIndex: 'provinceAgent',
      align: 'center',
      tip: <><p>线下结算</p><p>销售订单按订单收货地址判断业绩归属</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '市代',
      dataIndex: 'cityAgent',
      align: 'center',
      tip: <><p>线下结算</p><p>销售订单按订单收货地址判断业绩归属</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '全国分红奖',
      dataIndex: 'dividends',
      align: 'center',
      tip: <><p>线下结算</p><p>每月统计全国各省市的总共业绩（含租赁+销售）前三名</p></>,
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '汇能科技',
      dataIndex: 'company',
      align: 'center',
      tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
      render: (_)=>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
  ];

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
                setConfigUser(0)
              }}
              key='direct'
            >
            不应用，直接上架商品
          </Button>,
          <Button
            type='primary'
            onClick={() => {
              form?.submit()
              setConfigUser(1)
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
      }}
      visible={visible}
      {...formItemLayout}
    >
     <p style={{paddingLeft:'20px'}}>[spuID:{detailData?.spuId}] {detailData?.goodsName}</p>
     <ProTable
        rowKey="id"
        dataSource={dataSource}
        actionRef={actionRef}
        request={getCommissionConfigBySpuId}
        search={false}
        columns={columns}
        toolbar={{
            settings: false
        }}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        postData={(data)=>{
          setRecordList(data)
          setRowKeys(data[0]?.id)
          return data
        }}
        params={{
          spuId: detailData?.spuId
        }}
        pagination={false}
        rowSelection={{
          renderCell:()=>{
            return null
          },
          type:'radio',
          selectedRowKeys:[rowKeys],
          
        }}
        tableAlertRender={false}
        onRow={(record) => {
          return {  
            onClick: async () => {
              setRowKeys(record.id)
            },
          };
        }}
        />
        <a style={{float:'right'}} onClick={()=>{setFormVisible(true)}}>修改结算配置</a>
        {formVisible && <Edit
          visible={formVisible}
          setVisible={setFormVisible}
          onClose={() => { setFormVisible(false)}}
          detailData={recordList.find(ele=>ele.id==rowKeys)}
          callback={() => { actionRef.current.reload() }}
        />}
    </DrawerForm>
  );
};