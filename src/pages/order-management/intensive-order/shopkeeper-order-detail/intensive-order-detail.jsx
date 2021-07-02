import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Space, Button, Modal, Spin } from 'antd';
import { useParams } from 'umi';
import { getOrderDetail, modifyShip, expressInfo } from '@/services/order-management/shopkeeper-order-detail';
import { amountTransform, dateFormat } from '@/utils/utils'
import { history } from 'umi';

import styles from './style.less';

const { Step } = Steps;

const payType = {
  1: '支付宝',
  2: '微信',
  3: '银联',
}

const OrderDetail = () => {
  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const [deliveryVisible, setDeliveryVisible] = useState(false)
  const [expressInfoState, setExpressInfoState] = useState([])
  const [loading, setLoading] = useState(false);


  const expressInfoRequest = () => {
    expressInfo({
      shippingCode: detailData.express.expressNo,
      expressType: detailData.express.companyNo,
      mobile: detailData.receivingInfo.receiptPhone,
      deliveryTime: detailData.express.expressTime
    }).then(res => {
      if (res.code === 0) {
        setExpressInfoState(res.data?.deliveryList?.reverse())
      }
    })
  }

  const getDetailDataRequest = () => {
    setLoading(true);
    getOrderDetail({
      id: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })
  }

  const orderShipRequest = (values) => {
    orderShip({
      orderId: detailData.orderId,
      ...values,
    }, { showSuccess: true })
      .then(res => {
        if (res.code === 0) {
          getDetailDataRequest()
        }
      })
  }

  const modifyShipRequest = (values) => {
    modifyShip({
      orderId: detailData.orderId,
      oldExpressNo: detailData.express.expressNo,
      ...values,
    }, { showSuccess: true })
      .then(res => {
        if (res.code === 0) {
          getDetailDataRequest()
        }
      })
  }

  useEffect(() => {
    getDetailDataRequest()
  }, [])

  return (
    <PageContainer style={{ backgroundColor: '#fff', minHeight: '100%', paddingBottom: 40 }}>
      <Spin spinning={loading}>
        <div className={styles.order_detail}>
          <Steps progressDot current={detailData.status}>
            {
              detailData?.Process?.map(item => (
                <Step title={item.name} description={<><div>{item.time}</div></>} />
              ))
            }
          </Steps>
          <div style={{ display: 'flex', marginTop: 30 }}>
            <div style={{ flex: 1, marginRight: 30 }}>
              <div className={styles.box_wrap}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  订单信息
                </div>
                <div className={styles.box}>
                  <div>所属商家</div>
                  <div>{detailData.storeName}</div>
                </div>
                <div className={styles.box}>
                  <div>订单状态</div>
                  <div>{{ 1: '待付款', 2: '待发货', 3: '已发货', 4: '已完成', 5: '已关闭', 6: '无效订单', 7: '待分享' }[detailData.status]}</div>
                </div>
                <div className={styles.box}>
                  <div>订单号</div>
                  <div>{detailData.orderSn}</div>
                </div>
                <div className={styles.box}>
                  <div>下单时间</div>
                  <div>{detailData.createTime?.replace('T', ' ')}</div>
                </div>
                <div className={styles.box}>
                  <div>下单用户</div>
                  <div>{detailData.buyerName}</div>
                </div>
                <div className={styles.box}>
                  <div>用户手机号</div>
                  <div>{detailData.buyerPhone}</div>
                </div>
                <div className={styles.box}>
                  <div>支付时间</div>
                  <div>{dateFormat(detailData?.sumOrder?.payTime)}</div>
                </div>
                <div className={styles.box}>
                  <div>支付方式</div>
                  <div>{payType[detailData?.sumOrder?.payType]}</div>
                </div>
                <div className={styles.box}>
                  <div>支付流水号</div>
                  <div>{detailData?.sumOrder?.paySN}</div>
                </div>
                <div className={styles.box}>
                  <div>收货信息</div>
                  <div className={styles.block}>
                    <p>收货人：{detailData?.sumOrder?.consignee}</p>
                    <p>收货手机号码：{detailData?.sumOrder?.phone}</p>
                    <p>收货地址：{detailData?.sumOrder?.fullAddress}</p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div>物流信息</div>
                  <div className={styles.block}>
                    <p>快递公司：{detailData?.expressName}</p>
                    <p>运单编号：{detailData?.shippingCode}</p>
                    <p>发货时间：{dateFormat(detailData?.deliveryTime)}</p>
                    <p>收货时间：{dateFormat(detailData?.receiveTime)}</p>
                  </div>
                </div>
              </div>
              <div className={styles.box_wrap} style={{ marginTop: '-1px' }}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  订单金额
                </div>
                <div className={styles.box}>
                  <div>商品总金额</div>
                  <div>{amountTransform(detailData?.sumOrder?.totalAmount, '/')}元</div>
                </div>
                <div className={styles.box}>
                  <div>运费</div>
                  <div>+{amountTransform(detailData?.sumOrder?.shippingFeeAmount, '/')}元</div>
                </div>
                <div className={styles.box}>
                  <div>优惠券优惠</div>
                  <div>-{amountTransform(detailData?.sumOrder?.couponAmount, '/')}元</div>
                </div>
                <div className={styles.box}>
                  <div>用户实付</div>
                  <div>{amountTransform(detailData?.sumOrder?.payAmount, '/')}元</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.box_wrap}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  商品信息
                </div>
                {
                  detailData?.orderItemList?.map((item, index) => (
                    <div className={styles.box}>
                      <div>商品{index + 1}</div>
                      <div className={styles.box_wrap}>
                        <div className={styles.box}>
                          <div>商品名称</div>
                          <div>{item.goodsName}</div>
                        </div>
                        <div className={styles.box}>
                          <div>规格</div>
                          <div>{item.skuName}</div>
                        </div>
                        <div className={styles.box}>
                          <div>集约价</div>
                          <div>{amountTransform(item.skuSalePrice, '/')}元</div>
                        </div>
                        <div className={styles.box}>
                          <div>购买数量</div>
                          <div>{item.skuNum}件</div>
                        </div>
                        <div className={styles.box}>
                          <div>小计</div>
                          <div>{amountTransform(item.totalAmount, '/')}元</div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                <div className={styles.box}>
                  <div>买家留言</div>
                  <div>{detailData?.receivingInfo?.remark}</div>
                </div>
              </div>
            </div>
          </div>
          <Space style={{ marginTop: 30 }}>
            <Button type="primary" onClick={() => { history.goBack() }}>返回</Button>
          </Space>
        </div>
        {deliveryVisible &&
          <Delivery
            visible={deliveryVisible}
            setVisible={setDeliveryVisible}
            callback={(values) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              detailData?.express?.expressId ? modifyShipRequest(values) : orderShipRequest(values)
            }}
            data={{
              expressId: detailData?.express?.expressId,
              expressNo: detailData?.express?.expressNo
            }}
          />
        }
        <Modal
          title="物流跟踪"
          visible={expressInfoState.length}
          footer={[
            <Button type="primary" onClick={() => { setExpressInfoState([]) }}>
              确定
            </Button>,
          ]}
        >
          <Steps progressDot current={999} direction="vertical">
            {
              expressInfoState.map(item => (
                <Step title={item.content} description={item.time} />
              ))
            }
          </Steps>
        </Modal>
      </Spin>
    </PageContainer>
  )
}


export default OrderDetail
