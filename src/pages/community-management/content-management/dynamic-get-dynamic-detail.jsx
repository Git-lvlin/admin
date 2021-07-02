import React, { useState,useEffect } from 'react';
import { getDynamicDetail } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Divider, Form, Spin, Tree,Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { history } from 'umi';
import { number } from 'prop-types';

const formItemLayout = {
  labelCol: { span: 2 },
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

export default props => {
  const id=props.location.query.id
  const [form] = Form.useForm()
  const [detailData,setDetailData]=useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    getDynamicDetail({id}).then(res=>{
      console.log('res',res.data)
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
         <Divider style={{ backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }} orientation="left">帖子详情</Divider>
        <Form
          form={form}
          {...formItemLayout}
          style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 }}
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
                <img width={100} height={100} src={ele} alt="" />
              ))
            }
          </Form.Item>
          <Form.Item
            label="."
          >
            <Button style={{margin:'20px'}} type="primary" onClick={()=>history.push('/community-management/content-management')}>返回</Button>
          </Form.Item>
          
        </Form>
      </Spin> 
    
    </>
  );
};
