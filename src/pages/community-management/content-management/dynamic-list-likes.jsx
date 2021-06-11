import React, { useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { listLikes } from '@/services/community-management/dynamic-list-likes';

export default props => {
let id = props.location.query.id
console.log('id',id)
const actionRef = useRef();
const columns= [
  {
      title: '会员ID',
      dataIndex: 'userId',
  },
  {
      title: '会员昵称',
      dataIndex: 'userName',
      valueType: 'text',
  }
];
  return (
      <PageContainer>
          <ProTable
            rowKey="userId"
            options={false}
            params={{
                id
            }}
            request={listLikes}
            actionRef={actionRef}
            search={false}
            toolBarRender={false}
            columns={columns}
          />
    </PageContainer>
  );
};
