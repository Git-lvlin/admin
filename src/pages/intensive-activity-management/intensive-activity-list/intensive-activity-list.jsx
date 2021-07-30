import React, { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space, Table, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getWholesaleList, getWholesaleDetail, getWholesaleSku, updateWholesaleState } from '@/services/intensive-activity-management/intensive-activity-list'
import { history } from 'umi';
import { amountTransform } from '@/utils/utils'
import Big from 'big.js';

const SubTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
    },
    {
      title: '规格',
      dataIndex: 'skuNameDisplay',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
    },
    // {
    //   title: '结算类型',
    //   dataIndex: 'settleType',
    //   render: (_) => {
    //     return {
    //       0: '全部',
    //       1: '佣金模式',
    //       2: '底价模式'
    //     }[_]
    //   }
    // },
    {
      title: '售价上浮比(%)',
      dataIndex: 'settlePercent',
      render: (_) => `${amountTransform(_)}%`
    },
    {
      title: '批发供货价(元)',
      dataIndex: 'wholesaleSupplyPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '集约库存',
      dataIndex: 'totalStockNum',
    },
    {
      title: '集约价',
      dataIndex: 'price',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '配送费补贴',
      dataIndex: 'fixedPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
    },
    {
      title: '单次限订量',
      dataIndex: 'maxNum',
    },
    {
      title: '集约全款金额',
      dataIndex: 'totalMoney',
      render: (_) => amountTransform(_, '/')
    },
  ];

  useEffect(() => {
    setLoading(true);
    getWholesaleSku({
      wholesaleId: props.wholesaleId
    }).then(res => {
      if (res.code === 0) {
        setData(res?.data?.length ? res.data : [])
      }
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
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState(null)
  // const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const getDetail = (wholesaleId) => {
    getWholesaleDetail({
      wholesaleId
    }).then(res => {
      if (res.code === 0) {
        setVisible(true);
        setDetailData(res.data);
      }
    })
  }

  const update = (wholesaleId) => {
    updateWholesaleState({
      wholesaleId
    }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const columns = [
    {
      title: '活动编号',
      dataIndex: 'wholesaleId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入名称'
      }
    },
    {
      title: '活动状态',
      dataIndex: 'wholesaleIsOnline',
      valueType: 'select',
      valueEnum: {
        1: '待开始',
        2: '进行中',
        3: '已结束',
      },
      hideInTable: true,
    },
    // {
    //   title: '活动时间',
    //   dataIndex: 'wholesaleTime',
    //   valueType: 'dateRange',
    //   hideInTable: true,
    // },
    {
      title: '可购买后销售的社区店等级',
      dataIndex: 'storeLevel',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '可购买的会员等级',
      dataIndex: 'memberLevel',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '可恢复支付次数',
    //   dataIndex: 'canRecoverPayTimes',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    // {
    //   title: '每次恢复的支付时限(小时)',
    //   dataIndex: 'recoverPayTimeout',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (text) => +new Big(text).div(3600).toFixed(1)
    // },
    {
      title: '活动时段',
      dataIndex: 'wholesaleStartTime',
      valueType: 'text',
      hideInSearch: true,
      render: (_, records) => {
        return (
          <>
            <div>{records.wholesaleStartTime}</div>
            <div>{records.wholesaleEndTime}</div>
          </>
        )
      }
    },
    {
      title: '采购单下单截止时间',
      dataIndex: 'endTimeAdvancePayment',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'wholesaleStatusDesc',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a onClick={() => { history.push(`/intensive-activity-management/intensive-activity-detail/${data.wholesaleId}`) }}>详情</a>
          {(data.wholesaleStatusDesc === '待开始' || data.wholesaleStatusDesc === '进行中') && <a style={{ color: 'red' }} onClick={() => { update(data.wholesaleId) }}>终止</a>}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { history.push('/intensive-activity-management/intensive-activity-create') }}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="wholesaleId"
        options={false}
        request={getWholesaleList}
        expandable={{ expandedRowRender: (_) => <SubTable wholesaleId={_.wholesaleId} /> }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>

  );
};

export default TableList;
