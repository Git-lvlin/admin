import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { amountTransform } from '@/utils/utils'
import { history, connect } from 'umi';
import XLSX from 'xlsx'
import { queryUserRecordList } from '@/services/sign-activity-management/packet-record-query-user-record-list';



export default (props) => {
    const ref=useRef()
    let id = props.location.query.id
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
        title: '红包名称',
        dataIndex: 'channelName',
        valueType: 'text',
      },
      {
        title: '时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange', 
        hideInTable:true  
      },
      {
        title: '时间',
        dataIndex: 'createTime',  
        hideInSearch:true
      },
      {
        title: '明细类型',
        dataIndex: 'recordType',
        valueType: 'select',
        valueEnum: {
          1: '获得',
          2: '使用',
        },
        hideInSearch: true,
      },
      {
        title: '金额',
        dataIndex: 'redPacketAmount',
        valueType: 'text',
        hideInSearch:true,
        render: (_,data)=> {
          if(data.recordType==1){
            return <p style={{color:'red',fontWeight:'bold'}}>+￥{_/100}</p>
          }else{
            return <p style={{color:'red',fontWeight:'bold'}}>-￥{_/100}</p>
          }

        }
      },
      {
        title: '连签天数',
        dataIndex: 'signInDay',
        valueType: 'text',
        hideInSearch:true,
        render: (_,data)=> {
          return <p>第{_}天</p>
        }
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
                      <h4>{data.goodsInfo?.goodsName}</h4>
                      <span style={{color:'red',fontSize:'10px'}}>¥{data.goodsInfo?.salePrice}</span>
                      <p style={{fontSize:'10px'}}>SKU  {data.goodsInfo?.skuId}</p>
                      <p style={{fontSize:'10px'}}>订单号：{data.goodsInfo?.orderId}</p>
                    </div>
                 </div>
        },
      }
    ];
    const postData=(data)=>{
      console.log('data',data)
      setDetailList(data)
      return data.recordList
    }
    //导出
    const exportExcel = (searchConfig) => {
      queryUserRecordList({...searchConfig.form.getFieldsValue()}).then(res => {
        const data = res.data?.recordList.map(item => {
          const { ...rest } = item;
          return {
            ...rest
          }
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
          {
            channelName: '红包名称',
            createTime: '时间',
            recordType:'明细类型',
            redPacketAmount:'金额',
            signInDay:'连签天数',
            goodsInfo: '订单',
          },
          ...data
        ], {
          header: [
            'channelName',
            'createTime',
            'recordType',
            'redPacketAmount',
            'signInDay',
            'goodsInfo',
          ],
          skipHeader: true
        });
        XLSX.utils.book_append_sheet(wb, ws, "file");
        XLSX.writeFile(wb, `${+new Date()}.xlsx`)
    })
  }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle={`用户手机号：${detailList?.phoneNum}    用户名：${detailList?.userName}         签到总天数：${detailList?.signInDays}        签到红包余额：￥${detailList?.userAmount}`}
          options={false}
          request={queryUserRecordList}
          params={{
            memberId:id
          }}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Button onClick={()=>{exportExcel(searchConfig)}} key="out">
                导出数据
               </Button>
            ],
          }}
          columns={columns}
        />
        <Button style={{float:'right',margin:'20px 20px 0 0'}} type="default" onClick={() => history.goBack()}>
           返回
        </Button>
        </PageContainer>
    );
  };