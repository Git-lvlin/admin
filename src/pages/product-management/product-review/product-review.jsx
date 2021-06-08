import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import * as api from '@/services/product-management/product-review'
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import FirstReview from './first-review';
import SecondReview from './second-review';
import { typeTransform } from '@/utils/utils'



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
    // { title: '活动库存', dataIndex: 'activityStockNum' },
  ];

  useEffect(() => {
    api.checkList({
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
          setDetailData(res.data);
          setFirstReviewVisible(true);
        }
      })
    } else {
      api.noFirstCheckList({
        spuId: record.id
      }).then(res => {
        if (res.code === 0) {
          setDetailData({
            data: res.data,
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
    const { supplierHelperId, settleType, ...rest } = goodsInfo;
    api.firstCheck({
      checkType,
      spuId,
      isMultiSpec: detailData.isMultiSpec,
      supplierHelperId,
      settleType,
      goodsInfo: rest.goodsInfo
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
    // {
    //   title: '活动库存',
    //   dataIndex: 'activityStockNum',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
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
      title: '审核类型',
      dataIndex: 'firstAuditDisplay',
      valueType: 'text',
      hideInSearch: true,
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
