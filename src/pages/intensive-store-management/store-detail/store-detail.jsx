import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Row, Avatar, Typography } from 'antd';
import { getMemberDetail } from '@/services/user-management/user-list';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';

const { Title } = Typography;

const UserDetail = () => {
  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const { memberInfoToAdminResponse: info } = detailData;

  useEffect(() => {
    getMemberDetail({
      id: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    })
  }, [])
  return (
    <PageContainer>
      <div style={{ background: '#fff', padding: 25 }}>
        <Row >
          <Title style={{ marginBottom: -10 }} level={5}>基本信息</Title>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <Avatar size={100} src={info?.icon} />
            <div>{info?.nickName}</div>
          </div>
          <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 100, display: 'inline-block' }}>
            <Descriptions.Item label="下单手机号">{info?.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="注册来源">{sourceType[info?.sourceType]}</Descriptions.Item>
            <Descriptions.Item label="邀请码">
              HG8J2W &nbsp;<a>查看二维码</a>
            </Descriptions.Item>
            <Descriptions.Item label="性别">{info?.gender === 1 ? '男' : '女'}</Descriptions.Item>
            <Descriptions.Item label="会员店主">
              否
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {info?.createTime}
            </Descriptions.Item>
            <Descriptions.Item label="微信账号">
              {/* 未绑定 */}
            </Descriptions.Item>
            <Descriptions.Item label="所属小区">
              {/* 满京华-艺峦大厦 */}
            </Descriptions.Item>
            <Descriptions.Item label="最近登录时间">
              {info?.loginTime}
            </Descriptions.Item>
          </Descriptions>
        </Row>
      </div>
    </PageContainer>
  )
}

export default UserDetail;
