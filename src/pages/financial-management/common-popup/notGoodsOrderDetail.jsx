import React,{ useState, useEffect } from 'react'
import { Drawer, Space, Button, Modal, Steps, Spin } from 'antd'
import { nichtware } from '@/services/order-management/supplier-order-detail'
import { amountTransform, dateFormat } from '@/utils/utils'
import ProDescriptions from '@ant-design/pro-descriptions'
import LogisticsTrackingModel from '@/components/Logistics-tracking-model'
import styles from './styles.less'

const { Step } = Steps

const payType = {
  0: '模拟支付',
  1: '支付宝',
  2: '微信',
  3: '小程序',
  4: '银联',
  5: '钱包支付',
  6: '支付宝',
  7: '微信',
  8: '银联',
  9: '快捷支付'
}

const Detail = (props) => {
  const { visible, setVisible, id, orderType } = props;
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();

  const getDetailData = () => {
    setLoading(true);
    nichtware({
      orderNo: id,
      type: orderType
    }).then(res => {
      if (res.code === 0) {
        setType(res.data.subType)
        setDetailData(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getDetailData();
  }, [])


  return (
    <Drawer
      title="订单详情"
      width={800}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => { setVisible(false) }}>返回</Button>
          </Space>
        </div>
      }
    >
      <Spin spinning={loading}>
        <div className={styles.order_detail}>
          <div style={{ display: 'flex', marginTop: 30 }}>
            <div style={{ flex: 1, marginRight: 30 }}>
              <div className={styles.box_wrap}>
                <div className={`${styles.box} ${styles.box_header}`}>
                  订单信息
                </div>
                <div className={styles.box}>
                  <div>订单类型</div>
                  <div>{detailData.typeStr}</div>
                </div>
                <div className={styles.box}>
                  <div>订单状态</div>
                  <div>{detailData.payStatus?.desc}</div>
                </div> 
                <div className={styles.box}>
                  <div>订单号</div>
                  <div>{detailData.orderNo}</div>
                </div>
                <div className={styles.box}>
                  <div>下单时间</div>
                  <div>{detailData.createTime}</div>
                </div>
                <div className={styles.box}>
                  <div>下单用户</div>
                  <div>{detailData?.nickname}</div>
                </div>
                <div className={styles.box}>
                  <div>用户手机号</div>
                  <div>{detailData?.memberPhone}</div>
                </div>
                <div className={styles.box}>
                  <div>支付时间</div>
                  <div>{detailData?.payTime}</div>
                </div>
                <div className={styles.box}>
                  <div>支付方式</div>
                  <div>{payType[detailData?.payType]}</div>
                </div>
                <div className={styles.box}>
                  <div>支付流水号</div>
                  <div>{detailData?.payNo}</div>
                </div>
                {
                  type === '1001'&&
                  <div className={styles.box}>
                    <div>收货信息</div>
                    <div className={styles.block}>
                      <p>收货人：{detailData?.receiptUser}</p>
                      <p>收货手机号码：{detailData?.receiptPhone}</p>
                      <p>收货地址：{detailData?.receiptAddress}</p>
                    </div>
                  </div>
                }
                <div className={styles.box}>
                  <div>订单金额</div>
                  <div>{amountTransform(detailData?.payAmount, '/')}</div>
                </div>
                {
                  type === '1001'&&
                  <>
                     <div className={styles.box}>
                      <div>应付金额</div>
                      <div>{amountTransform(detailData?.payAmount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>红包</div>
                      <div>{amountTransform(detailData?.discountAmount, '/')}元</div>
                    </div>
                    <div className={styles.box}>
                      <div>用户实付</div>
                      <div>{amountTransform(detailData?.payAmount, '/')}元</div>
                    </div>
                    {
                      detailData.status != 0 && detailData.status != 6 &&
                      <div className={styles.box}>
                        <div>备注</div>
                        <div>{detailData?.remark}</div>
                      </div>
                    }
                    <div className={`${styles.box} ${styles.box_header}`}>
                      物流信息
                    </div>
                    {
                      detailData.expressDetail && detailData.expressDetail.map((ele, idx) => (
                        <ProDescriptions style={{ padding: '20px' }} column={2} title={"包裹" + parseInt(idx + 1)}>
                          <ProDescriptions.Item
                            label="快递公司"
                          >
                            {ele.expressName}
                          </ProDescriptions.Item>
                          <ProDescriptions.Item
                            label="运单编号"
                          >
                            {ele.shippingCode}
                          </ProDescriptions.Item>
                          <ProDescriptions.Item
                            label="物流进度"
                          >
                            <p className={styles.schedule}>{ele.lastStatus}</p>
                          </ProDescriptions.Item>

                          <ProDescriptions.Item
                            fieldProps={{}}
                          >
                            <LogisticsTrackingModel
                              record={ele.deliveryList}
                              title={'物流跟踪'}
                              byid={ele.id}
                            />
                          </ProDescriptions.Item>
                        </ProDescriptions>
                      ))
                    }
                    <div style={{ flex: 1 }}>
                      <div className={styles.box_wrap}>
                        <div className={`${styles.box} ${styles.box_header}`}>
                          商品信息
                        </div>
                        {
                          detailData?.skuList?.map((res, idx)=> (
                            <div className={styles.box}>
                              <div>商品{idx + 1}</div>
                              <div className={styles.box_wrap}>
                                <div className={styles.box}>
                                  <div>商品名称</div>
                                  <div>{res?.goodsName}</div>
                                </div>
                                <div className={styles.box}>
                                  <div>规格</div>
                                  <div>{res?.skuName}</div>
                                </div>
                                <div className={styles.box}>
                                  <div>单价</div>
                                  <div>{amountTransform(res?.skuSalePrice, '/')}元{detailData?.freight > 0 ? `（含平均运费¥${amountTransform(detailData?.freight, '/')}/${res?.unit}）` : ''}</div>
                                </div>
                                <div className={styles.box}>
                                  <div>购买数量</div>
                                  <div>{res?.skuNum}{res?.unit}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        <div className={styles.box}>
                          <div>买家留言</div>
                          <div>{detailData?.buyerRemark}</div>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Drawer>
  )
}

export default Detail;
