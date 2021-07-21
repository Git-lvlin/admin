import React, { useState,useEffect } from 'react';
import { getDynamicDetail } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Divider, Form, Spin,Button,Image } from 'antd';
import moment from 'moment';
import { history } from 'umi';

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
  const byid=props.location.query.byid
  const name=props.location.query.name
  const [form] = Form.useForm()
  const [detailData,setDetailData]=useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    getDynamicDetail({id}).then(res=>{
      setDetailData(res.data)
      console.log('res.data',res.data)
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
              <div style={{display:'flex',width:'300px',flexWrap:'wrap'}}>
                {
                  detailData.images?.map(ele=>(
                    <Image style={{margin:'10px'}} width={100} height={100} src={ele} alt="" />
                  ))
                }
              </div>
            </Form.Item>

          {
           detailData.sourceType==1?
            <Form.Item
              label="商品快照"
            >
             <h3>{detailData.sourceData.subtitle}</h3>
             <h4>{detailData.sourceData.title}</h4>
             <Image src={detailData.sourceData.icon} width={100} height={100} alt="" />
            </Form.Item>
            :null
          }
         
         {
           detailData.sourceType==3?
           <Form.Item
            label="转发内容快照"
          >
            <h3>{detailData.sourceData.subtitle}</h3>
            <h4>{detailData.sourceData.title}</h4>
            <Image src={detailData.sourceData.icon} width={100} height={100} alt="" />
          </Form.Item>
          :null
         }
          <Form.Item
            style={{marginLeft:'90px'}}
          >
            <Button style={{margin:'20px'}} type="primary" onClick={()=>history.push('/community-management/circle-management/circleinterior-management?id='+byid+'&name='+name)}>返回</Button>
          </Form.Item>
          
        </Form>
      </Spin> 
    
    </>
  );
};
