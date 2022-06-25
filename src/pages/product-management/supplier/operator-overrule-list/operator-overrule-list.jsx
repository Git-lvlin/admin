import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Spin, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import * as api from '@/services/product-management/product-list-purchase';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import ProductDetailDrawer from '@/components/product-detail-drawer'
import { amountTransform, typeTransform } from '@/utils/utils'
import Overrule from '../product-review/overrule';
import { purchaseAuditRefuse, purchaseAuditPass } from '@/services/product-management/product-review'
import { ExclamationCircleOutlined } from '@ant-design/icons'


const SubTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格', dataIndex: 'skuNameDisplay' },
    { title: '零售供货价', dataIndex: 'retailSupplyPrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发供货价', dataIndex: 'wholesaleSupplyPrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发起购量', dataIndex: 'wholesaleMinNum' },
    { title: '市场价', dataIndex: 'marketPriceDisplay' },
    { title: '商品价格', dataIndex: 'salePriceDisplay' },
    { title: '可用库存', dataIndex: 'stockNum' },
  ];

  useEffect(() => {
    setLoading(true);
    api.productList({
      selectType: 2,
      spuId: props.data.spuId
    }).then(res => {
      setData(res?.data)
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <Spin spinning={loading}>
      <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
    </Spin>
  )
};

const TableList = () => {
  const [productDetailDrawerVisible, setProductDetailDrawerVisible] = useState(false);
  const [config, setConfig] = useState({});
  const [selectItem, setSelectItem] = useState(null);
  const [overruleVisible, setOverruleVisible] = useState(false);
  const actionRef = useRef();
  const formRef = useRef();

  const pass = (spuId) => {
    Modal.confirm({
      title: '确认再次提交给运营进行商品配置',
      icon: <ExclamationCircleOutlined />,
      content: <><span style={{ color: 'red' }}>运营已经驳回过</span>，确认要再次提交吗？</>,
      okText: '继续提交',
      cancelText: '暂不提交',
      onOk: () => {
        purchaseAuditPass({ spuId })
          .then(r => {
            if (r.code === 0) {
              actionRef.current.reload()
            }
          })
      }
    });
  }

  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SPU',
        maxLength: 12,
      }
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SKU',
        maxLength: 12,
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
      },
      hideInTable: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        return <a onClick={() => { setSelectItem(record); setProductDetailDrawerVisible(true); }}>{_}</a>
      }
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商家ID'
      },
      // renderFormItem: () => <SupplierSelect />,
      hideInTable: true,
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
      title: '批发样品',
      dataIndex: 'isSample',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => _ === 1 ? '支持' : '不支持'
    },
    {
      title: '批发供货价(元)',
      dataIndex: 'wholesaleSupplyPriceRange',
      valueType: 'text',
      hideInSearch: true,
      width: 120,
      render: (_, data) => data.goodsSaleType === 2 ? '-' : _
    },
    {
      title: '零售供货价(元)',
      dataIndex: 'retailSupplyPriceRange',
      valueType: 'text',
      hideInSearch: true,
      width: 120,
      render: (_, data) => data.goodsSaleType === 1 ? '-' : _
    },
    {
      title: '销售价',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        const { goodsSaleMinPrice, goodsSaleMaxPrice } = data;
        if (goodsSaleMinPrice === goodsSaleMaxPrice) {
          return amountTransform(goodsSaleMinPrice, '/');
        }

        return `${amountTransform(goodsSaleMinPrice, '/')}~${amountTransform(goodsSaleMaxPrice, '/')}`
      }
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '活动库存',
    //   dataIndex: 'activityStockNum',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '上架状态',
    //   dataIndex: 'goodsState',
    //   onFilter: true,
    //   valueType: 'select',
    //   valueEnum: typeTransform(config.goodsState),
    //   hideInTable: true,
    // },
    {
      title: '商品关键词',
      dataIndex: 'goodsKeywords',
      valueType: 'text',
      hideInTable: true,
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
      title: '商品来源',
      dataIndex: 'goodsFromType',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config.operateRole),
      hideInTable: true,
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   valueType: 'dateTimeRange',
    //   hideInTable: true,
    // },
    // {
    //   title: '审核时间',
    //   dataIndex: 'auditTime',
    //   valueType: 'dateTimeRange',
    //   hideInTable: true,
    // },
    {
      title: '驳回原因',
      dataIndex: 'goodsVerifyRemark',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record) => {
        return (
          <>
            <div><a onClick={() => { setSelectItem(record); setOverruleVisible(true) }}>驳回给供应商</a></div>
            <div><a onClick={() => { pass(record.spuId) }}>提交运营配置</a></div>
          </>
        )
      },
      width: 100,
      fixed: 'right'
    },
  ];

  const overrule = (goodsVerifyRemark) => {
    purchaseAuditRefuse({ spuIds: selectItem?.spuId, goodsVerifyRemark })
      .then(res => {
        if (res.code === 0) {
          actionRef.current.reload();
        }
      })
  }

  useEffect(() => {
    api.getConfig()
      .then(res => {
        setConfig(res?.data || [])
      })
  }, [])

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        params={{
          selectType: 1,
          goodsVerifyState: 3,
        }}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        actionRef={actionRef}
        formRef={formRef}
        request={api.productList}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        pagination={{
          pageSize: 10,
        }}
        search={{
          labelWidth: 140,
          defaultCollapsed: true,
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
          ],
        }}
        columns={columns}
      />
      {overruleVisible && <Overrule
        visible={overruleVisible}
        setVisible={setOverruleVisible}
        callback={(text) => { overrule(text) }}
        goodsName={selectItem?.goodsName}
        spuId={selectItem?.spuId}
      />}
      {
        productDetailDrawerVisible &&
        <ProductDetailDrawer
          visible={productDetailDrawerVisible}
          setVisible={setProductDetailDrawerVisible}
          spuId={selectItem?.spuId}
        />
      }

    </PageContainer>
  );
};

export default TableList;
