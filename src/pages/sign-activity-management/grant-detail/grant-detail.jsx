import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { history, connect } from 'umi';
import { queryIssuanceList } from '@/services/sign-activity-management/packet-record-query-issuance-list';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'



export default () => {
    const ref=useRef()
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
          headerTitle="签到红包发放明细"
          options={false}
          request={queryIssuanceList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
               change={(e) => { setVisit(e) }}
               type={'red-packet-give-detail-export'}
               conditions={getFieldValue(searchConfig)}
             />,
             <ExportHistory show={visit} setShow={setVisit} type={'red-packet-give-detail-export'} />,
            ],
          }}
          columns={columns}
        />
        </PageContainer>
    );
  };