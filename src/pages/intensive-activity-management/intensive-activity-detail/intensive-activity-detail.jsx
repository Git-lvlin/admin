import React, { useState, useEffect } from 'react';
import { Spin, Descriptions, Divider, Table, Row, Typography, Image } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholesaleDetail } from '@/services/intensive-activity-management/intensive-activity-list'
import LadderDataEdit from '../intensive-activity-create/ladder-data-edit'
import PriceExplanation from '../intensive-activity-create/price-explanation'


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
      title: '商品分类',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      render: (_, data) => `${data.gcId1Display}-${data.gcId2Display}`,
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
      title: `批发供货价(元/${detailData?.sku?.[0]?.unit})`,
      dataIndex: 'wholesaleSupplyPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: `市场价(元/${detailData?.sku?.[0]?.unit})`,
      dataIndex: 'marketPrice',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: `平均运费(元/${detailData?.sku?.[0]?.unit})`,
      dataIndex: 'wholesaleFreight',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '集约库存',
      dataIndex: 'totalStockNum',
      render: (_, record) => {
        return (
          <>
            <div>{_}{record.unit}</div>
            {record.batchNumber > 1 && record.wsUnit && <div>({_ * record.batchNumber}){record.wsUnit}</div>}
          </>
        )
      }
    },
    {
      title: `集约价(元/${detailData?.sku?.[0]?.unit})`,
      dataIndex: 'price',
      render: (_) => amountTransform(_, '/')

    },
    {
      title: `实际盈亏(元/${detailData?.sku?.[0]?.unit})`,
      dataIndex: 'profit',
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
    // {
    //   title: '社区店特殊补贴',
    //   render: () => (
    //     <>
    //       <div>当订单金额达到 {detailData?.wholesale?.orderAmount / 100}元</div>
    //       <div>实际盈亏为 {detailData?.wholesale?.orderProfit / 100}元</div>
    //       <div>补贴 {detailData?.wholesale?.subsidy / 100}元</div>
    //     </>
    //   )
    // },
    {
      title: '集采箱规单位量',
      dataIndex: 'batchNumber',
      render: (_, record) => {
        return (
          <span>{_}{record.unit}{record.batchNumber > 1 && record.wsUnit && `/${record.wsUnit}`}</span>
        )
      }
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
      render: (_, record) => {
        return (
          <>
            <div>{_}{record.unit}</div>
            {record.batchNumber > 1 && record.wsUnit && <div>({_ * record.batchNumber}){record.wsUnit}</div>}
          </>
        )
      }
    },
    {
      title: '单次限订量',
      dataIndex: 'maxNum',
      render: (_, record) => {
        return (
          <>
            <div>{_}{record.unit}</div>
            {record.batchNumber > 1 && record.wsUnit && <div>({_ * record.batchNumber}){record.wsUnit}</div>}
          </>
        )
      }
    },
    {
      title: '集约全款金额',
      dataIndex: 'totalMoney',
      render: (_) => amountTransform(_, '/')
    },
  ];

  const getLadderData = () => {
    return detailData?.sku?.[0]?.ladderSubsidy.map(item => (
      {
        ...item,
        totalExtraScale: amountTransform(item.totalExtraScale),
        operationPercent: amountTransform(item.operationPercent),
        storePercent: amountTransform(item.storePercent),
      }
    ))
  }

  const getSkuData = () => {
    return detailData?.sku.map(item => {
      return {
        ...item,
        wholesaleSupplyPrice: item.wholesaleSupplyPrice / 100,
        price: item.price / 100,
        profit: item.profit / 100,
      }
    })[0]
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
            <Table style={{ width: '100%' }} rowKey="skuId" pagination={false} dataSource={detailData.sku} columns={columns} scroll={{ x: 'max-content' }} />
          </Row>

          <Row style={{ marginTop: 50 }}>
            <Title style={{ marginBottom: -10 }} level={5}>活动参数</Title>
            <Divider />
            <Descriptions labelStyle={{ textAlign: 'right', width: 150, display: 'inline-block' }}>
              <Descriptions.Item label="活动名称">{detailData?.wholesale?.name}</Descriptions.Item>
              <Descriptions.Item label="活动开始时间">{detailData?.wholesale?.wholesaleStartTime}</Descriptions.Item>
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
              <Descriptions.Item label="实际盈亏(元)">
                {detailData?.sku?.[0]?.profit / 100}元/{detailData?.sku?.[0]?.unit}
              </Descriptions.Item>
              <Descriptions.Item label="箱柜单位量">
                {detailData?.sku?.[0]?.batchNumber}
              </Descriptions.Item>
              <Descriptions.Item label="平均运费">
                {detailData?.sku?.[0]?.wholesaleFreight / 100}元/{detailData?.sku?.[0]?.unit}
              </Descriptions.Item>
              <Descriptions.Item label="商品分类">
                {detailData?.sku?.[0]?.gcId1Display}-{detailData?.sku?.[0]?.gcId2Display}
              </Descriptions.Item>
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
              <Descriptions.Item label="商品主图">
                <Image src={detailData?.sku?.[0]?.goodsImageUrl} width={50} />
              </Descriptions.Item>
              {detailData?.wholesale?.shareImg &&
                <Descriptions.Item label="分享海报">
                  <Image src={detailData?.wholesale?.shareImg} width={100} />
                </Descriptions.Item>
              }
              {/* <Descriptions.Item label="可恢复支付次数">
            {detailData?.wholesale.canRecoverPayTimes}
          </Descriptions.Item>
          <Descriptions.Item label="每次恢复支付时长">
            {detailData?.wholesale.recoverPayTimeout / 3600}小时
          </Descriptions.Item> */}
            </Descriptions>
            {detailData?.wholesale?.isEditSubsidy === 1 &&
              <div style={{ marginBottom: 20 }}>
                当店主采购订单金额达到{detailData?.wholesale?.orderAmount / 100}元时，补贴社区店店主{detailData?.wholesale?.subsidy / 100}元/{detailData?.sku?.[0]?.unit}
              </div>
            }
            {detailData?.wholesale?.isEditSubsidy === 2 && <div>
              <LadderDataEdit
                data={getLadderData()}
                batchNumber={detailData?.sku?.[0]?.batchNumber}
                unit={detailData?.sku?.[0]?.unit}
                wsUnit={detailData?.sku?.[0]?.wsUnit}
                skuData={getSkuData()}
                readOnly="1"
              />
              <div><InfoCircleOutlined />&nbsp;<PriceExplanation skuData={getSkuData()} ladderData={getLadderData()} /></div>
              <div style={{ marginTop: 20 }}>前端奖励展示需完成量:{detailData?.sku?.[0]?.ladderShowPercent * 100}%</div>
            </div>}
          </Row>

          <Row>
            <Title style={{ marginBottom: -10, marginTop: 20 }} level={5}>操作日志</Title>
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
