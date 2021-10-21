import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getBlindboxUseList } from '@/services/blind-box-activity-management/blindbox-get-use-list';
import { history, connect } from 'umi';
import Detail from '@/pages/order-management/normal-order/detail';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'



export default () => {
    const ref=useRef()
    const [detailList,setDetailList]=useState()
    const [detailVisible, setDetailVisible] = useState(false);
    const [orderId,setOrderId]=useState()
    const [visit, setVisit] = useState(false)
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
        dataIndex: 'activityStartTime',
        valueType: 'text',
        hideInSearch:true,
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
        hideInSearch:true,
      },
      {
        title: '领取时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '领取时间',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '面值',
        dataIndex: 'memberNicheng',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '使用时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '使用时间',
        dataIndex: 'createTime',  
        hideInSearch:true
      },
      {
        title: '红包码',
        dataIndex: 'num',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '红包状态',
        dataIndex: 'type',
        valueType: 'text',
        valueEnum: {
            0: '全部',
            1: '已使用',
            2: '未使用',
          },
      },
      {
        title: '来源订单',
        dataIndex: 'orderInfo',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
            return <>
                    <p>订单号：</p>
                    <p></p>
                    </>
        } 
      },
      {
        title: '订单号',
        dataIndex: 'num',
        valueType: 'text',
        hideInTable: true
      },
      {
        title: '使用订单',
        dataIndex: 'prizeInfo',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          if(data.type==5||data.type==6){
            return null
          }
          if(data.prizeInfo?.prizeStatus==0){
            return <p>未抽中</p>
          }
          return <div style={{display:'flex'}}>
                    <Image src={data.prizeInfo.imageUrl} alt="" width='50px' height='50px' />
                    <div style={{marginLeft:'10px'}}>
                      <h5>{data.prizeInfo.goodsName}</h5>
                      <span style={{color:'red',fontSize:'10px'}}>销售价¥{data.prizeInfo.salePrice/100}</span>
                      <p style={{fontSize:'12px'}}>SKU  {data.prizeInfo.skuId}</p>
                      <p style={{fontSize:'12px'}}>订单号:</p>
                    </div>
                 </div>
        },
      }
    ];
    const postData=(data)=>{
      setDetailList(data)
      return data.records
    }
    const getFieldValue = (searchConfig) => {
      return {
        ...searchConfig.form.getFieldsValue(),
      }
    }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle='每日红包明细'
          options={false}
          request={getBlindboxUseList}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                change={(e) => { setVisit(e) }}
                // type={'bind-box-use-detail-export'}
                conditions={getFieldValue(searchConfig)}
              />,
              <ExportHistory show={visit} setShow={setVisit}/>,
            ],
          }}
          columns={columns}
        />
        {
          detailVisible && <Detail
          id={orderId}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
        }
        </PageContainer>
    );
  };