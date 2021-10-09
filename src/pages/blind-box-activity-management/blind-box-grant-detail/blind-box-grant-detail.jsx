import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { getBlindboxIncomeList } from '@/services/blind-box-activity-management/blindbox-blindbox-get-lncome';
import { PageContainer } from '@ant-design/pro-layout';
import XLSX from 'xlsx'
import { history,connect } from 'umi';
const { TabPane } = Tabs



export default () => {
    const ref=useRef()
    //导出
    const exportExcel = (searchConfig) => {
      getBlindboxIncomeList({...searchConfig.form.getFieldsValue()}).then(res => {
          const data = res.data.map(item => {
            const { ...rest } = item;
            return {
              ...rest
            }
          });
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet([
            {
              name: '活动名称',
              activityStartTime: '活动时间',
              memberMobile:'用户手机号',
              memberNicheng:'用户名',
              type:'发放原因',
              usefulTime: '发放时间',
              outUsefulTime:'过期时间',
              num: '发放次数',
              code:'机会编号',
            },
            ...data
          ], {
            header: [
              'name',
              'activityStartTime',
              'couponAmountDisplay',
              'memberNicheng',
              'usefulTime',
              'outUsefulTime',
              'num',
              'type',
              'code',
            ],
            skipHeader: true
          });
          XLSX.utils.book_append_sheet(wb, ws, "file");
          XLSX.writeFile(wb, `${+new Date()}.xlsx`)
      })
    }
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
        title: '发放原因',
        dataIndex: 'type',
        valueType: 'text',
        valueEnum: {
          1:'连续签到',
          2:'邀请好友', 
          3:'订单消费'
        },
      },
      {
        title: '发放时间',
        key: 'dateTimeRange',
        dataIndex: 'usefulTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '发放时间',
        dataIndex: 'usefulTime',
        valueType: 'text',
        hideInSearch:true   
      },
      {
        title: '过期时间',
        dataIndex: 'outUsefulTime',
        hideInSearch:true
      },
      {
        title: '发放次数',
        dataIndex: 'num',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '机会编号',
        dataIndex: 'code',
        valueType: 'text',
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/blind-box-activity-management/blind-box-user-detail?id='+record.id)}>查看此用户明细</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          headerTitle="签到红包发放明细"
          options={false}
          request={getBlindboxIncomeList}
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
        </PageContainer>
    );
  };