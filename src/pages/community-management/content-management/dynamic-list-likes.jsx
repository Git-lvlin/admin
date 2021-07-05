import React, { useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from 'umi';
import { listLikes } from '@/services/community-management/dynamic-list-likes';

export default props => {
let id = props.location.query.id
console.log('id',id)
const actionRef = useRef();
const columns= [
  {
      title: '会员ID',
      dataIndex: 'userId',
      valueType: 'text',
  },
  {
      title: '会员昵称',
      dataIndex: 'userName',
      valueType: 'text',
  }
];
  return (
    <>
      <h1>点赞列表</h1>
      <ProTable
        rowKey="userId"z
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
       <Button style={{margin:"20px 0 20px 0"}} type="default" onClick={()=>history.goBack()}>
            返回
        </Button>
    </>
  );
};
