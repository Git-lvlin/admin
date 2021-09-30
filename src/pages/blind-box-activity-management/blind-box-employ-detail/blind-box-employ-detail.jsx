import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { auditDynamic } from '@/services/community-management/dynamic-audit-dynamic';
import { checkAuditDynamicSwitch,updateAuditDynamicSwitch } from '@/services/community-management/dynamic-audit-switch';
import { history,connect } from 'umi';
import { getBlindboxUseDetail } from '@/services/blind-box-activity-management/blindbox-get-use-list';
import AuditModel from './audit-model'
const { TabPane } = Tabs


export default (props) => {
    let id = props.location.query.id
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
        title: '时间',
        key: 'dateRange',
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
        valueType: 'text',
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
        valueType: 'text'
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
    ];
    const postData=(data)=>{
      console.log('data',data)
      setDetailList(data)
      return data.records
    }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle={`用户手机号:${detailList?.memberMobile}         用户名：${detailList?.memberNicheng}         剩余开盒次数：${detailList?.restNum}        已使用次数：${detailList?.useNum}`}
          options={false}
          request={getBlindboxUseDetail}
          postData={postData}
          params={{
            id:id
          }}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
            ],
          }}
          columns={columns}
        />
      </PageContainer>
    );
  };
