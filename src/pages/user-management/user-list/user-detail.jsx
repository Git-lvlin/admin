import React, { useEffect } from 'react';
import { Drawer, Descriptions, Divider, Table, Row, Avatar, Typography } from 'antd';
import { getMemberDetail } from '@/services/user-management/user-list';

const { Title } = Typography;

const dataSource = [];

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '收货人',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '收货人手机号码',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '收货地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '默认地址',
    dataIndex: 'address',
    key: 'address',
  },
];

const UserDetail = (onClose) => {
  useEffect(() => {
    getMemberDetail()
  }, [])
  return (
    <Drawer
      title="用户详情"
      width={1000}
      placement="right"
      onClose={onClose}
      visible
    >
      <Row>
        <Title style={{ marginBottom: -10 }} level={5}>基本信息</Title>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <Avatar size={100} />
          <div>青蜂侠</div>
        </div>
        <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 100, display: 'inline-block' }}>
          <Descriptions.Item label="下单手机号">15822330965</Descriptions.Item>
          <Descriptions.Item label="注册来源">小程序</Descriptions.Item>
          <Descriptions.Item label="邀请码">
            HG8J2W &nbsp;<a>查看二维码</a>
          </Descriptions.Item>
          <Descriptions.Item label="性别">男</Descriptions.Item>
          <Descriptions.Item label="会员店主">
            否
          </Descriptions.Item>
          <Descriptions.Item label="注册时间">
            2021-03-26 12:26:21
          </Descriptions.Item>
          <Descriptions.Item label="微信账号">
            未绑定
          </Descriptions.Item>
          <Descriptions.Item label="所属小区">
            满京华-艺峦大厦
          </Descriptions.Item>
          <Descriptions.Item label="最近登录时间">
            2021-03-26 12:23:55
          </Descriptions.Item>
        </Descriptions>
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Title style={{ marginBottom: -10 }} level={5}>财富小金库</Title>
        <Divider />

        <Descriptions>
          <Descriptions.Item label="积分">6822</Descriptions.Item>
          <Descriptions.Item label="约卡余额">2862.57 元</Descriptions.Item>
          <Descriptions.Item label="优惠券">
            7 张
          </Descriptions.Item>
        </Descriptions>
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Title style={{ marginBottom: -10 }} level={5}>交易信息</Title>
        <Divider />

        <Descriptions>
          <Descriptions.Item label="零售交易金额">30871.75 元</Descriptions.Item>
          <Descriptions.Item label="零售交易单数量">102 单</Descriptions.Item>
          <Descriptions.Item label="零售交易退款金额">
            762.20 元
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Title style={{ marginBottom: -10 }} level={5}>收货地址</Title>
        <Divider />
        <Table style={{ width: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
      </Row>
    </Drawer>
  )
}

export default UserDetail;
