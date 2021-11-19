import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { couponEverydayLogList } from '@/services/activity-management/everyday-red-packet-activity';
import { history, connect } from 'umi';
import { amountTransform } from '@/utils/utils'
import Detail from '@/pages/order-management/normal-order/detail';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'



export default () => {
    const ref=useRef()
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
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/activity-management/everyday-packet-rule?id='+record.couponEverydayId)}>{record.name}</a>
        ]
      },
      {
        title: '活动时间',
        dataIndex: 'activityTimeDisplay',
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
        title: '被邀请用户',
        dataIndex: 'memberMobileName',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '被邀请时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '被邀请时间',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '奖励红包',
        dataIndex: 'freeAmount',
        valueType: 'text',
        hideInSearch:true,
        render: (_)=> amountTransform(parseInt(_), '/').toFixed(2)
      },
      {
        title: '红包码',
        dataIndex: 'memberCouponCode',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '红包状态',
        dataIndex: 'status',
        valueType: 'text',
        valueEnum: {
          0: '全部',
          1: '未使用',
          2: '已使用',
          3: '已冻结',
          4: '已失效'
          },
        hideInSearch:true,
      },
      // {
      //   title: '红包使用时间',
      //   key: 'dateTimeRange2',
      //   dataIndex: 'actTime',
      //   valueType: 'dateTimeRange',
      //   hideInTable: true,
      //   hideInSearch:true,
      // },
      {
        title: '红包使用时间',
        dataIndex: 'actTime',  
        hideInSearch:true
      },
      {
        title: '使用订单',
        dataIndex: 'orderGoods',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <>
                  {
                    data.orderGoods.map(ele=>(
                      <div style={{display:'flex',alignItems:'center'}}>
                      <Image src={ele.imageUrl} alt="" width='80px' height='80px' />
                      <div style={{marginLeft:'10px'}}>
                        <h5>{ele.goodsName}</h5>
                        <span style={{color:'red',fontSize:'10px'}}>销售价¥{ele.salePrice/100}</span>
                        <p style={{fontSize:'12px'}}>SKU  {ele.skuId}</p>
                        <p style={{fontSize:'12px'}}>订单号:<a onClick={() => {  setDetailVisible(true);setOrderId(ele?.subOrderId) }}>{ele.orderSn}</a></p>
                      </div>
                   </div>
                    ))
                  }
                 </>
        },
      }
    ];
    const getFieldValue = (searchConfig) => {
      const {dateTimeRange,dateTimeRange2,...rest}=searchConfig.form.getFieldsValue()
      return {
        lqStartTime1:dateTimeRange&&dateTimeRange[0],
        lqStartTime2:dateTimeRange&&dateTimeRange[1],
        useStartTime1:dateTimeRange2&&dateTimeRange2[0],
        useStartTime2:dateTimeRange2&&dateTimeRange2[1],
        ...rest,
      }
    }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle='活动数据明细'
          options={false}
          request={couponEverydayLogList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                change={(e) => { setVisit(e) }}
                type={'day-red-detail-export'}
                conditions={getFieldValue(searchConfig)}
              />,
              <ExportHistory show={visit} setShow={setVisit} type='day-red-detail-export'/>,
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