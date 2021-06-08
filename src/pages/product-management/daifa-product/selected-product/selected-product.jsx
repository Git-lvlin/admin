import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Select } from 'antd';
import { productList } from '@/services/product-management/daifa-product';
import { categoryAll } from '@/services/common';
import { amountTransform } from '@/utils/utils'
import Big from 'big.js';


export default function EditTable() {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'spu',
      dataIndex: 'feedId',
      valueType: 'text',
      editable: false,
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      valueType: 'text',
      editable: false,
      render: (text) => <img src={text} width={50} height={50} />
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      valueType: 'text',
      editable: false,
    },
    {
      title: '售卖价',
      dataIndex: 'price',
      valueType: 'text',
      editable: false,
    },
    {
      title: '1688状态',
      dataIndex: 'invalid',
      valueType: 'text',
      editable: false,
      render: (_) => _ === 0 ? '有效' : '已失效'
    },
    {
      title: '售价最多上浮百分比',
      dataIndex: 'floatPercent',
      valueType: 'text',
    },
    {
      title: '一级分类',
      dataIndex: 'gcId1',
      renderFormItem: () => <Select options={[{ label: 'a', value: 1 }]} />
    },
    {
      title: '二级分类',
      dataIndex: 'gcId2',
      renderFormItem: () => <Select options={[{ label: 'a', value: 1 }]} />
    },
    {
      title: '售卖状态',
      dataIndex: 'saleState',
      renderFormItem: () => <Select options={[{ label: '暂不售卖', value: 0 }, { label: '售卖', value: 1 }]} />
    },
    {
      title: '操作',
      valueType: 'options',
      editable: false,
      render: () => <a>设置</a>
    },
  ]

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      // totalStockNum: item.stockNum,
      // minNum: 1,
      price: amountTransform(+item.price, '/'),
      // perStoreMinNum: 10,
      // totalPrice: item.salePrice > 0 ? +new Big(+item.salePrice).div(100).times(10) : 0,
    }))
    setDataSource(arr)
  }

  useEffect(() => {
    categoryAll()
  }, [])

  return (
    <EditableProTable
      postData={postData}
      columns={columns}
      params={{
        selectType: 1
      }}
      rowKey="id"
      value={dataSource}
      request={productList}
      search={false}
      editable={{
        form,
        editableKeys,
        onValuesChange: (record, recordList) => {
          const arr = recordList.map(item => {
            if (item.id === record.id) {
              const data = {
                ...item,
                totalPrice: (item.price > 0 && item.perStoreMinNum > 0) ? +new Big(item.price).times(item.perStoreMinNum) : 0
              }
              // onSelect(data)
              return data
            }
            return item
          })
          setDataSource(arr)
        }
      }}
      pagination={{
        pageSize: 10
      }}
      rowSelection={{
        onChange: (_, val) => {
          // onSelect(val[0])
        }
      }}
      bordered
      recordCreatorProps={false}
      tableAlertRender={false}
      style={{ marginBottom: 20, width: '100%' }}
    />
  )
}
