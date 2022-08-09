import React, { useState, useEffect } from 'react';
import { Drawer, Space, Button, Modal, Steps, Spin,Image } from 'antd';
import { findAdminOrderDetail, findAdminOrderDetail2 } from '@/services/order-management/normal-order-detail';
import { amountTransform } from '@/utils/utils'
import styles from './style.less';

export default (props) => {
  const { visible, setVisible, onClose, id } = props;
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Drawer
      title="订单详情"
      width={1000}
      placement="right"
      onClose={() => { setVisible(false);onClose() }}
      visible={visible}
      footer={false}
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
                  <div>{detailData?.orderTypeStr}</div>
                </div>
                <div className={styles.box}>
                  <div>订单状态</div>
                  <div>{detailData?.statusStr}</div>
                </div>
                <div className={styles.box}>
                  <div>订单编号</div>
                  <div>{detailData?.orderSn}</div>
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
                  <div>机器ID</div>
                  <div>{detailData?.buyerPhone}</div>
                </div>
                <div className={styles.box}>
                  <div>启动费金额</div>
                  <div>{detailData?.buyerPhone}</div>
                </div>
                <div className={styles.box}>
                  <div>用户实付</div>
                  <div>{detailData?.buyerPhone}</div>
                </div>
                <div className={styles.box}>
                  <div>支付方式</div>
                  <div>{detailData?.payTypeStr}</div>
                </div>
                <div className={styles.box}>
                  <div>支付时间</div>
                  <div>{detailData?.payTime}</div>
                </div>
                <div className={styles.box}>
                  <div>支付流水号</div>
                  <div>{detailData?.paySn}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Drawer>
  )
}
