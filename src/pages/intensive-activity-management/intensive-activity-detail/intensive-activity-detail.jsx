import React, { useState, useEffect } from 'react';
import { Spin, Descriptions, Divider, Table, Row, Typography } from 'antd';
import { amountTransform } from '@/utils/utils'
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholesaleDetail } from '@/services/intensive-activity-management/intensive-activity-list'


const { Title } = Typography;

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
    width: 200,
  },
  {
    title: '供应商家ID',
    dataIndex: 'supplierId',
  },
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

const Detail = () => {
  const [detailData, setDetailData] = useState({})
  const [loading, setLoading] = useState(false)
  const params = useParams();

  const getDetail = (wholesaleId) => {
    setLoading(true);
    getWholesaleDetail({
      wholesaleId
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data);
      }
    }).finally(()=>{
      setLoading(false);
    })
  }

  useEffect(() => {
    getDetail(params?.id)
  }, [])
  return (
    <PageContainer>
      <Spin
        spinning={loading}
      >
        <div style={{ backgroundColor: '#fff', padding: 20, paddingBottom: 100 }}>
          <Row>
            <Title style={{ marginBottom: -10 }} level={5}>活动商品</Title>
            <Divider />
            <Table style={{ width: '100%' }} rowKey="skuId" pagination={false} dataSource={detailData.sku} columns={columns} />
          </Row>

          <Row style={{ marginTop: 50 }}>
            <Title style={{ marginBottom: -10 }} level={5}>活动参数</Title>
            <Divider />
            <Descriptions labelStyle={{ textAlign: 'right', width: 150, display: 'inline-block' }}>
              <Descriptions.Item label="活动名称">{detailData?.wholesale?.name}</Descriptions.Item>
              <Descriptions.Item label="活动时间"><span style={{ position: 'absolute', marginTop: -10 }}>{detailData?.wholesale?.wholesaleStartTime}<br />{detailData?.wholesale?.wholesaleEndTime}</span></Descriptions.Item>
              <Descriptions.Item label="采购单下单截止时间">
                {detailData?.wholesale?.endTimeAdvancePayment}
              </Descriptions.Item>
              <Descriptions.Item label="可购买的社区店等级">{detailData?.wholesale?.storeLevel}</Descriptions.Item>
              <Descriptions.Item label="可购买的会员用户">
                {detailData?.wholesale?.memberLevel}
              </Descriptions.Item>
              <Descriptions.Item label="活动创建人">
                {detailData?.wholesale?.createAdminName}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {detailData?.wholesale?.createTime}
              </Descriptions.Item>
              {/* <Descriptions.Item label="可恢复支付次数">
            {detailData?.wholesale.canRecoverPayTimes}
          </Descriptions.Item>
          <Descriptions.Item label="每次恢复支付时长">
            {detailData?.wholesale.recoverPayTimeout / 3600}小时
          </Descriptions.Item> */}
            </Descriptions>
          </Row>
        </div>
      </Spin>
      
    </PageContainer>
  );
};

export default Detail;
