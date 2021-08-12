import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Space, Button, Modal, Spin } from 'antd';
import { useParams } from 'umi';
import { getSupplierOrderDetail, modifyShip, expressInfo } from '@/services/order-management/supplier-order-detail';
import { amountTransform, dateFormat } from '@/utils/utils'
import { history } from 'umi';

import styles from './style.less';

const { Step } = Steps;

const payType = {
  0: '模拟支付',
  1: '支付宝',
  2: '微信',
  3: '小程序',
  4: '银联',
  5: '钱包支付'
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
      if (res.code ===0) {
        setExpressInfoState(res.data?.deliveryList?.reverse())
      }
    })
  }

  const getDetailData = () => {
    setLoading(true);
    getSupplierOrderDetail({
      orderId: params.id
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
          getDetailData()
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
          getDetailData()
        }
      })
  }

  useEffect(() => {
    getDetailData()
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
                  <div>订单状态</div>
                  <div>{detailData.statusDesc}</div>
                </div>
                <div className={styles.box}>
                  <div>订单号</div>
                  <div>{detailData.orderId}</div>
                </div>
                <div className={styles.box}>
                  <div>下单时间</div>
                  <div>{detailData.createTime}</div>
                </div>
                <div className={styles.box}>
                  <div>下单用户</div>
                  <div>{detailData?.store?.linkman}</div>
                </div>
                <div className={styles.box}>
                  <div>用户手机号</div>
                  <div>{detailData?.store?.phone}</div>
                </div>
                <div className={styles.box}>
                  <div>定金支付时间</div>
                  <div>{dateFormat(detailData?.payAdvance?.payTime * 1000)}</div>
                </div>
                <div className={styles.box}>
                  <div>定金支付方式</div>
                  <div>{payType[detailData?.payAdvance?.payType]}</div>
                </div>
                <div className={styles.box}>
                  <div>定金支付流水号</div>
                  <div>{detailData?.payAdvance?.thirdTransactionId}</div>
                </div>
                <div className={styles.box}>
                  <div>尾款支付类型</div>
                  <div>{detailData?.payFinal?.isPartialPay === 1 && '拼约尾款'}</div>
                </div>
                <div className={styles.box}>
                  <div>尾款支付时间</div>
                  <div>{dateFormat(detailData?.payFinal?.payTime * 1000)}</div>
                </div>
                <div className={styles.box}>
                  <div>尾款支付方式</div>
                  <div>{payType[detailData?.payFinal?.payType]}</div>
                </div>
                <div className={styles.box}>
                  <div>尾款支付流水号</div>
                  <div>{detailData?.payFinal?.thirdTransactionId}</div>
                </div>
                <div className={styles.box}>
                  <div>收货信息</div>
                  <div className={styles.block}>
                    <p>收货人：{detailData?.receivingInfo?.receiptUser}</p>
                    <p>收货手机号码：{detailData?.receivingInfo?.receiptPhone}</p>
                    <p>收货地址：{detailData?.receivingInfo?.receiptAddress}</p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div>物流信息</div>
                  <div className={styles.block}>
                    <p>快递公司：{detailData?.express?.expressName}</p>
                    <p>运单编号：{detailData?.express?.expressNo} {detailData?.express?.expressNo && <a onClick={expressInfoRequest}>物流跟踪</a>}</p>
                    <p>发货时间：{dateFormat(detailData?.express?.expressTime * 1000)}</p>
                    <p>收货时间：{dateFormat(detailData?.receivingInfo?.signForTime * 1000)}</p>
                  </div>
                </div>
              </div>
              <div className={styles.box_wrap} style={{ marginTop: '-1px' }}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  订单金额
                </div>
                <div className={styles.box}>
                  <div>定金</div>
                  <div className={styles.box_wrap}>
                    <div className={styles.box}>
                      <div>应付金额</div>
                      <div>{amountTransform(detailData?.advance?.amount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>优惠券优惠</div>
                      <div>{amountTransform(detailData?.advance?.couponAmount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>用户实付</div>
                      <div>{amountTransform(detailData?.advance?.actualAmount, '/')}元</div>
                    </div>
                  </div>
                </div>
                <div className={styles.box}>
                  <div>尾款</div>
                  <div className={styles.box_wrap}>
                    <div className={styles.box}>
                      <div>应付金额</div>
                      <div>{amountTransform(detailData?.final?.amount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>运费</div>
                      <div>{amountTransform(detailData?.final?.shippingAmount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>用户实付</div>
                      <div>{amountTransform(detailData?.final?.actualAmount, '/')}元</div>
                    </div>
                  </div>
                </div>
                <div className={styles.box}>
                  <div>合计实收</div>
                  <div>{amountTransform(detailData?.actualAmount, '/')}元</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.box_wrap}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  商品信息
                </div>
                <div className={styles.box}>
                  <div>商品1</div>
                  <div className={styles.box_wrap}>
                    <div className={styles.box}>
                      <div>商品名称</div>
                      <div>{detailData?.sku?.goodsName}</div>
                    </div>
                    <div className={styles.box}>
                      <div>规格</div>
                      <div>{detailData?.sku?.skuName}</div>
                    </div>
                    <div className={styles.box}>
                      <div>秒约价</div>
                      <div>{amountTransform(detailData?.sku?.price, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>预定数量</div>
                      <div>{detailData?.sku?.totalNum}件</div>
                    </div>
                    <div className={styles.box}>
                      <div>实发数量</div>
                      <div>{detailData?.sku?.actualSendNum}件</div>
                    </div>
                  </div>
                </div>
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
          onCancel={() => { setExpressInfoState([]) }}
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
