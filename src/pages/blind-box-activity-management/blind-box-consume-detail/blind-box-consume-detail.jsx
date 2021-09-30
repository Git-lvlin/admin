import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getBlindboxUseList } from '@/services/blind-box-activity-management/blindbox-get-use-list';
import { history, connect } from 'umi';
const { TabPane } = Tabs



export default () => {
    const ref=useRef()
    const [detailList,setDetailList]=useState()
    const columns= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '活动时间',
        key: 'dateRange',
        dataIndex: 'activityStartTime',
        valueType: 'dateRange',
        hideInTable: true,
      },
      {
        title: '活动时间',
        dataIndex: 'activityStartTime',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{data.activityStartTime} 至 {data.activityEndTime}</p>
        }
      },
      {
        title: '用户手机号',
        dataIndex: 'memberMobile',
        valueType: 'text',
      },
      {
        title: '用户名',
        dataIndex: 'memberNicheng',
        valueType: 'text',
      },
      {
        title: '使用时间',
        key: 'dateRange2',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        hideInTable: true,
      },
      {
        title: '使用时间',
        dataIndex: 'createTime',  
        hideInSearch:true
      },
      {
        title: '使用次数',
        dataIndex: 'num',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '使用类型',
        dataIndex: 'type',
        valueType: 'select',
        hideInSearch:true,
        valueEnum: {
          4: '开盲盒',
          5: '机会过期',
          6: '官方回收'
        },
      },
      {
        title: '机会编号',
        dataIndex: 'code',
        valueType: 'text',
        ellipsis:true
      },
      {
        title: '筛选',
        dataIndex: 'expenditureType',
        valueType: 'select',
        valueEnum: {
          0: '全部',
          1: '获奖已兑换',
          2: '获奖未兑换',
          3: '已获奖',
          4: '未获奖',
          5: '机会过期',
          6: '官方回收'
        },
        hideInTable:true
      },
      {
        title: '获得奖品',
        dataIndex: 'prizeInfo',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <div style={{display:'flex',alignItems:'center'}}>
                    <Image src={data.prizeInfo.imageUrl} alt="" width='50px' height='50px' />
                    <div>
                      <h4>{data.prizeInfo.goodsName}</h4>
                      <span style={{color:'red',fontSize:'10px'}}>销售价¥{data.prizeInfo.salePrice}</span>
                      <p>SKU  {data.prizeInfo.skuId}</p>
                    </div>
                 </div>
        },
      },
      {
        title: '兑换详情',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <>
            <p>
              {
              data.orderInfo.orderStatus==0?
              '未兑换'
              :data.orderInfo.orderStatus==1?
              '兑换中'
              :data.orderInfo.orderStatus==2?
              '已兑换'
              :'已失效'
              }
            </p>
            <p>订单号：</p>
            <a onClick={()=>{}}>{data.orderInfo.orderSn}</a>
            <p>
              {
                data.orderInfo.orderStatus==0||data.orderInfo.orderStatus==3?
                <p>过期时间：{data.orderInfo.expireTime}</p>
                :null
              }
            </p>
          </>
        } 
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/blind-box-activity-management/blind-box-employ-detail?id='+record.id)}>查看此用户明细</a>
        ],
      }, 
    ];
    const postData=(data)=>{
      console.log('data',data)
      setDetailList(data)
      return data.records
    }
    return (
      <PageContainer>
         <div style={{backgroundColor:'#fff',marginBottom:'20px'}}>
         <Descriptions labelStyle={{fontWeight:'bold'}} column={7} layout="vertical" bordered>
            <Descriptions.Item  label="参与总人数">{detailList?.totalMemberNum}  </Descriptions.Item>
            <Descriptions.Item  label="已发放次数">{detailList?.totalNum}  </Descriptions.Item>
            <Descriptions.Item  label="未使用次数">{detailList?.restNum}  </Descriptions.Item>
            <Descriptions.Item  label="已使用次数">{detailList?.useNum}  </Descriptions.Item>
            <Descriptions.Item  label="已过期">{detailList?.reclaimNum}  </Descriptions.Item>
            <Descriptions.Item  label="已兑奖数">{detailList?.prizeNum}  </Descriptions.Item>
            <Descriptions.Item  label="未兑奖数">{detailList?.noPrizeNum}  </Descriptions.Item>
        </Descriptions>
         </div>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle={`使用明细     剩余开盒总次数：${detailList?.restNum}        已开盒总次数：${detailList?.useNum}`}
          options={false}
          request={getBlindboxUseList}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Button onClick={()=>{}} key="out">
                导出数据
               </Button>
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };