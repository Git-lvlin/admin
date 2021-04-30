import { Drawer, Descriptions, Divider, Table, Collapse, Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import styles from './detail.less';

const { Panel } = Collapse;

const columns = [
  {
    title: '商品',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '规格',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '销售价',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '购买数量',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '商品总额',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '店主佣金',
    dataIndex: 'address',
    key: 'address',
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
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            返回
          </Button>
          {/* <Button type="primary">
            Submit
          </Button> */}
        </div>
      }
    >
      <ProCard split="vertical" bordered headerBordered size="small" style={{ marginBottom: 20 }}>
        <ProCard title="订单信息">
          <Descriptions labelStyle={labelStyle}>
            <Descriptions.Item label="订单状态">{detailData.status}</Descriptions.Item>
          </Descriptions>
          <div className="ant-pro-card-title">尾款订单</div>
          <Divider style={{ marginTop: 0 }} />
          <Descriptions labelStyle={labelStyle} column={1}>
            <Descriptions.Item label="订单号">{detailData.orderId}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{detailData.createTime}</Descriptions.Item>
            <Descriptions.Item label="支付方式">微信支付</Descriptions.Item>
            <Descriptions.Item label="支付时间">2021-04-20 18:20:30</Descriptions.Item>
            <Descriptions.Item label="支付流水号">11111111111111</Descriptions.Item>
            <Descriptions.Item label="尾款类型">拼约尾款/直接尾款</Descriptions.Item>
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
            <Descriptions.Item label="收货人">永先生</Descriptions.Item>
            <Descriptions.Item label="手机号码">13800138000</Descriptions.Item>
            <Descriptions.Item label="收货地址">安徽省 合肥市 瑶海区 明光路街道喇叭路</Descriptions.Item>
            <Descriptions.Item label="发货时间"></Descriptions.Item>
            <Descriptions.Item label="发货方式"></Descriptions.Item>
            <Descriptions.Item label="物流公司"></Descriptions.Item>
            <Descriptions.Item label="物流单号"></Descriptions.Item>
          </Descriptions>
        </ProCard>
      </ProCard>
      <Table
        columns={columns}
      />

      <div className={styles.mark}>
        <div>买家备注:</div>
        <Descriptions labelStyle={labelStyle} column={1}>
          <Descriptions.Item label="商品总额">￥10000.00</Descriptions.Item>
          <Descriptions.Item label="优惠券优惠">￥0.00</Descriptions.Item>
          <Descriptions.Item label="运费">￥0.00</Descriptions.Item>
          <Descriptions.Item label={<span className={styles.red}>实付金额</span>}><span className={styles.red}>￥0.00</span></Descriptions.Item>
        </Descriptions>
      </div>

      <Collapse defaultActiveKey={['1']}>
        <Panel header="物流详情" key="1">
          <p>131414</p>
        </Panel>
      </Collapse>
    </Drawer>
  )
}

export default Detail;
