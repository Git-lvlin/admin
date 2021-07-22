import React, { useState, useEffect, useRef } from 'react';
import { Table, Tooltip, Spin } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons'
import * as api from '@/services/product-management/product-review'
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import SupplierSelect from '@/components/supplier-select'
import FirstReview from './first-review';
import SecondReview from './second-review';
import { typeTransform, amountTransform } from '@/utils/utils'



const SubTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格', dataIndex: 'skuNameDisplay' },
    { title: '零售供货价', dataIndex: 'retailSupplyPrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发供货价', dataIndex: 'wholesalePrice', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '批发起购量', dataIndex: 'wholesaleMinNum' },
    // { title: '建议零售价', dataIndex: 'suggestedRetailPriceDisplay' },
    { title: '市场价', dataIndex: 'marketPriceDisplay' },
    { title: '商品价格', dataIndex: 'salePriceDisplay' },
    { title: '可用库存', dataIndex: 'stockNum' },
    // { title: '活动库存', dataIndex: 'activityStockNum' },
  ];

  useEffect(() => {
    setLoading(true);
    api.checkList({
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
  const [firstReviewVisible, setFirstReviewVisible] = useState(false);
  const [secondReviewVisible, setSecondReviewVisible] = useState(false);
  const [config, setConfig] = useState({});
  const [detailData, setDetailData] = useState(null);
  const actionRef = useRef();

  const getDetail = (record) => {
    if (record.firstAudit === 1) {
      api.getDetail({
        spuId: record.id
      }).then(res => {
        if (res.code === 0) {
          setDetailData({
            ...res.data,
            settleType: 2,
          });
          setFirstReviewVisible(true);
        }
      })
    } else {
      api.noFirstCheckList({
        spuId: record.id
      }).then(res => {
        if (res.code === 0) {
          setDetailData({
            data: res.data?.length ? res.data : [],
            spuId: record.id
          });
          setSecondReviewVisible(true);
        }
      })
    }
  }

  const onShelf = (spuId, cb) => {
    api.onShelf({ spuId }, { showSuccess: true })
      .then(res => {
        if (res.code === 0) {
          actionRef.current.reload();
          if (cb) {
            cb()
          }
        }
      })
  }

  /**
   * 
   * @param {*} type 1:通过并上架，2:只通过，3:驳回
   */
  const firstCheck = (type, checkType, spuId, goodsInfo) => {
    const { supplierHelperId, settleType, goodsSaleType, ...rest } = goodsInfo;
    api.firstCheck({
      checkType,
      spuId,
      isMultiSpec: detailData.isMultiSpec,
      supplierHelperId,
      settleType,
      goodsInfo: rest.goodsInfo,
      goodsSaleType,
    }, { showSuccess: type !== 1 })
      .then(res => {
        if (res.code === 0) {
          if (type === 1) {
            onShelf(spuId, () => {
              setFirstReviewVisible(false)
            })
          } else {
            setFirstReviewVisible(false)
            actionRef.current.reload();
          }
        }
      })
  }

  /**
   * 
   * @param {*} type 1:通过并上架，2:只通过，3:驳回
   */
  const check = (type, checkType, spuId, goodsVerifyRemark) => {
    api.check({
      checkType,
      spuId,
      goodsVerifyRemark
    }, { showSuccess: type !== 1 })
      .then(res => {
        if (res.code === 0) {
          if (type === 1) {
            onShelf(spuId, () => {
              setFirstReviewVisible(false)
              setSecondReviewVisible(false)
            })
          } else {
            setSecondReviewVisible(false)
            setFirstReviewVisible(false)
            actionRef.current.reload();
          }
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
      }
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商ID'
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
    // {
    //   title: '审核状态',
    //   dataIndex: 'goodsVerifyState',
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
    // {
    //   title: '上架状态',
    //   dataIndex: 'goodsState',
    //   onFilter: true,
    //   valueType: 'select',
    //   valueEnum: typeTransform(config.goodsState),
    //   hideInTable: true,
    // },
    {
      title: '审核类型',
      dataIndex: 'firstAuditDisplay',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '上架状态',
    //   dataIndex: 'goodsStateDisplay',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (_, record) => {
    //     const { goodsStateRemark, goodsState } = record;
    //     return (
    //       <>
    //         {_}&nbsp;
    //         {(goodsStateRemark && goodsState === 0) && <Tooltip title={goodsStateRemark}><QuestionCircleOutlined /></Tooltip>}
    //       </>
    //     )
    //   },
    // },
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
          <a onClick={() => { getDetail(record) }}>审核</a>
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
      {/* <Card>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button key="out" type="primary" icon={<PlusOutlined />}>新建</Button>
        </div>
      </Card> */}
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        params={{
          selectType: 1,
        }}
        request={api.checkList}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
      {firstReviewVisible && <FirstReview
        visible={firstReviewVisible}
        setVisible={setFirstReviewVisible}
        detailData={detailData}
        check={firstCheck}
        overrule={check}
      />}
      {secondReviewVisible && <SecondReview
        visible={secondReviewVisible}
        setVisible={setSecondReviewVisible}
        check={check}
        detailData={detailData}
        operateRole={typeTransform(config.operateRole)}
      />}
    </PageContainer>

  );
};

export default TableList;
