import React, { useState,useEffect } from 'react';
import { getDynamicDetail } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Button, Descriptions } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { number } from 'prop-types';


export default props => {
  const id=props.location.query.id
  const [detailData,setDetailData]=useState([])
  useEffect(()=>{
    getDynamicDetail({id}).then(res=>{
      console.log('res',res.data)
      setDetailData(res.data)
    })
    return undefined
  },[])

  return (
    <>
    <Descriptions title="帖子详情" style={{background:'#fff',padding:'20px'}}>
        <Descriptions.Item label="内容ID">{detailData.id}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{moment(Number(detailData.createTime)).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="定位">{detailData.address}</Descriptions.Item>
        <Descriptions.Item label="内容">{detailData.content}</Descriptions.Item>
    </Descriptions>
    <Button style={{margin:'20px'}} type="primary" onClick={()=>history.push('/community-management/content-management')}>返回</Button>
    </>
  );
};
