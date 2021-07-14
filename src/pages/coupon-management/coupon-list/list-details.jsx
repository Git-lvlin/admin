import React, { useState,useEffect,useRef } from 'react';
import { couponDetail } from '@/services/coupon-management/coupon-detail';
import { Divider, Form, Spin,Button } from 'antd';
import ProTable from '@ant-design/pro-table';
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
  const ref=useRef()
  const id=props.location.query.id
  const [form] = Form.useForm()
  const [detailData,setDetailData]=useState([])
  const [loading, setLoading] = useState(false);
  const columns= [
    {
      title: '群体名称',
      dataIndex: 'couponName',
      valueType: 'text',
    },
    {
      title: '选项',
      dataIndex: 'couponType'
    },
    {
        title: '范围',
        dataIndex: 'couponStatus',
        valueType: 'select',
        valueEnum: {
          1: '包含',
          2: '不包含',
        },
    },
    {
        title: '条件',
        dataIndex: 'useType',
    } 
  ];
  const columns2= [
    {
      title: 'spuID',
      dataIndex: 'couponName',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'couponType'
    },
    {
        title: '结算模式',
        dataIndex: 'couponStatus',
        valueType: 'select',
        valueEnum: {
          1: '包含',
          2: '不包含',
        },
    },
    {
        title: '供货价',
        dataIndex: 'useType',
    },
    {
        title: '销售价',
        dataIndex: 'useType',
    }, 
    {
        title: '可用库存',
        dataIndex: 'useType',
    },
  ];
  const columns3= [
    {
      title: '活动编号',
      dataIndex: 'couponName',
      valueType: 'text',
    },
    {
      title: '活动名称',
      dataIndex: 'couponType',
      valueType: 'text',
    },
    {
        title: '活动时段',
        dataIndex: 'couponStatus',
        valueType: 'text',
    },
    {
        title: '可购买的会员店等级',
        dataIndex: 'useType',
        valueType: 'text'
    },
    {
        title: '可购买的会员用户',
        dataIndex: 'useType',
        valueType: 'text'
    },
  ];
 
  useEffect(()=>{
    setLoading(true);
    couponDetail({id}).then(res=>{
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
         <h1>查看详情</h1>
         <Button style={{marginBottom:'20px'}} type="primary" onClick={()=>history.goBack()}>返回</Button>
        <Form
          form={form}
          {...formItemLayout}
          style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 }}
        >
          <Divider style={{ backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }} orientation="left">基本信息</Divider>
          <Form.Item
            label="优惠券名称"
          >
            {detailData.couponName}
          </Form.Item>

          <Form.Item
            label="优惠券类型"
          >
            {detailData.couponType}
          </Form.Item>

          <Form.Item
            label="使用门槛"
          >
            {detailData.address}
          </Form.Item>

          <Form.Item
              label="券面值"
            >
              {detailData.content}
              {
                detailData.images?.map(ele=>(
                  <img style={{display:"block"}} width={100} height={100} src={ele} alt="" />
                ))
              }
            </Form.Item>
            <Form.Item
              label="发行方式"
            >
              {detailData.address}
          </Form.Item>
          <Form.Item
            label="发放数量"
          >
            {detailData.issueQuantity}
          </Form.Item>
          <Form.Item
            label="每人限领"
          >
            {detailData.limitQuantity}
          </Form.Item>
          <Form.Item
            label="可领取时间"
          >
            {detailData.limitStartTime+' -- '+detailData.limitEndTime}
          </Form.Item>
          <Form.Item
            label="有效期"
          >
            <p>领券{detailData.activityStartDay}天起，{detailData.activityEndDay}天内可用</p>
          </Form.Item>
     
          <Form.Item
            label="可领券群体"
          >
            <ProTable
              actionRef={ref}
              rowKey="id"
              options={false}
              // params={{
              // status: 1,
              // }}
              // request={couponList}
              search={false}
              columns={columns}
            />
          </Form.Item>

          <Divider style={{ backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }} orientation="left">使用设置</Divider>
          
          <Form.Item
            label="使用范围"
          >
            {detailData.useType}
          </Form.Item>

          <Form.Item
            label="商品范围"
          >
            {detailData.goodsType}
            <ProTable
              actionRef={ref}
              rowKey="id"
              options={false}
              // params={{
              // status: 1,
              // }}
              // request={couponList}
              search={false}
              columns={columns2}
            />
          </Form.Item>
          <Form.Item
            label="可用人群"
          >
            {detailData.memberType}
          </Form.Item>

          <Form.Item
              label="规则说明"
            >
              {detailData.couponRule}
          </Form.Item>
        </Form>
      </Spin> 
    
    </>
  );
};
