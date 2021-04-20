import React, { useState, useEffect } from 'react';
import { Button, Card, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/product-log';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import Detail from './detail';

const SubTable = (props) => {
  const [data, setData] = useState([])
  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格', dataIndex: 'skuNameDisplay' },
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
    api.logList({
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
  const [visible, setVisible] = useState(false);
  const [selectId, setSelectId] = useState(null);
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
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SKU'
      },
      hideInTable: true,
    },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      hideInSearch: true,
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
      dataIndex: 'goodsSaleType',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsSaleType),
      hideInTable: true,
    },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyState',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsVerifyState),
      hideInTable: true,

    },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyStateDisplay',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '上架状态',
      dataIndex: 'goodsState',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.goodsState),
      hideInTable: true,
    },
    {
      title: '上架状态',
      dataIndex: 'goodsStateDisplay',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '商品分类',
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    {
      title: '商品品牌',
      dataIndex: 'brandId',
      renderFormItem: () => (<BrandSelect />),
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => { setSelectId(record.spuId); setVisible(true) }}>查看日志</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    api.getConfig()
      .then(res => {
        setConfig(res?.data || [])
      })
  }, [])

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="id"
        options={false}
        params={{
          selectType: 1,
        }}
        request={api.logList}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        search={{
          defaultCollapsed: false,
        }}
        columns={columns}
      />
      <Detail
        visible={visible}
        setVisible={setVisible}
        spuId={selectId}
      />
    </PageContainer>

  );
};

export default TableList;
