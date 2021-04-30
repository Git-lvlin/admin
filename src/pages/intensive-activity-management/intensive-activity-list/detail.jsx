import { Drawer, Descriptions, Divider, Table, Row, Avatar, Typography } from 'antd';

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
  },
  {
    title: '结算类型',
    dataIndex: 'address',
  },
  {
    title: '销售价',
    dataIndex: 'salePrice',
  },
  {
    title: '市场价',
    dataIndex: 'salePrice',
  },
  {
    title: '限售起售量',
    dataIndex: 'salePrice',
  },
  {
    title: '集约库存',
    dataIndex: 'salePrice',
  },
  {
    title: '集约价',
    dataIndex: 'salePrice',
  },
  {
    title: '集约量',
    dataIndex: 'salePrice',
  },
  {
    title: '集约全款金额',
    dataIndex: 'salePrice',
  },
];

const Detail = ({ onClose, visible, detailData }) => {
  const { wholesale } = detailData;
  return (
    <Drawer
      title="活动详情"
      width={1000}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Row>
        <Title style={{ marginBottom: -10 }} level={5}>活动商品</Title>
        <Divider />
        <Table style={{ width: '100%' }} rowKey="skuId" pagination={false} dataSource={detailData.sku} columns={columns} />
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Title style={{ marginBottom: -10 }} level={5}>活动参数</Title>
        <Divider />
        <Descriptions labelStyle={{ textAlign: 'right', width: 150, display: 'inline-block' }}>
          <Descriptions.Item label="活动名称">{wholesale.name}</Descriptions.Item>
          <Descriptions.Item label="活动时间"><span style={{ position: 'absolute', marginTop: -10 }}>{wholesale.wholesaleStartTime}<br />{wholesale.wholesaleEndTime}</span></Descriptions.Item>
          <Descriptions.Item label="订金支付时间">
            {wholesale.endTimeAdvancePayment}
          </Descriptions.Item>
          <Descriptions.Item label="可购买的会员店等级">{wholesale.storeLevel}</Descriptions.Item>
          <Descriptions.Item label="可购买的会员用户">
            {wholesale.memberLevel}
          </Descriptions.Item>
          <Descriptions.Item label="可恢复支付次数">
            {wholesale.canRecoverPayTimes}
          </Descriptions.Item>
          <Descriptions.Item label="每次恢复支付时长">
            {wholesale.orderPayTimeout / 3600}小时
          </Descriptions.Item>
        </Descriptions>
      </Row>

    </Drawer>
  )
}

export default Detail;
