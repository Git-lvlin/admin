import React, { useState, useEffect } from 'react';
import { Typography, Button, Drawer, Space, Spin, Row, Divider, Avatar, Descriptions, Image } from 'antd';
import { getDetail } from '@/services/intensive-store-management/store-detail';
import { amountTransform } from '@/utils/utils'
import Auth from '@/components/auth'
import AddressEdit from './address-edit';

const { Title } = Typography;

const Detail = ({ storeNo, visible, setVisible }) => {
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const getDetailRequest = () => {
    setLoading(true);
    getDetail({
      storeNo
    }).then(res => {
      if (res.code === 0) {
        setDetailData({
          ...res.data,
          storeNo,
        })
      }
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    if (detailData.storeName) {
      var marker = new AMap.Marker({
        position: new AMap.LngLat(detailData.longitude, detailData.latitude),
      });

      const map = new AMap.Map('container', {
        zoom: 20,
        center: [detailData.longitude, detailData.latitude],
      });
      map.add(marker)
    }
  }, [detailData])

  useEffect(() => {
    getDetailRequest();
  }, [])

  return (
    <Drawer
      title="店铺详情"
      width={1200}
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
        <div style={{ background: '#fff', padding: 25 }}>
          <Row >
            <Title style={{ marginBottom: -10 }} level={5}>基本信息</Title>
            <Divider />
            <div style={{ textAlign: 'center', marginRight: 40 }}>
              <Avatar size={100} src={detailData?.storeLogo} />
              <div style={{ marginTop: 10 }}>{detailData?.storeName}</div>
            </div>
            <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 120, display: 'inline-block' }}>
              <Descriptions.Item label="店主昵称手机号">{`${detailData?.member?.nickname === detailData.memberPhone ? '未设置昵称' : detailData?.member?.nickname}（${detailData.memberPhone}）`}</Descriptions.Item>
              <Descriptions.Item label="保证金金额">{`¥${amountTransform(detailData?.deposit?.payAmount, '/') || ''}`}</Descriptions.Item>
              {/* <Descriptions.Item label="店主性别">{detailData?.member?.gender?.desc}</Descriptions.Item> */}
              <Descriptions.Item label="缴纳保证金时间">{detailData?.deposit?.payTime}</Descriptions.Item>
              <Descriptions.Item label="入驻时间">{detailData?.createTime}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{detailData?.memberShop?.applyRow?.createTime}</Descriptions.Item>
              {/* <Descriptions.Item label="微信账号">{detailData?.member?.wechatBindState?.desc}</Descriptions.Item> */}
              {/* <Descriptions.Item label="最近登录时间">{}</Descriptions.Item> */}
            </Descriptions>
          </Row>
          <Row>
            <Title style={{ marginBottom: -10, marginTop: 100 }} level={5}>地址信息</Title>
            <Divider />
            <Descriptions labelStyle={{ textAlign: 'right', width: 120, display: 'inline-block' }}>
              <Descriptions.Item label="所属地区">{detailData?.areaInfo?.[detailData?.provinceId]}{detailData?.areaInfo?.[detailData?.cityId]}{detailData?.areaInfo?.[detailData?.regionId]}</Descriptions.Item>
              <Descriptions.Item label="详细地址">{detailData?.address}</Descriptions.Item>
              <Descriptions.Item label="门牌号">{detailData?.houseNumber}</Descriptions.Item>
              <Descriptions.Item label="经纬度">{detailData?.longitude}，{detailData?.latitude}</Descriptions.Item>
              <Descriptions.Item label="小区名称">{detailData?.memberShop?.communityName}</Descriptions.Item>
              <Descriptions.Item label="收件手机号">{detailData?.phone}</Descriptions.Item>
              <Descriptions.Item label="配送范围">{detailData?.deliveryCoverage ? detailData?.deliveryCoverage / 1000 + 'km' : '店主未配置'}</Descriptions.Item>
            </Descriptions>
          </Row>
          <Row>
            <Title style={{ marginBottom: -10, marginTop: 100 }} level={5}>审核认证资料</Title>
            <Divider />
            <Descriptions labelStyle={{ textAlign: 'right', width: 120, display: 'inline-block' }}>
              <Descriptions.Item label="姓名">{detailData?.memberShop?.applyRow?.realname}</Descriptions.Item>
              <Descriptions.Item label="身份证号码">{detailData?.memberShop?.applyRow?.idNumber}</Descriptions.Item>
            </Descriptions>
            <Descriptions labelStyle={{ textAlign: 'right', width: 120, display: 'inline-block' }}>
              <Descriptions.Item label="审核资料文件">
                <Space>
                  <Image width={100} src={detailData?.memberShop?.applyRow?.idFront} />
                  <Image width={100} src={detailData?.memberShop?.applyRow?.idBack} />
                  <Image width={100} src={detailData?.memberShop?.applyRow?.idHandheld} />
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Row>
          <Auth name="store/memberShop/changeAreaInfo">
            <Button type='primary' style={{ marginBottom: 20 }} onClick={() => { setEdit(true) }}>编辑</Button>
          </Auth>
          {
            edit && <AddressEdit visible={edit} setVisible={setEdit} data={detailData} callback={getDetailRequest} />
          }
          <div id="container" style={{ width: '100%', height: 500 }}></div>
        </div>
      </Spin>
    </Drawer>
  )
}

export default Detail;
