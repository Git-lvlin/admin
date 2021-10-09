import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions} from 'antd';
import ProTable from '@ant-design/pro-table';
import { history, connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { queryConsumeList,getConsumeData } from '@/services/sign-activity-management/packet-record-query-consume-list';
import Export from '@/components/export-excel/export'
import ExportHistory from '@/components/export-excel/export-history'



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
        title: '用户手机号',
        dataIndex: 'phoneNum',
        valueType: 'text',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '使用时间',
        key: 'dateTimeRange',
        dataIndex: 'usedTime',
        valueType: 'dateTimeRange', 
        hideInTable:true  
      },
      {
        title: '使用时间',
        dataIndex: 'usedTime',  
        hideInSearch:true
      },
      {
        title: '使用金额',
        dataIndex: 'usedAmount',
        valueType: 'text',
        hideInSearch:true,
        render: (_,data)=> {
          return <p>￥{_/100}</p>
        }
      },
      {
        title: '订单号',
        dataIndex: 'orderId',
        valueType: 'text',
        hideInTable:true 
      },
      {
        title: '订单',
        dataIndex: 'goodsInfo',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <div style={{display:'flex',alignItems:'center'}}>
                    <Image src={data.goodsInfo?.goodsImageUrl} alt="" width='80px' height='50px' />
                    <div>
                      <h5>{data.goodsInfo?.goodsName}</h5>
                      <span style={{color:'red',fontSize:'10px'}}>¥{data.goodsInfo?.salePrice}</span>
                      <p style={{fontSize:'10px'}}>SKU  {data.goodsInfo?.skuId}</p>
                      <p style={{fontSize:'10px'}}>订单号：{data.goodsInfo?.orderId}</p>
                    </div>
                 </div>
        },
      },
      {
        title: '类型',
        dataIndex: 'channelName',
        hideInSearch:true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/sign-activity-management/user-detail?id='+record.memberId)}>查看此用户明细</a>
        ],
      }, 
    ];
    useEffect(()=>{
      getConsumeData({}).then(res=>{
        setDetailList(res.data)
      })
    },[])
      //导出
      const exportExcel = (searchConfig) => {
        queryConsumeList({...searchConfig.form.getFieldsValue()}).then(res => {
          const data = res?.data.map(item => {
            const { ...rest } = item;
            return {
              ...rest
            }
          });
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet([
            {
              phoneNum: '用户手机号',
              userName: '用户名',
              usedTime:'使用时间',
              usedAmount: '使用金额',
              goodsInfo: '订单',
              channelName: '类型'
            },
            ...data
          ], {
            header: [
              'phoneNum',
              'userName',
              'usedTime',
              'usedAmount',
              'goodsInfo',
              'channelName'
            ],
            skipHeader: true
          });
          XLSX.utils.book_append_sheet(wb, ws, "file");
          XLSX.writeFile(wb, `${+new Date()}.xlsx`)
      })
    }
    return (
      <PageContainer>
         <div style={{backgroundColor:'#fff',marginBottom:'20px'}}>
         <Descriptions labelStyle={{fontWeight:'bold'}} column={7} layout="vertical" bordered>
            <Descriptions.Item  label="签到总人数">{detailList?.signInMembers}</Descriptions.Item>
            <Descriptions.Item  label="已领取金额">{detailList?.receivedAmount}</Descriptions.Item>
            <Descriptions.Item  label="已使用金额">{detailList?.usedAmount}</Descriptions.Item>
            <Descriptions.Item  label="已过期金额">{detailList?.expireAmount}</Descriptions.Item>
            <Descriptions.Item  label="连签3日人数">{detailList?.signThreeNum}</Descriptions.Item>
            <Descriptions.Item  label="连签7日人数">{detailList?.signSevenNum}</Descriptions.Item>
            <Descriptions.Item  label="连签15日人数">{detailList?.signFifteenNum}</Descriptions.Item>
        </Descriptions>
         </div>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="签到红包消耗明细"
          options={false}
          request={queryConsumeList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
               change={(e) => { setVisit(e) }}
               type={'community-store-list-export'}
               conditions={getFieldValue(searchConfig)}
             />,
             <ExportHistory show={visit} setShow={setVisit} type={'community-store-list-export'} />,
              //  <Button onClick={()=>{exportExcel(searchConfig)}} key="out">
              //   导出数据
              //  </Button>
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };