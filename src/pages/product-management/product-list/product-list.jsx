import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import XLSX from 'xlsx'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/product-list';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import Edit from './edit';
import OffShelf from './off-shelf';
import { amountTransform, typeTransform } from '@/utils/utils'

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
    { title: '可用库存', dataIndex: 'stockNum' },
    { title: '活动库存', dataIndex: 'activityStockNum' },
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

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [config, setConfig] = useState({});
  const [offShelfVisible, setOffShelfVisible] = useState(false);
  const [selectItemId, setSelectItemId] = useState(null);
  const actionRef = useRef();
  const formRef = useRef();

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
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品SPU'
      }
    },
    {
      title: 'skuID',
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
      hideInSearch: true,
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '活动库存',
      dataIndex: 'activityStockNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'text',
      hideInSearch: true,
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
      title: '商品关键字',
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

  const exportExcel = (form) => {
    api.listExport({
      ...form.getFieldsValue(),
    }).then(res => {
      if (res.code === 0) {
        const data = res.data.map(item => {
          const { goodsState, goodsFromType, goodsVerifyState, ...rest } = item;
          return {
            ...rest,
            retailSupplyPrice: amountTransform(rest.retailSupplyPrice, '/'),
            suggestedRetailPrice: amountTransform(rest.suggestedRetailPrice, '/'),
            wholesalePrice: amountTransform(rest.wholesalePrice, '/'),
          }
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
          {
            spuId: 'spuId',
            goodsName: '商品名称',
            skuId: 'skuId',
            skuSpec: '规格组合',
            goodsFromTypeDisplay: '供货类型',
            retailSupplyPrice: '零售价',
            suggestedRetailPrice: '建议零售价',
            wholesalePrice: '批发价',
            stockNum: '可用库存',
            activityNum: '活动库存',
            isFreeFreightDisplay: '是否包邮',
            supportNoReasonReturn: '七天无理由退货',
            goodsVerifyStateDisplay: '审核状态',
            goodsStateDisplay: '上架状态',
            createTime: '创建时间',
          },
          ...data
        ], {
          header: [
            'spuId',
            'goodsName',
            'skuId',
            'skuSpec',
            'goodsFromTypeDisplay',
            'retailSupplyPrice',
            'suggestedRetailPrice',
            'wholesalePrice',
            'stockNum',
            'activityNum',
            'isFreeFreightDisplay',
            'supportNoReasonReturn',
            'goodsVerifyStateDisplay',
            'goodsStateDisplay',
            'createTime',
          ],
          skipHeader: true
        });
        XLSX.utils.book_append_sheet(wb, ws, "file");
        XLSX.writeFile(wb, `${+new Date()}.xlsx`)

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
        formRef={formRef}
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
            <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
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
