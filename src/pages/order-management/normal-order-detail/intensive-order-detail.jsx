import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Space, Button, Modal } from 'antd';
import { useParams } from 'umi';
import { findAdminOrderDetail, deliverGoods, expressInfo } from '@/services/order-management/normal-order-detail';
import { amountTransform, dateFormat } from '@/utils/utils'
import { history } from 'umi';

import styles from './style.less';

const { Step } = Steps;

const OrderDetail = () => {

  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const [expressInfoState, setExpressInfoState] = useState([])

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

  const getDetailData = () => {
    findAdminOrderDetail({
      id: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    })
  }

  const orderShipRequest = (values) => {
    deliverGoods({
      id: params.id,
      shippingCode: values.expressNo,
      expressType: values.expressId,
      expressName: values.expressName
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
      <div className={styles.order_detail}>
        <Steps progressDot current={detailData.status - 1}>
          <Step title="订单提交" description={<><div>{detailData.createTime}</div></>} />
          <Step title="订单支付" description={<><div>{detailData.paymentTime}</div></>} />
          <Step title="订单发货" description={<><div>{detailData.deliveryTime}</div></>} />
          <Step title="订单收货" description={<><div>{detailData.receiveTime}</div></>} />
          <Step title="订单完成" description={<><div>{detailData.receiveTime}</div></>} />
        </Steps>
        <div style={{ display: 'flex', marginTop: 30 }}>
          <div style={{ flex: 1, marginRight: 30 }}>
            <div className={styles.box_wrap}>
              <div className={`${styles.box} ${styles.box_header}`}>
                订单信息
              </div>
              <div className={styles.box}>
                <div>订单类型</div>
                <div>{detailData.orderTypeStr}</div>
              </div>
              <div className={styles.box}>
                <div>订单状态</div>
                <div>{detailData.statusStr}</div>
              </div>
              <div className={styles.box}>
                <div>订单号</div>
                <div>{detailData.orderSn}</div>
              </div>
              <div className={styles.box}>
                <div>下单时间</div>
                <div>{detailData?.createTime}</div>
              </div>
              <div className={styles.box}>
                <div>下单用户</div>
                <div>{detailData?.buyerNickname}</div>
              </div>
              <div className={styles.box}>
                <div>用户手机号</div>
                <div>{detailData?.buyerPhone}</div>
              </div>
              <div className={styles.box}>
                <div>支付时间</div>
                <div>{detailData?.paymentTime}</div>
              </div>
              <div className={styles.box}>
                <div>支付方式</div>
                <div>{detailData?.payTypeStr}</div>
              </div>
              <div className={styles.box}>
                <div>支付流水号</div>
                <div>{detailData?.paySn}</div>
              </div>
              <div className={styles.box}>
                <div>收货信息</div>
                <div className={styles.block}>
                  <p>收货人：{detailData?.consignee}</p>
                  <p>收货手机号码：{detailData?.phone}</p>
                  <p>收货地址：{detailData?.fullAddress}</p>
                </div>
              </div>
              <div className={styles.box}>
                <div>物流信息</div>
                <div className={styles.block}>
                  <p>快递公司：{detailData?.expressName}</p>
                  <p>运单编号：{detailData?.shippingCode} {detailData?.shippingCode && <a onClick={expressInfoRequest}>物流跟踪</a>}</p>
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
                <div>{amountTransform(detailData?.goodsTotalAmount, '/')}元</div>
              </div>
              <div className={styles.box}>
                <div>运费</div>
                <div>+{amountTransform(detailData?.shippingFeeAmount, '/')}元</div>
              </div>
              <div className={styles.box}>
                <div>优惠券优惠</div>
                <div>-{amountTransform(detailData?.couponAmount, '/')}元</div>
              </div>
              <div className={styles.box}>
                <div>用户实付</div>
                <div>{amountTransform(detailData?.payAmount, '/')}元</div>
              </div>
              <div className={styles.box}>
                <div>实收</div>
                <div>{amountTransform(detailData?.incomeAmount, '/')}</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className={styles.box_wrap}>
              <div className={`${styles.box} ${styles.box_header}`}>
                商品信息
              </div>
              {
                detailData?.goodsInfo?.map((item, index) => (
                  <div key={item.id} className={styles.box}>
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
                        <div>{{ 1: '秒约', 2: '单约', 3: '团约' }[detailData.orderType]}价</div>
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
                <div>{detailData?.note}</div>
              </div>
            </div>
          </div>
        </div>
        <Space style={{ marginTop: 30 }}>
          <Button type="primary" onClick={() => { history.goBack() }}>返回</Button>
        </Space>
      </div>
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
    </PageContainer>
  )
}


export default OrderDetail
