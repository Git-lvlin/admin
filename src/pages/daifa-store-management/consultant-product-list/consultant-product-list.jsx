import React, { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space, Table } from 'antd';
import { page_spuList,page_skuList } from '@/services/daifa-store-management/consultant-product-list'
import { history } from 'umi';
import { amountTransform } from '@/utils/utils'
// import Detail from './detail';

const SubTable = (props) => {
  const [data, setData] = useState([])
  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: '供应链skuID',
      dataIndex: 'outSkuId',
    },
    {
      title: '规格1',
      dataIndex: 'skuNameDisplay',
    },
    {
      title: '规格2',
      dataIndex: 'skuNameDisplay',
    },
    {
      title: '店主售价',
      dataIndex: 'goodsName',
      // render: (_) => amountTransform(_, '/')
    },
    {
      title: '供应链销售价',
      dataIndex: 'goodsName',
      // render: (_) => amountTransform(_, '/')
    },
    {
      title: '市场价',
      dataIndex: 'goodsName',
      // render: (_) => amountTransform(_, '/')
    },
    {
      title: '可用库存',
      dataIndex: 'totalStockNum',
    },
    {
      title: '销量',
      dataIndex: 'totalStockNum',
    }
  ];
  useEffect(() => {
    page_skuList({
      spuId: props.spuId,
      storeNo:props.storeNo
    }).then(res => {
      if (res.code === 0) {
        setData(res?.data)
      }
    })
  }, [])
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
};

const consultantProductList = props => {
  let spuId = props.location.query.spuId
  let storeNo = props.location.query.storeNo
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState(null)
  const actionRef = useRef();
  const columns = [
    {
      title: 'spuId',
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: '供应链ID',
      dataIndex: 'outSpuId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '图片',
      dataIndex: 'imageUrl',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'select',
      // render: (_, data) => {
      //   return <a onClick={() => { history.push(`/daifa-store-management/consultant-product-list?spuId=${data.id}&storeNo=${data.storeNo}`) }}>{_}</a>
      // }
    },
    {
      title: '店铺销售价',
      dataIndex: 'salePrice',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '供应链供货价',
      dataIndex: 'marketPrice',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '所属分类',
      dataIndex: 'gcId1Display',
      valueType: 'text',
      valueEnum: {
        0: '批发+零售',
        1: '零售',
        2: '仅批发',
      }
    },
    {
      title: '销量',
      dataIndex: 'saleNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '售卖状态',
      dataIndex: 'storeLevel',
      valueType: 'text',
      valueEnum: {
        0: '批发+零售',
        1: '零售',
        2: '仅批发',
      }
    },
    {
      title: '上架状态',
      dataIndex: 'endTimeAdvancePayment',
      valueType: 'text'
    }
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        request={page_spuList}
        params={{
          spuId,
          storeNo
        }}
        expandable={{ expandedRowRender: (_) => <SubTable spuId={_.spuId} storeNo={_.storeNo} /> }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {detailData && <Detail detailData={detailData} visible={visible} onClose={() => { setVisible(false) }} />}
    </PageContainer>

  );
};

export default consultantProductList;