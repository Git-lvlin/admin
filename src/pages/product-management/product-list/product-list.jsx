import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/product-list';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import Edit from './edit';
import OffShelf from './off-shelf';

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
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [config, setConfig] = useState({});
  const [offShelfVisible, setOffShelfVisible] = useState(false);
  const [selectItemId, setSelectItemId] = useState(null);
  const actionRef = useRef();

  const getDetail = (id) => {
    api.getDetail({
      spuId: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data);
        setFormVisible(true);
      }
    })
  }

  const onShelf = (spuId) => {
    api.onShelf({
      spuId
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const offShelf = (spuId, goodsStateRemark) => {
    api.offShelf({
      spuId,
      goodsStateRemark,
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
        setSelectItemId(null);
      }
    })
  }

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
      title: '供货类型',
      dataIndex: 'goodsSaleTypeDisplay',
      valueType: 'text',
      hideInSearch: true,
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
      render: (_, record) => {
        const { goodsVerifyState, goodsState } = record;
        return (
          <>
            {(goodsVerifyState === 1 && goodsState === 1) && <a onClick={() => { setSelectItemId(record.spuId); setOffShelfVisible(true) }}>下架</a>}
            &nbsp;{(goodsVerifyState === 1 && goodsState === 0) && <a onClick={() => { onShelf(record.spuId) }}>上架</a>}
            &nbsp;<a onClick={() => { getDetail(record.spuId) }}>编辑</a>
          </>
        )
      },
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
        actionRef={actionRef}
        request={api.productList}
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
      {formVisible && <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}
      {offShelfVisible && <OffShelf
        visible={offShelfVisible}
        setVisible={setOffShelfVisible}
        callback={(text) => { offShelf(selectItemId, text) }}
      />}
    </PageContainer>
  );
};

export default TableList;
