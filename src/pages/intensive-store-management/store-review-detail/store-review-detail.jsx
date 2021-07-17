import React, { useEffect, useState } from 'react';
import { Form, Spin, Space, Image } from 'antd';
import { storeDetail } from '@/services/intensive-store-management/store-review';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

const Detail = () => {
  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    storeDetail({
      applyId: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)

        var marker = new AMap.Marker({
          position: new AMap.LngLat(res.data.details.longitude, res.data.details.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });

        const map = new AMap.Map('container', {
          zoom: 20,//级别
          center: [res.data.details.longitude, res.data.details.latitude],//中心点坐标
        });
        map.add(marker)
      }
    }).finally(() => {
      setLoading(false);
    })

  }, [])
  return (
    <PageContainer>
      <Spin
        spinning={loading}
      >
        <Form
          {...formItemLayout}
          style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 }}
        >
          <Form.Item
            label="手机号"
          >
            {detailData?.details?.phone}
          </Form.Item>
          <Form.Item
            label="店铺名称"
          >
            {detailData?.details?.storeName}
          </Form.Item>
          <Form.Item
            label="所在地区"
          >
            {detailData?.details?.provinceName}
            {detailData?.details?.cityName}
            {detailData?.details?.regionName}
          </Form.Item>
          <Form.Item
            label="详细地址"
          >
            {detailData?.details?.address}
          </Form.Item>
          <Form.Item
            label="门牌号"
          >
            {detailData?.details?.houseNumber}
          </Form.Item>
          <Form.Item
            label="小区名称"
          >
            <div style={{ paddingTop: 5 }}>
              {detailData?.details?.communityName}
              <div id="container" style={{ width: 600, height: 300 }}></div>
            </div>
          </Form.Item>
          <Form.Item
            label="姓名"
          >
            {detailData?.details?.realname}
          </Form.Item>
          <Form.Item
            label="身份证号"
          >
            {detailData?.details?.idNumber}
          </Form.Item>
          <Form.Item
            label="身份证照片"
          >
            <Space>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Image width={100} height={100} src={detailData?.details?.idFront} />
                身份照正面照
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Image width={100} height={100} src={detailData?.details?.idBack} />
                身份照背面照
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Image width={100} height={100} src={detailData?.details?.idHandheld} />
                手持身份照
              </div>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </PageContainer>
  )
}

export default Detail;
