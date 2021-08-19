import React, { useState,useEffect } from 'react';
import { getDynamicDetail } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Form, Spin,Image } from 'antd';
import moment from 'moment';


export default props => {
  const { id }=props
  const [form] = Form.useForm()
  const [detailData,setDetailData]=useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    getDynamicDetail({id}).then(res=>{
      setDetailData(res.data)
    }).finally(() => {
      setLoading(false);
    })
  },[])

  return (
    <>
      <Spin
        spinning={loading}
      >
          <Form.Item
            label="内容ID"
          >
            {detailData.id}
          </Form.Item>

          <Form.Item
            label="发布时间"
          >
            {moment(Number(detailData.createTime)).format('YYYY-MM-DD HH:mm:ss')}
          </Form.Item>

          <Form.Item
            label="定位"
          >
            {detailData.address}
          </Form.Item>

          <Form.Item
            label="内容"
          >
            {detailData.content}
          </Form.Item>
          <Form.Item
            label="商品快照"
          >
            {
              detailData.images?.map(ele=>(
                <Image style={{margin:'10px'}} width={100} height={100} src={ele} alt="" />
              ))
            }
          </Form.Item>  
      </Spin> 
    </>
  );
};
