import React, { useEffect, useState, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { Select, Form, Input, Tooltip, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  ProFormText,
  DrawerForm,
  ProFormRadio,
  ProFormDependency,
} from '@ant-design/pro-form';
import { getCommissionConfigBySpuId,productList } from '@/services/product-management/designated-commodity-settlement';
import { putOnSpu } from '@/services/cms/fresh-goods-sort';
import { PlusOutlined } from '@ant-design/icons';
import Edit from './edit'
import { useLocation } from 'umi';
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
  const { onClose, visible, setVisible, detailData, callback,multi,putaway } = props;
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState();
  const [dataSource, setDataSource] = useState();
  const [formVisible, setFormVisible] = useState(false);
  const [configUser,setConfigUser] = useState()
  const [recordList, setRecordList] = useState([])
  const [sum, setSum] = useState(11)
  // const [rowKeys,setRowKeys]=useState()
  const actionRef = useRef();
  const isPurchase = useLocation().pathname.includes('purchase')
  const [datas,setDatas] = useState()
  const submit = (values) => {
    if(recordList.length==0){
      return message.error('请先修改结算配置!!')
    }
    const params={
      spuId: detailData?.spuId,
      configUser:configUser
    }
    putOnSpu(params, { showSuccess: true }).then(res => {
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
      title: '分成类型',
      dataIndex: 'commissionType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '金额',
        2: '百分比'
      },
      hideInSearch: true,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center',
    },
    {
      title: '新集约价',
      dataIndex: 'distributePrice',
      align: 'center',
      render: (_)=>{
        return <span style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '直推人（必须是VIP店主）',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '店主（下单人）开店地址所属市办事处',
      dataIndex: 'cityManageFee',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '培训中心',
      dataIndex: 'trainCenterManageFee',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '运营中心',
      dataIndex: 'companyAgent',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      },
      hideInSearch: true,
    },
    {
      title: '汇能科技',
      dataIndex: 'serviceFee',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    // {
    //   title: '供应商',
    //   dataIndex: 'wholesaleSupplyPrice',
    //   align: 'center',
    //   render: (_)=>{
    //     return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
    //   }
    // },
    {
      title: '汇能',
      dataIndex: 'shoppervipChargeFee',
      align: 'center',
      render: (_,data)=>{
        return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (_,data)=>{
        return <a onClick={()=>{ setDatas(data);setFormVisible(true) }}>修改结算配置</a>
      },
      fixed: 'right',
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
              style={{display:multi&&!putaway?'none':'block'}}
            >
            保存分成配置，不上架
          </Button>,
          <Button
            type='primary'
            onClick={() => {
              form?.submit()
              setConfigUser(1)
            }}
            key='adhibition'
          >
            应用结算配置，并上架
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
     <ProTable
        rowKey="id"
        dataSource={dataSource}
        actionRef={actionRef}
        request={multi||putaway?productList:getCommissionConfigBySpuId}
        search={false}
        columns={columns}
        toolbar={{
            settings: false
        }}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        postData={(data)=>{
          setRecordList(data)
          return data
        }}
        params={{
          spuId: detailData?.spuId,
          orderType: 30
        }}
        pagination={false}
        tableAlertRender={false}
        />
        {formVisible && <Edit
          visible={formVisible}
          setVisible={setFormVisible}
          onClose={() => { setFormVisible(false)}}
          detailData={datas}
          callback={() => { actionRef.current.reload() }}
        />}
    </DrawerForm>
  );
};