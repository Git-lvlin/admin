import React, { useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import ProTable from '@/components/pro-table';
import { productList } from '@/services/product-management/product-list'
import { chatSave } from '@/services/cms/chat-recommended-products'
import { amountTransform } from "@/utils/utils"
import { message } from 'antd';

export default (props) => {
  const { visible, setVisible, callback } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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


  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入spuID'
      }
    },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '供货类型',
      dataIndex: 'goodsFromTypeDisplay',
      hideInSearch: true,
    },
    {
      title: '销售价',
      dataIndex: 'goodsMarketPrice',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <ModalForm
      title='添加商品'
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      onFinish={() => {
        chatSave({ spuIdArr:selectedRowKeys }).then(res=>{
          if(res.code==0){
            message.success('添加成功！')
            callback();
          }
        })
        return true;
      }}
      submitter={{
        searchConfig:{
          submitText: '确认添加',
          resetText: '取消'
        }
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProTable
        columns={columns}
        headerTitle='今日必约'
        rowKey="id"
        options={false}
        request={productList}
        params={{
          selectType: 1,
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          hideSelectAll:false,
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: (_, val) => {
            setSelectedRowKeys(_);
          }
        }}
      />
    </ModalForm>
  );
};