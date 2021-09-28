import React, { useState, useEffect } from 'react';
import { Drawer, Typography, Space, Button, Divider, Row, Col, Table, Modal, Steps } from 'antd';
import { detail, expressInfo } from '@/services/order-management/intensive-purchase-order'
import { amountTransform } from '@/utils/utils'
import moment from 'moment';

const { Title } = Typography;
const { Step } = Steps;

const Detail = (props) => {
  const { visible, setVisible, id } = props;
  const [detailData, setDetailData] = useState({});
  const [expressInfoState, setExpressInfoState] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: '采购商品',
      dataIndex: 'spuId',
      render: (_, data) => {
        return (
          <div style={{ display: 'flex' }}>
            <img src={data.goodsImageUrl} width={50} height={50} />
            <div style={{ marginLeft: 10 }}>
              <div>{data.goodsName}</div>
              <div>{data.goodsSkuName}</div>
            </div>
          </div>
        )
      }
    },
    {
      title: '采购数量',
      dataIndex: 'goodsSkuNums',
    },
    {
      title: '采购金额',
      dataIndex: 'goodsPayment',
      render: (_) => amountTransform(_, '/'),
    },
    {
      title: '待发货数量',
      dataIndex: 'goodsSkuNums',
    },
  ]);

  const getExpressInfo = (record) => {
    expressInfo({
      shippingCode: record.expressNo,
      expressType: record.companyNo,
      mobile: detailData.operationReceiptPhone,
      deliveryTime: record.expressTime
    })
      .then(res => {
        if (res.code === 0) {
          setExpressInfoState(res?.data?.deliveryList || []);
        }
      })
  }

  const columns2 = [
    {
      title: '包裹',
      dataIndex: 'goodsSkuNums',
      render: (a, b, c) => c + 1
    },
    {
      title: '物流公司',
      dataIndex: 'expressName',
    },
    {
      title: '物流单号',
      dataIndex: 'expressNo',
    },
    {
      title: '发货时间',
      dataIndex: 'expressTime',
      render: (_) => moment(_ * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => { getExpressInfo(record) }}>查看进度</a>
          </Space>
        )
      },
    },
  ]

  const columns3 = [
    {
      title: '采购订单号',
      dataIndex: 'poNo',
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
    },
    {
      title: '采购商品数量',
      dataIndex: 'totalNum',
    },
  ]

  const getDetail = () => {
    detail({
      poNo: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
        if (res.data.status === 1) {
          setColumns([
            {
              title: '采购商品',
              dataIndex: 'spuId',
              render: (_, data) => {
                return (
                  <div style={{ display: 'flex' }}>
                    <img src={data.goodsImageUrl} width={50} height={50} />
                    <div style={{ marginLeft: 10 }}>
                      <div>{data.goodsName}</div>
                      <div>{data.goodsSkuName}</div>
                    </div>
                  </div>
                )
              }
            },
            {
              title: '采购数量',
              dataIndex: 'goodsSkuNums',
            },
            {
              title: '采购金额',
              dataIndex: 'orderAmount',
              render: (_) => amountTransform(_, '/'),
            },
            {
              title: '待发货数量',
              dataIndex: 'goodsSkuNums',
            },
          ])
        }
      }
    })
  }

  useEffect(() => {
    getDetail();
  }, [])

  return (
    <Drawer
      title="订单详情"
      width={1200}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => { setVisible(false) }}>返回</Button>
            {/* <Button onClick={() => { }} type="danger">审核拒绝</Button> */}
            {/* <Button onClick={() => { }} type="primary">审核通过去开户</Button> */}
          </Space>
        </div>
      }
    >
      <Title style={{ marginBottom: -20 }} level={5}>基本信息</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Col span={24}>采购单号：{detailData?.poNo}</Col>
        <Col span={24}>订单状态：{detailData?.statusDesc}</Col>
        <Col span={24}>创建时间：{detailData?.createTime}</Col>
      </Row>

      <Title style={{ marginBottom: -20, marginTop: 30 }} level={5}>付款信息</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Col span={24}>应付金额：{amountTransform(detailData?.orderAmount, '/')}元</Col >
        <Col span={24}>已付金额：{amountTransform(detailData?.paidAmount, '/')}元</Col>
        <Col span={24}>未付金额：{amountTransform(detailData?.unpaidAmount, '/')}元</Col>
      </Row>

      <Title style={{ marginBottom: -20, marginTop: 30 }} level={5}>收货信息</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Col span={24}>收货方：{detailData?.operationName}</Col >
        <Col span={24}>收货人：{detailData?.operationReceiptUser}</Col>
        <Col span={24}>手机号：{detailData?.operationReceiptPhone}</Col>
        <Col span={24}>收货地址：{detailData?.operationReceiptAddress}</Col>
      </Row>

      <Title style={{ marginBottom: -20, marginTop: 30 }} level={5}>商品信息</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Table style={{ width: '100%' }} pagination={false} dataSource={[detailData]} columns={columns} />
      </Row>

      <Title style={{ marginBottom: -20, marginTop: 30 }} level={5}>社区店采购订单列表</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Table style={{ width: '100%' }} rowKey="expressId" pagination={false} dataSource={detailData?.purchaseOrderList || []} columns={columns3} />
      </Row>

      <Title style={{ marginBottom: -20, marginTop: 30 }} level={5}>物流信息</Title>
      <Divider />
      <Row gutter={[0, 16]}>
        <Table style={{ width: '100%' }} rowKey="expressId" pagination={false} dataSource={detailData?.expressList} columns={columns2} />
      </Row>


      {!!expressInfoState.length && <Modal
        title="物流跟踪"
        visible={expressInfoState.length}
        footer={[
          <Button key="1" type="primary" onClick={() => { setExpressInfoState([]) }}>
            确定
          </Button>,
        ]}
        onCancel={() => { setExpressInfoState([]) }}
      >
        <Steps progressDot current={999} direction="vertical">
          {
            expressInfoState.map(item => (
              <Step key={item.time} title={item.content} description={item.time} />
            ))
          }
        </Steps>
      </Modal>}
    </Drawer>
  )
}

export default Detail;
