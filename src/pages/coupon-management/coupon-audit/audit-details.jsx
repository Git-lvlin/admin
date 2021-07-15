import React, { useState,useEffect,useRef } from 'react';
import { couponVerifyDetail,couponVerify } from '@/services/coupon-management/coupon-audit';
import { couponCrowdList} from '@/services/crowd-management/coupon-crowd';
import { Divider, Form, Spin,Button } from 'antd';
import ProForm from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import AuditModel from './audit-model'
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

const SubTable = (props) => {
  const [data, setData] = useState([])
  const {name}=props
  const columns = [
    {
      title: '选项',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        1: '会员等级',
        2: '消费次数',
        3: '累计消费'
      },
      hideInSearch: true,
  },
    {
        title: '范围',
        dataIndex: 'isContain',
        valueType: 'select',
        valueEnum: {
          1: '包含',
          2: '不包含',
        },
        hideInSearch: true,
    },
    {
        title: '条件',
        dataIndex: 'msgDisplay',
        hideInSearch: true,
    }
  ];
  useEffect(() => {
    if(name){
      couponCrowdList({
        name:name
      }).then(res => {
        if (res.code === 0) {
          setData(res?.data?.[0].crowdInfo)
        }
      })
    }
  }, [])
  return (
    <ProTable toolBarRender={false} search={false} key="type" columns={columns} dataSource={data} pagination={false} />
  )
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
      dataIndex: 'name',
      valueType: 'text',
    }
  ];
  const columns2= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName'
    },
    {
        title: '结算模式',
        dataIndex: 'settleType',
        valueType: 'select',
        valueEnum: {
          1: '佣金模式',
          2: '底价模式',
          3: '集约模式'
        },
    },
    {
        title: '供货价',
        dataIndex: 'retailSupplyPrice',
    },
    {
        title: '销售价',
        dataIndex: 'goodsSalePrice',
    }, 
    {
        title: '可用库存',
        dataIndex: 'stockNum',
    },
  ];
  const columns3= [
    {
      title: '审核时间',
      dataIndex: 'createTime',
      valueType: 'text',
    },
    {
      title: '审核人员',
      dataIndex: 'adminName',
      valueType: 'text',
    },
    {
        title: '审核结果',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          3: '审核驳回',
          4: '审核通过',
        },
    },
    {
        title: '意见审核',
        dataIndex: 'content',
        valueType: 'text'
    },
  ];
 
  useEffect(()=>{
    setLoading(true);
    couponVerifyDetail({id}).then(res=>{
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
         <h1>优惠券审核详情</h1>
         <Button style={{marginTop:'-40px',float:'right'}} type="default" onClick={()=>history.goBack()}>返回</Button>
        <Form
          form={form}
          {...formItemLayout}
          style={{  backgroundColor: '#fff',paddingBottom: 100 }}
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
             {
              detailData.couponType==1?
              '满减券'
              :detailData.couponType==2?
              '折扣券'
              :'立减券'
            }
          </Form.Item>

          <Form.Item
            label="使用门槛"
          >
            {detailData.couponMsg}
          </Form.Item>

          <Form.Item
              label="券面值"
            >
              {detailData.couponAmountDisplay}
            </Form.Item>
            <Form.Item
              label="发行方式"
            >
               {
               detailData.issueType==1?
               '会员领取券'
               :'系统发放券'
              }
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
          </Form.Item>
          <ProTable
              actionRef={ref}
              rowKey="id"
              options={false}
              expandable={{ expandedRowRender: (_) => <SubTable name={_.name}/> }}
              dataSource={[detailData.crowdList]}
              search={false}
              columns={columns}
            />

          <Divider style={{ backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }} orientation="left">使用设置</Divider>

          <Form.Item
            label="使用范围"
          >
            {
              detailData.useType==1?
              '秒约商品'
              :'集约商品'
            }
          </Form.Item>

          <Form.Item
            label="商品范围"
          >
              {
              detailData.goodsType==1?
              '全部商品':
              detailData.goodsType==2?
              '指定商品':
              '指定品类'
            }
          </Form.Item>
          <ProTable
              actionRef={ref}
              rowKey="id"
              options={false}
              dataSource={detailData.spuInfo}
              search={false}
              columns={columns2}
            />
          <Form.Item
            label="可用人群"
          >
             {
              detailData.memberType==1?
              '全部会员':
              '指定用户群体'
            }
          </Form.Item>

          <Form.Item
              label="规则说明"
            >
              {detailData.couponRule}
          </Form.Item> 

          {
            detailData.verifyInfo?.length?
            <>
              <Divider style={{ backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }} orientation="left">审核信息</Divider>
              <ProTable
                  actionRef={ref}
                  rowKey="id"
                  options={false}
                  // params={{
                  // status: 1,
                  // }}
                  // request={couponList}
                  dataSource={detailData.verifyInfo}
                  search={false}
                  columns={columns3}
                />
            </>
            :
            <>
              <AuditModel 
                type={1} 
                status={4}  
                label={'审核通过'}  
                text={'确认审核通过吗？'} 
                InterFace={couponVerify} 
                id={id}
                title={'操作确认'}
                boxref={ref}
              />
              <AuditModel 
                type={2} 
                status={3}  
                label={'驳回'}  
                InterFace={couponVerify} 
                title={'审核驳回'}
                id={id}
                boxref={ref}
              />
            </>
          }
         
        </Form>
      </Spin> 
    
    </>
  );
};