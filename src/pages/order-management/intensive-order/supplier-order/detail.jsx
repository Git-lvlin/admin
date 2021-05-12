import { Drawer, Descriptions, Divider, Table, Collapse, Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import styles from './detail.less';
import { amountTransform } from '@/utils/utils'

const { Panel } = Collapse;

const columns = [
  {
    title: '商品',
    dataIndex: 'goodsName',
    render(_, data) {
      return (
        <div style={{ display: 'flex' }}>
          <img src={data.skuImageUrl} width={50} height={50} />
          <div style={{ marginLeft: 10 }}>
            <div>{data.goodsName}</div>
            <div>{data.skuName}</div>
          </div>
        </div>
      );
    }
  },
  {
    title: '店主价',
    dataIndex: 'price',
    render: (_) => amountTransform(_, '/')
  },
  {
    title: '预订量',
    dataIndex: 'advancePaymentNum',
  },
  {
    title: '待付订金',
    dataIndex: '',
  },
  {
    title: '实付订金',
    dataIndex: '',
  },
  {
    title: '实发货量',
    dataIndex: 'actualSendNum',
  },
  {
    title: '待付尾款',
    dataIndex: '',
  },
  {
    title: '实付尾款',
    dataIndex: '',
  },
];

const labelStyle = {
  textAlign: 'right',
  width: 100,
  display: 'inline-block'
}

const Detail = ({ onClose, visible, detailData }) => {
  return (
    <Drawer
      title="订单详情"
      width={1000}
      placement="right"
      onClose={onClose}
      visible={visible}
      className={styles.page}
    // footer={
    //   <div
    //     style={{
    //       textAlign: 'right',
    //     }}
    //   >
    //     <Button onClick={onClose} style={{ marginRight: 8 }}>
    //       返回
    //     </Button>
    //     <Button type="primary">
    //       Submit
    //     </Button>
    //   </div>
    // }
    >
      <ProCard split="vertical" bordered headerBordered size="small" style={{ marginBottom: 20 }}>
        <ProCard title="订单信息">
          <Descriptions labelStyle={labelStyle}>
            <Descriptions.Item label="订单状态">{detailData.status}</Descriptions.Item>
          </Descriptions>
          <div className="ant-pro-card-title">订金订单</div>
          <Divider style={{ marginTop: 0 }} />
          <Descriptions labelStyle={labelStyle} column={1}>
            <Descriptions.Item label="订单号">{detailData?.payInfo?.advance?.orderId}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{detailData?.payInfo?.advance?.payTime}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{{ 0: '模拟支付', 1: '支付宝', 2: '微信', 3: '小程序', 4: '银联', 5: '钱包支付' }[detailData?.payInfo?.advance?.payType]}</Descriptions.Item>
            <Descriptions.Item label="支付时间"></Descriptions.Item>
            <Descriptions.Item label="支付流水号">{detailData?.payInfo?.advance?.thirdTransactionId}</Descriptions.Item>
            <Descriptions.Item label="尾款类型"></Descriptions.Item>
          </Descriptions>
          <div className="ant-pro-card-title">尾款订单</div>
          <Divider style={{ marginTop: 0 }} />
          <Descriptions labelStyle={labelStyle} column={1}>
            <Descriptions.Item label="订单号">{detailData.orderId}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{detailData.createTime}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{{ 0: '模拟支付', 1: '支付宝', 2: '微信', 3: '小程序', 4: '银联', 5: '钱包支付' }[detailData?.payInfo?.advance?.payType]}</Descriptions.Item>
            <Descriptions.Item label="支付时间"></Descriptions.Item>
            <Descriptions.Item label="支付流水号">{detailData?.payInfo?.advance?.thirdTransactionId}</Descriptions.Item>
            <Descriptions.Item label="尾款类型"></Descriptions.Item>
          </Descriptions>
        </ProCard>
        <ProCard split="horizontal">
          <ProCard title="供应商信息" style={{ flex: 1 }}>
            <Descriptions labelStyle={labelStyle} column={1}>
              <Descriptions.Item label="供应商名称">{detailData.supplier.companyName}</Descriptions.Item>
              <Descriptions.Item label="供应商手机号">{detailData.supplier.companyUserPhone}</Descriptions.Item>
            </Descriptions>
          </ProCard>
          <ProCard title="店主信息" style={{ flex: 1 }}>
            <Descriptions labelStyle={labelStyle} column={1}>
              <Descriptions.Item label="店主姓名">{detailData.store.linkman}</Descriptions.Item>
              <Descriptions.Item label="店主手机号">{detailData.store.phone}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </ProCard>
        <ProCard title="收/发货信息">
          <Descriptions labelStyle={labelStyle} column={1}>
            <Descriptions.Item label="收货人">{detailData.express.receiptUser}</Descriptions.Item>
            <Descriptions.Item label="手机号码">{detailData.express.receiptPhone}</Descriptions.Item>
            <Descriptions.Item label="收货地址">{detailData.express.receiptAddress}</Descriptions.Item>
            <Descriptions.Item label="发货时间">{detailData.express.deliveryTime}</Descriptions.Item>
            <Descriptions.Item label="发货方式">{detailData.express.sendTypeName}</Descriptions.Item>
            <Descriptions.Item label="物流公司">{detailData.express.expressName}</Descriptions.Item>
            <Descriptions.Item label="物流单号">{detailData.express.expressNo}</Descriptions.Item>
          </Descriptions>
        </ProCard>
      </ProCard>
      <Table
        columns={columns}
        dataSource={detailData?.sku}
        pagination={false}
      />

      <div className={styles.mark}>
        <div>买家备注:</div>
        <Descriptions labelStyle={labelStyle} column={1}>
          <Descriptions.Item label="商品总额"></Descriptions.Item>
          <Descriptions.Item label="优惠券优惠"></Descriptions.Item>
          <Descriptions.Item label="运费"></Descriptions.Item>
          <Descriptions.Item label={<span className={styles.red}>实付金额</span>}><span className={styles.red}></span></Descriptions.Item>
        </Descriptions>
      </div>

      {detailData.expressDetail && <Collapse defaultActiveKey={['1']}>
        <Panel header="物流详情" key="1">
          {
            detailData.expressDetail.deliveryList.map(item => (
              <div>
                <time>{item.time}</time> {item.content}
              </div>
            ))
          }
        </Panel>
      </Collapse>}
    </Drawer>
  )
}

export default Detail;
