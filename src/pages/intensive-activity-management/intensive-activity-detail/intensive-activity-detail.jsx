import React, { useState, useEffect } from 'react';
import { Spin, Descriptions, Divider, Table, Row, Typography, Image } from 'antd';
import { amountTransform } from '@/utils/utils'
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholesaleDetail } from '@/services/intensive-activity-management/intensive-activity-list'


const { Title } = Typography;



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
    }).finally(() => {
      setLoading(false);
    })
  }

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
      title: '上架状态',
      dataIndex: 'goodsStateDesc',
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
      title: '是否指定配送补贴',
      render: () => detailData?.wholesale?.isEditSubsidy === 0 ? '否' : '是',
    },
    {
      title: '运营中心配送费补贴',
      dataIndex: 'operationFixedPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '社区店配送费补贴',
      dataIndex: 'fixedPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '社区店特殊补贴',
      render: () => (
        <>
          <div>当订单金额达到 {detailData?.wholesale?.orderAmount / 100}元</div>
          <div>实际盈亏为 {detailData?.wholesale?.orderProfit / 100}元</div>
          <div>补贴 {detailData?.wholesale?.subsidy / 100}元</div>
        </>
      )
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
            <Table style={{ width: '100%' }} rowKey="skuId" pagination={false} dataSource={detailData.sku} columns={columns} scroll={{ x: 'max-content' }} />
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
              {detailData?.wholesale?.shareImg &&
                <Descriptions.Item label="分享海报">
                  <Image src={detailData?.wholesale?.shareImg} width={100} />
                </Descriptions.Item>
              }
              <Descriptions.Item label="配送模式">
                {detailData?.wholesale?.wholesaleFlowTypeDesc}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {detailData?.wholesale?.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="可集约店铺区域">
                <div>
                  {detailData?.allowArea?.map?.(item => (item.areaName)).join('，')}
                </div>
              </Descriptions.Item>
              {/* <Descriptions.Item label="可恢复支付次数">
            {detailData?.wholesale.canRecoverPayTimes}
          </Descriptions.Item>
          <Descriptions.Item label="每次恢复支付时长">
            {detailData?.wholesale.recoverPayTimeout / 3600}小时
          </Descriptions.Item> */}
            </Descriptions>
          </Row>

          <Row>
            <Title style={{ marginBottom: -10 }} level={5}>操作日志</Title>
            <Divider />
            <Table
              style={{ width: '100%' }}
              rowKey="time"
              pagination={false}
              dataSource={detailData?.logs || []}
              columns={[
                {
                  title: '序号',
                  dataIndex: '',
                  render: (a, b, index) => {
                    return detailData?.logs.length - index
                  }
                },
                {
                  title: '操作对象账户名称',
                  dataIndex: 'operatorName',
                },
                {
                  title: '操作项',
                  dataIndex: 'typeName',
                },
                {
                  title: '说明',
                  dataIndex: 'logDesc',
                  render: (_) => {
                    return _.map(item => {
                      if (item.type === 3) {
                        return (
                          <>
                            <div>{item.actionRemark}</div>
                            <div>新值：{item.actionAfter && <Image width={50} src={item.actionAfter} />}</div>
                            <div>旧值：{item.actionBefore && <Image width={50} src={item.actionBefore} />}</div>
                          </>
                        )
                      }

                      if (item.type === 2) {
                        return (
                          <>
                            <div>{item.actionRemark}</div>
                            <div>新值：{item.actionAfter}</div>
                            <div>旧值：{item.actionBefore}</div>
                          </>
                        )
                      }

                      return item.actionRemark
                    })
                  }
                },
                {
                  title: '操作时间',
                  dataIndex: 'time',
                },
              ]}
            />
          </Row>
        </div>
      </Spin>

    </PageContainer>
  );
};

export default Detail;
