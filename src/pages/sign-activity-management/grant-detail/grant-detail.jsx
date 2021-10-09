import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history, connect } from 'umi';
import { queryIssuanceList } from '@/services/sign-activity-management/packet-record-query-issuance-list';



export default () => {
    const ref=useRef()
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
      },
      {
        title: '修改版本',
        dataIndex: 'signInVersion',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '发放方式',
        dataIndex: 'channelName',
        valueType: 'text',
        hideInSearch:true,
        ellipsis:true
      },
      {
        title: '签到时间',
        key: 'dateTimeRange',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange', 
        hideInTable:true  
      },
      {
        title: '签到时间',
        dataIndex: 'createTime',  
        hideInSearch:true
      },
      {
        title: '领取金额',
        dataIndex: 'changeValue',
        hideInSearch:true,
        render: (_,data)=> {
          return <p>￥{_/100}</p>
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
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a onClick={()=>history.push('/sign-activity-management/user-detail?id='+record.memberId)}>查看此用户明细</a>
        ],
      }, 
    ];
      //导出
      const exportExcel = (searchConfig) => {
        queryIssuanceList({...searchConfig.form.getFieldsValue()}).then(res => {
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
              signInVersion:'修改版本',
              channelName:'发放方式',
              createTime:'签到时间',
              changeValue: '领取金额',
              signInDay: '连签天数'
            },
            ...data
          ], {
            header: [
              'phoneNum',
              'userName',
              'signInVersion',
              'channelName',
              'createTime',
              'changeValue',
              'signInDay'
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
          headerTitle="签到红包发放明细"
          options={false}
          request={queryIssuanceList}
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