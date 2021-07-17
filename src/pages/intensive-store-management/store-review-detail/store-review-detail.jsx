import React, { useEffect, useState, useRef } from 'react';
import { Form, Spin, Space, Image } from 'antd';
import { storeDetail } from '@/services/intensive-store-management/store-review';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import AddressCascader from '@/components/address-cascader'
import Upload from '@/components/upload';


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

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right}</div>
  </div>
)

const ImageInfo = ({ value, onChange }) => {
  const [idHandheld, setIdHandheld] = useState(value?.idHandheld);
  const [idCardFrontImg, setIdCardFrontImg] = useState(value?.idCardFrontImg);
  const [idCardBackImg, setIdCardBackImg] = useState(value?.idCardBackImg);
  const update = (obj) => {
    onChange({
      idCardFrontImg,
      idCardBackImg,
      idHandheld,
      ...obj,
    })
  }
  const idHandheldChange = (e) => {
    setIdHandheld(e)
    update({
      idHandheld: e,
    })
  }
  const idCardFrontImgChange = (e) => {
    setIdCardFrontImg(e)
    update({
      idCardFrontImg: e,
    })
  }
  const idCardBackImgChange = (e) => {
    setIdCardBackImg(e)
    update({
      idCardBackImg: e,
    })
  }
  console.log('value', idCardFrontImg);
  return (
    <div>
      <Space>
        <Upload code={305} value={idCardFrontImg} text="上传身份证姓名面照片" maxCount={1} accept="image/*" size={1024 * 1} onChange={idCardFrontImgChange} />
        <Upload code={305} value={idCardBackImg} text="上传身份证国徽面照片" maxCount={1} accept="image/*" size={1024 * 1} onChange={idCardBackImgChange} />
        <Upload code={305} value={idHandheld} text="上传手持身份证照片" maxCount={1} accept="image/*" size={1024 * 1} onChange={idHandheldChange} />
      </Space>
    </div>

  )
}

const Detail = () => {
  const params = useParams();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm()
  const [addressText, setAddressText] = useState('');
  const [location, setLocation] = useState([]);
  const map = useRef();


  useEffect(() => {
    setLoading(true);
    storeDetail({
      applyId: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)

        const { details } = res.data;
        setLocation([details.longitude, details.latitude]);
        map.current = new AMap.Map('container', {
          zoom: 20,
          center: [details.longitude, details.latitude],
        });
        map.current.add(new AMap.Marker({
          position: new AMap.LngLat(details.longitude, details.latitude),
        }))
        map.current.on('click', function (ev) {
          map.current.clearMap()
          const marker = new AMap.Marker({
            position: new AMap.LngLat(ev.lnglat.lng, ev.lnglat.lat),
          });
          map.current.add(marker)
          setLocation([ev.lnglat.lng, ev.lnglat.lat]);
        });

        form.setFieldsValue({
          area: [
            { label: details.provinceName, value: details.provinceId },
            { label: details.cityName, value: details.cityId },
            { label: details.regionName, value: details.regionId },
          ],
          address: details.address,
          houseNumber: details.houseNumber,
          communityName: details.communityName,
          imageInfo: {
            idCardFrontImg: details.idFront,
          }
        })
      }
    }).finally(() => {
      setLoading(false);
    })

  }, [])

  useEffect(() => {
    if (addressText) {
      AMap.plugin('AMap.Autocomplete', function () {
        const autoOptions = {
          city: '全国'
        }
        const autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(addressText, function (status, result) {
          if (result.info === 'OK') {
            map.current.clearMap()
            map.current.setZoomAndCenter(20, [result.tips[0].location.lng, result.tips[0].location.lat])
            const marker = new AMap.Marker({
              position: new AMap.LngLat(result.tips[0].location.lng, result.tips[0].location.lat),
            });
            map.current.add(marker)
            setLocation([result.tips[0].location.lng, result.tips[0].location.lat])
          }
        })
      })
    }
  }, [addressText])

  return (
    <PageContainer>
      <Spin
        spinning={loading}
      >
        <ProForm
          {...formItemLayout}
          style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 }}
          form={form}
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
            rules={[{ required: true, message: '请选择所在地区' }]}
            name="area"
          >
            <AddressCascader style={{ width: 328 }} />
          </Form.Item>
          <ProFormText
            name="address"
            label="详细地址"
            placeholder="请输入详细地址"
            rules={[{ required: true, message: '请输入详细地址' }]}
            width="md"
          />
          <ProFormText
            name="houseNumber"
            label="门牌号"
            placeholder="请输入门牌号"
            rules={[{ required: true, message: '请输入门牌号' }]}
            width="md"
          />
          <ProFormText
            name="communityName"
            label="小区名称"
            placeholder="请输入小区名称"
            validateFirst
            rules={[
              { required: true, message: '请输入小区名称' },
              { required: true, message: '小区名称2-60个字符', min: 2, max: 60 },
            ]}
            fieldProps={{
              maxLength: 60,
            }}
            width="md"
          />
          <div id="container" style={{ width: 600, height: 300, marginBottom: 10, marginLeft: 600 }}></div>
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
            label="审核资料文件"
            name="imageInfo"
            validateFirst
            rules={[
              () => ({
                required: true,
                validator(_, value = {}) {
                  const { idCardFrontImg, idCardBackImg, idHandheld } = value;
                  if (!idCardFrontImg) {
                    return Promise.reject(new Error('请上身份证正面照片'));
                  }
                  if (!idCardBackImg) {
                    return Promise.reject(new Error('请上传身份证背面照片'));
                  }
                  if (!idHandheld) {
                    return Promise.reject(new Error('请上传手持身份证照片'));
                  }
                  return Promise.resolve();
                },
              })
            ]}
          >
            <FromWrap
              content={(value, onChange) => (<ImageInfo value={value} onChange={onChange} />)}
              right={
                <dl>
                  <dt>图片要求</dt>
                  <dd>1.图片大小1MB以内</dd>
                  <dd>2.图片格式为：jpg/png/gif</dd>
                </dl>
              }
            />

          </Form.Item>
        </ProForm>
      </Spin>
    </PageContainer>
  )
}

export default Detail;
