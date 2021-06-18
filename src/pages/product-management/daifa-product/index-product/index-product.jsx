import React, { useState, useEffect, useRef } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Select, message } from 'antd';
import { indexProductList, goodsLoading } from '@/services/product-management/daifa-product';
import { categoryAll } from '@/services/common';
import GcCascader from '@/components/gc-cascader'
import { amountTransform } from '@/utils/utils'
import Big from 'big.js';


export default function EditTable() {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const actionRef = useRef();
  const upData = (r) => {
    console.log('r', r)
    const { outSpuId:productId, gcId, goodsState, floatPercent } = r
    const params = {
      productId,
      gcId1: gcId?.[0],
      gcId2: gcId?.[1],
      goodsState,
      floatPercent,
    }
    goodsLoading(params).then((res) => {
      if (res.code === 0) {
        message.success('更新成功')
        actionRef.current.reset();
      }
    })
  }

  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      editable: false,
    },
    // {
    //   title: '供应链ID',
    //   dataIndex: 'feedId',
    //   valueType: 'text',
    //   editable: false,
    // },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'text',
      editable: false,
      render: (text) => <img src={text} width={50} height={50} />
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable: false,
    },
    {
      title: '售卖最高价',
      dataIndex: 'goodsSaleMaxPrice',
      valueType: 'text',
      editable: false,
    },
    {
      title: '售卖最低价',
      dataIndex: 'goodsSaleMinPrice',
      valueType: 'text',
      editable: false,
    },
    {
      title: '供应链状态',
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
      title: '商品分类',
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
    },
    // {
    //   title: '一级分类',
    //   dataIndex: 'gcId1',
    //   renderFormItem: () => <Select options={[{ label: 'a', value: 1 }]} />
    // },
    // {
    //   title: '二级分类',
    //   dataIndex: 'gcId2',
    //   renderFormItem: () => <Select options={[{ label: 'a', value: 1 }]} />
    // },
    {
      title: '售卖状态',
      dataIndex: 'goodsState',
      renderFormItem: () => <Select options={[{ label: '暂不售卖', value: 0 }, { label: '售卖', value: 1 }]} />
    },
    {
      title: '操作',
      valueType: 'options',
      editable: false,
      render: (_, r) => <a onClick={() => {
        upData(r)
      }}>更新</a>
    },
  ]

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      // totalStockNum: item.stockNum,
      // minNum: 1,
      gcId: item.gcId1&&item.gcId2&&[item.gcId1, item.gcId2],
      goodsSaleMaxPrice: amountTransform(+item.goodsSaleMaxPrice, '/'),
      goodsSaleMinPrice: amountTransform(+item.goodsSaleMinPrice, '/'),
      // price: amountTransform(+item.price, '/'),
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
      actionRef={actionRef}
      postData={postData}
      columns={columns}
      params={{
        selectType: 1
      }}
      rowKey="id"
      value={dataSource}
      params={{selectType:1}}
      request={indexProductList}
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
