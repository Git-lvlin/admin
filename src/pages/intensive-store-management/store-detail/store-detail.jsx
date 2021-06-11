import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Row, Avatar, Typography } from 'antd';
import { getDetail } from '@/services/intensive-store-management/store-detail';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';

const { Title } = Typography;

const UserDetail = () => {
  const params = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    getDetail({
      storeNo: params.id
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
            <Avatar size={100} src={detailData?.storeLogo} />
            <div style={{marginTop: 10}}>{detailData?.storeName}</div>
          </div>
          <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 120, display: 'inline-block' }}>
            <Descriptions.Item label="店主昵称手机号">{`${detailData?.linkman}（${detailData.phone}）`}</Descriptions.Item>
            <Descriptions.Item label="所属地区">{detailData?.areaInfo && Object.values(detailData?.areaInfo).join('')}</Descriptions.Item>
            <Descriptions.Item label="店主性别">{detailData?.member?.gender?.desc}</Descriptions.Item>
            <Descriptions.Item label="详细地址">{detailData?.address}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{detailData?.createTime}</Descriptions.Item>
            <Descriptions.Item label="微信账号">{detailData?.member?.wechatBindState?.desc}</Descriptions.Item>
            <Descriptions.Item label="押金金额">{`¥${detailData?.deposit?.payAmount || ''}`}</Descriptions.Item>
            {/* <Descriptions.Item label="最近登录时间">{}</Descriptions.Item> */}
          </Descriptions>
        </Row>
      </div>
    </PageContainer>
  )
}

export default UserDetail;
