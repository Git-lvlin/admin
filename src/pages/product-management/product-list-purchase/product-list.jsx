import React, { useState, useEffect, useRef } from 'react';
import { Button, Tooltip, Table, Spin } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/product-list-purchase';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import ProductDetailDrawer from '@/components/product-detail-drawer'
// import SupplierSelect from '@/components/supplier-select'
import Edit from './edit';
import OffShelf from './off-shelf';
import { amountTransform, typeTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from 'moment';

const SubTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格', dataIndex: 'skuNameDisplay' },
    { title: '零售供货价', dataIndex: 'retailSupplyPrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发供货价', dataIndex: 'wholesaleSupplyPrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发起购量', dataIndex: 'wholesaleMinNum' },
    // { title: '建议零售价', dataIndex: 'suggestedRetailPriceDisplay' },
    { title: '市场价', dataIndex: 'marketPriceDisplay' },
    { title: '商品价格', dataIndex: 'salePriceDisplay' },
    { title: '可用库存', dataIndex: 'stockNum' },
    // { title: '活动库存', dataIndex: 'activityStockNum' },
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
  const [formVisible, setFormVisible] = useState(false);
  const [productDetailDrawerVisible, setProductDetailDrawerVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [config, setConfig] = useState({});
  const [offShelfVisible, setOffShelfVisible] = useState(false);
  const [selectItemId, setSelectItemId] = useState(null);
  const [alarmMsg, setAlarmMsg] = useState('');
  
  const actionRef = useRef();
  const formRef = useRef();
  const [visit, setVisit] = useState(false)

  const getDetail = (id) => {
    api.getDetail({
      spuId: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData({
          ...res.data,
          settleType: 2,
        });
        setFormVisible(true);
      }
    })
  }

  const getActivityRecord = (record) => {
    api.getActivityRecord({
      spuId: record.spuId
    }).then(res => {
      if (res.code === 0) {
        setAlarmMsg(res.data);
        setSelectItemId(record.spuId);
        setOffShelfVisible(true)
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
        return <a onClick={() => { setSelectItemId(record.spuId); setProductDetailDrawerVisible(true); }}>{_}</a>
      }
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '供应商家',
      dataIndex: 'supplierNameId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商家ID或名称'
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
      title: '批发供货价(元)',
      dataIndex: 'wholesaleSupplyPriceRange',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '零售供货价(元)',
      dataIndex: 'retailSupplyPriceRange',
      valueType: 'text',
      hideInSearch: true,
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
    //   title: '审核状态',
    //   dataIndex: ' ',
    //   onFilter: true,
    //   valueType: 'select',
    //   valueEnum: typeTransform(config.goodsVerifyState),
    //   hideInTable: true,
    // },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyStateDisplay',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        const { goodsVerifyRemark, goodsVerifyState } = record;
        return (
          <>
            {_}&nbsp;
            {(goodsVerifyRemark && goodsVerifyState === 2) && <Tooltip title={goodsVerifyRemark}><QuestionCircleOutlined /></Tooltip>}
          </>
        )
      },
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
      render: (_, record) => {
        const { goodsStateRemark, goodsState } = record;
        return (
          <>
            {_}&nbsp;
            {(goodsStateRemark && goodsState === 0) && <Tooltip title={goodsStateRemark}><QuestionCircleOutlined /></Tooltip>}
          </>
        )
      },
    },
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
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '运营配置时间',
      dataIndex: 'lastOperateTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '最近上架时间',
      dataIndex: 'lastPutonTime',
      valueType: 'dateTimeRange',
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
            {(goodsVerifyState === 1 && goodsState === 1) && <a onClick={() => { getActivityRecord(record); }}>下架</a>}
            &nbsp;{(goodsVerifyState === 1 && goodsState === 0) && <a onClick={() => { onShelf(record.spuId) }}>上架</a>}
            &nbsp;<a onClick={() => { getDetail(record.spuId) }}>编辑</a>
          </>
        )
      },
    },
  ];

  const getFieldValue = () => {
    if (formRef?.current?.getFieldsValue) {
      const { current, pageSize, gcId = [], createTime, auditTime, lastOperateTime, lastPutonTime, ...rest } = formRef?.current?.getFieldsValue?.();

      const obj = {};

      if (createTime) {
        obj.createTimeStart = moment(createTime[0]).unix();
        obj.createTimeEnd = moment(createTime[1]).unix();
      }

      if (auditTime) {
        obj.auditTimeStart = moment(auditTime[0]).unix();
        obj.auditTimeEnd = moment(auditTime[1]).unix();
      }

      if (lastOperateTime) {
        obj.lastOperateTimeStart = moment(lastOperateTime[0]).unix();
        obj.lastOperateTimeEnd = moment(lastOperateTime[1]).unix();
      }

      if (lastPutonTime) {
        obj.lastPutonTimeStart = moment(lastPutonTime[0]).unix();
        obj.lastPutonTimeEnd = moment(lastPutonTime[1]).unix();
      }

      return {
        ...obj,
        selectType: 1,
        gcId1: gcId[0],
        gcId2: gcId[1],
        ...rest
      }
    }
    return {}
  }

  useEffect(() => {
    api.getConfig()
      .then(res => {
        setConfig(res?.data || [])
      })
  }, [])

  return (
    <PageContainer>
      {/* <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>新建</Button>
        </div>
      </Card> */}
      <ProTable
        rowKey="id"
        options={false}
        params={{
          selectType: 1,
        }}
        actionRef={actionRef}
        formRef={formRef}
        request={api.productList}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        pagination={{
          pageSize: 10,
        }}
        search={{
          labelWidth: 140,
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
            <Export
              key="3"
              change={(e) => { setVisit(e) }}
              type="goods-purchase-export"
              conditions={getFieldValue}
            />,
            <ExportHistory key="4" show={visit} setShow={setVisit} type="goods-purchase-export" />,
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
        alarmMsg={alarmMsg}
      />}
      {
        productDetailDrawerVisible &&
        <ProductDetailDrawer
          visible={productDetailDrawerVisible}
          setVisible={setProductDetailDrawerVisible}
          spuId={selectItemId}
        />
      }

    </PageContainer>
  );
};

export default TableList;
