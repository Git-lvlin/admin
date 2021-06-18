import React, { useState, useEffect, useRef } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Form, Select, Table, message } from 'antd';
import { productList, setIndex } from '@/services/product-management/daifa-product';
import { categoryAll } from '@/services/common';
import GcCascader from '@/components/gc-cascader'
import { amountTransform } from '@/utils/utils';
import Edit from './form';
import Big from 'big.js';
import { PageContainer } from '@ant-design/pro-layout';
const SubTable = (props) => {
  const [data, setData] = useState([])
  const columns = [
    { title: '供应链skuID', dataIndex: 'skuId' },
    { 
      title: '规格1',
      dataIndex: 'attributesOne',
    },
    { 
      title: '规格2',
      dataIndex: 'attributesTwo',
    },
    {
      title: '销售价',
      dataIndex: 'consignPrice',
      // render: (_) => amountTransform(_, '/')
    },
    {
      title: '市场价',
      dataIndex: 'retailPrice',
      // render: (_) => amountTransform(_, '/')
    },
    { title: '可用库存', dataIndex: 'amountOnSale' },
  ];

  useEffect(() => {
    productList({
      page: 1,
      size: 100,
      selectType: 2,
      productId: props.data.feedId
    }).then(({data}) => {
      data.forEach((item) => {
        item.attributesOne = item.attributes[0].attributeName + ':' + item.attributes[0].attributeValue
        item.attributesTwo = item.attributes[1]?item.attributes[1].attributeName + ':' + item.attributes[1].attributeValue:''
      })
      setData(data)
    })
  }, [])

  return (
    <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
  )
};

export default function EditTable() {
  const [editableKeys, setEditableKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [form] = Form.useForm();
  const actionRef = useRef();
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
    {
      title: '售卖状态',
      dataIndex: 'goodsState',
      renderFormItem: () => <Select options={[{ label: '暂不售卖', value: 0 }, { label: '售卖', value: 1 }]} />
    },
    {
      title: '操作',
      valueType: 'options',
      editable: false,
      render: (_,r) => <a onClick={() => {
        setGoodsIndex(r)
      }}>设置</a>
    },
  ]

  const setGoodsIndex = (r) => {
    console.log('r', r)
    const { feedId:productId, gcId, goodsState, floatPercent } = r
    const params = {
      productId,
      gcId1: gcId?.[0],
      gcId2: gcId?.[1],
      goodsState,
      floatPercent,
    }
    setIndex(params).then(res=> {
      if (res.code === 0) {
        message.success('设置成功')
      }
    }) 
  }

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      // totalStockNum: item.stockNum,
      // minNum: 1,
      // price: amountTransform(+item.price, '/'),
      // perStoreMinNum: 10,
      // totalPrice: item.salePrice > 0 ? +new Big(+item.salePrice).div(100).times(10) : 0,
    }))
    setDataSource(arr)
  }

  useEffect(() => {
    // categoryAll()
    hasData&&actionRef.current.reset();
  }, [hasData])

  const getGoodsList = () => {
    console.log('拉取商品组')
    hasData&&setHasData(false)
    setFormVisible(true)
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '',
        breadcrumb: {},
      }}
      content={
        <Button onClick={() => {
          getGoodsList()
        }}>获取供应链已选商品组</Button>
      }
    >
    {hasData&&<EditableProTable
      actionRef={actionRef}
      postData={postData}
      columns={columns}
      params={{
        selectType: 1
      }}
      rowKey="id"
      value={dataSource}
      expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
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
        pageSize: 5
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
    />}
      {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      setHasData={setHasData}
    />}
    </PageContainer>
  )
}
