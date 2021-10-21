
import React, { useRef, useState } from 'react';
import { Button, Space, message,Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import { findAdminDebunkList } from '@/services/business-school/find-admin-debunk-list';


export default (props) => {
  let articleId = props.location.query.articleId
  const actionRef = useRef();
  const columns = [
    {
      title: '编号',
      dataIndex: 'articleId',
      valueType: 'text',
    },
    {
      title: '吐槽时间',
      key: 'dateTimeRange',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange', 
      hideInTable:true  
    },
    {
      title: '店主手机号',
      dataIndex: 'phoneNum',
      valueType: 'text',
      render:(text, record, _, action)=>[
        <a onClick={()=>history.push(`/user-management/user-detail/${record.memberId}`)}>{record.phoneNum}</a>
      ],
    },
    {
      title: '吐槽图片',
      dataIndex: 'pictures',
      valueType: 'image',
      search: false,
      render:(_,data)=>{
        return <Image width={80} src={data.pictures.split(';')[0]}/>
      }
    },
    {
      title: '吐槽内容',
      dataIndex: 'content',
      valueType: 'number',
      search: false,
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'text',
      search: false,
    }
  ];

  return (
    <PageContainer>
        <ProTable
            rowKey="id"
            options={false}
            columns={columns}
            actionRef={actionRef}
            params={{
              articleId:articleId
            }}
            request={findAdminDebunkList}
            search={{
                labelWidth: 'auto',
            }}
            pagination={false}
            dateFormatter="string"
            headerTitle=""
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                ],
            }}
        />
    </PageContainer>
  );
};