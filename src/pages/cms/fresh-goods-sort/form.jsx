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
import Edit from './edit'
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
      title: '新集约价',
      dataIndex: 'salePrice',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '直推人（必须是VIP店主）',
      dataIndex: 'cityManageFee',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '店主（下单人）开店地址所属市办事处',
      dataIndex: 'shopperChargeFee',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '培训中心',
      dataIndex: 'userChargeFee',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '汇能科技',
      dataIndex: 'company',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '供应商',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    },
    {
      title: '汇能',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      render: (_)=>{
        return <p style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</p>
      }
    }
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
          spuId: detailData?.spuId,
          orderType: 30
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