import React, { useState, useEffect } from 'react';
import { Button, Card, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/product-list';
import Edit from './edit';

const SubTable = (props) => {
  const [data, setData] = useState([])
  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格1', dataIndex: 'name' },
    { title: '规格2', dataIndex: 'name' },
    { title: '零售供货价', dataIndex: 'retailSupplyPriceDisplay' },
    { title: '批发价', dataIndex: 'wholesalePriceDisplay' },
    { title: '批发起购量', dataIndex: 'wholesaleMinNum' },
    { title: '建议零售价', dataIndex: 'suggestedRetailPriceDisplay' },
    { title: '市场价', dataIndex: 'marketPriceDisplay' },
    { title: '商品价格', dataIndex: 'salePriceDisplay' },
    { title: '可用库存', dataIndex: 'stockTotal' },
    { title: '活动库存', dataIndex: 'activityStockTotal' },
  ];

  useEffect(() => {
    api.productList({
      selectType: 2,
      spuId: props.data.spuId
    }).then(res => {
      setData(res?.data)
    })
  }, [])

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
};

const typeTransform = (array) => {
  if (!Array.isArray(array)) {
    return {}
  }
  const obj = {};
  array.forEach(item => {
    obj[item.code] = {
      text: item.name,
    }
  })
  return obj;
}

const TableList = () => {
  const [formVisible, setFormVisible] = useState(true);
  const [config, setConfig] = useState({});

  const columns = [
    {
      title: 'SPU',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SPU'
      }
    },
    {
      title: 'SKU',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SKU'
      },
      hideInTable: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      }
    },
    {
      title: '商家名称',
      dataIndex: 'supplierName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商家名称'
      }
    },
    {
      title: '供货类型',
      dataIndex: 'goodsSaleTypeDisplay',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsSaleType),
    },
    {
      title: '销售价',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '可用库存',
      dataIndex: 'stockTotal',
      valueType: 'text',
    },
    {
      title: '活动库存',
      dataIndex: 'activityStockTotal',
      valueType: 'text',
    },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'text',
    },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyStateDisplay',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsVerifyState),

    },
    {
      title: '上架状态',
      dataIndex: 'goodsStateDisplay',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsState),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a>编辑</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    api.getConfig()
      .then(res => {
        setConfig(res?.data)
      })
  }, [])

  return (
    <PageContainer>
      {/* <Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card> */}
      <ProTable
        rowKey="id"
        options={false}
        params={{
          selectType: 1,
        }}
        request={(params) => api.productList(params)}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
            <Button key="out">导出</Button>,
          ],
        }}
        columns={columns}
      />
      {/* <Edit
        visible={formVisible}
        onClose={() => { setFormVisible(false) }}
      /> */}
    </PageContainer>

  );
};

export default TableList;
