import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import Big from 'big.js';


export default function EditTable({ onSelect }) {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称',
        maxLength: 50,
      },
      hideInTable: true
    },
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品关键字',
        maxLength: 30,
      },
      hideInTable: true
    },
    // {
    //   dataIndex: 'retailSupplyPrice',
    //   valueType: 'select',
    //   fieldProps: {
    //     placeholder: '请选择商品所属供应商类型'
    //   },
    //   valueEnum: {
    //     0: '全部',
    //     1: '佣金模式',
    //     2: '底价模式'
    //   },
    //   hideInTable: true
    // },
    {
      dataIndex: 'supplierName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商名称',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品spuID',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    {
      dataIndex: 'brandId',
      renderFormItem: () => (<BrandSelect />),
      hideInTable: true,
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '商品分类',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_, data) => `${data.gcId1Display}-${data.gcId2Display}`
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (text) => <img src={text} width={50} height={50} />
    },
    {
      title: '所属供应商名称',
      dataIndex: 'supplierName',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '销售价',
      dataIndex: 'salePriceDisplay',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '市场价',
      dataIndex: 'marketPriceDisplay',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '总库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '结算类型',
      dataIndex: 'settleType',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      valueEnum: {
        1: '佣金模式',
        2: '底价模式'
      },
    },
    {
      title: '集约总库存',
      dataIndex: 'totalStockNum',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '集约价',
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      editable: (_, data) => {
        return data.settleType !== 1
      }
    },
    
    {
      title: '单店起订量',
      dataIndex: 'minNum',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '单店限订量',
      dataIndex: 'maxNum',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '全款金额',
      dataIndex: 'totalPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_) => <span style={{ color: 'red' }}>{_}</span>
    },
  ]

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      totalStockNum: item.stockNum,
      minNum: 1,
      maxNum: 10,
      price: item.salePrice > 0 ? + new Big(item.salePrice).div(100) : 0,
      totalPrice: item.salePrice > 0 ? +new Big(item.salePrice).div(100).times(10) : 0,
    }))
    setDataSource(arr)
  }

  return (
    <EditableProTable
      postData={postData}
      columns={columns}
      rowKey="id"
      value={dataSource}
      params={{
        goodsState: 1,
        goodsVerifyState: 1,
        hasStock: 1,
      }}
      request={productList}
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
        ],
      }}
      editable={{
        form,
        editableKeys,
        onValuesChange: (record, recordList) => {
          const arr = recordList.map(item => {
            if (item.id === record.id) {
              const data = {
                ...item,
                totalPrice: (item.price > 0 && item.maxNum > 0) ? +new Big(item.price).times(item.maxNum) : 0
              }
              onSelect(data)
              return data
            }
            return item
          })
          setDataSource(arr)
        }
      }}
      pagination={{
        pageSize: 5,
        pageSizeOptions:[5, 10, 20, 50, 100]
      }}
      
      rowSelection={{
        hideSelectAll: true,
        type: 'radio',
        onChange: (_, val) => {
          onSelect(val[0])
        }
      }}
      bordered
      recordCreatorProps={false}
      tableAlertRender={false}
      style={{ marginBottom: 20, width: '100%' }}
    />
  )
}
