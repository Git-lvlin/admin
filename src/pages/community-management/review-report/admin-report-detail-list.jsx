import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminReportDetailList } from '@/services/community-management/report-admin-report-detail-list';

export default props => {
let id = props.location.query.id
console.log('id',id)
const actionRef = useRef();
const columns= [
  {
      title: '评论ID',
      dataIndex: 'userId',
  },
  {
      title: '举报人昵称',
      dataIndex: 'userName',
      valueType: 'text',
  },
  {
      title: '举报类型',
      dataIndex: 'type',
      valueType: 'text',
  },
  {
      title: '举报时间',
      dataIndex: 'createTime',
      valueType: 'text',
  },
  {
      title: '举报原因',
      dataIndex: 'reason',
      valueType: 'text',
  },
  {
      title: '证明截图',
      dataIndex: 'images',
      valueType: 'text',
  }
];
  return (
      <PageContainer>
          <ProTable
            rowKey="userId"
            options={false}
            params={{
              page:1,
              size:5,
              sourceId:id,
              status:1,
            }}
            request={adminReportDetailList}
            actionRef={actionRef}
            search={false}
            toolBarRender={false}
            columns={columns}
          />
    </PageContainer>
  );
};
