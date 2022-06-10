import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { cancelList } from '@/services/user-management/logout-list'
import moment from 'moment'
import { PageContainer } from '@ant-design/pro-layout';
import Detail from '@/pages/user-management/user-list/detail';


type CancelListItem={
  createTime: any;
  id: number;
  loginTime: any;
  memberId: any;
  phoneNumber: string;
  reason: string;
  regTime: any;
  sourceTypeDesc: string;
  type: number;
  userType: number;
}

export default () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const ref=useRef()
  const columns:ProColumns<CancelListItem>[]= [
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入用户昵称'
      },
      order:3,
      hideInTable: true
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      order:4,
      fieldProps:{
        placeholder:'请输入用户手机号'
      },
      hideInTable: true
    },
    {
      title: '用户手机',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      render:(_,data)=>{
        return <a onClick={()=>{setDetailVisible(true);setSelectItem(data);}}>{_}</a>
      },
      hideInSearch:true
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '注册来源',
      dataIndex: 'sourceTypeDesc',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '社区店主',
      dataIndex: 'userType',
      valueType: 'select',
      hideInTable: true,
      valueEnum:{
        0: "否",
        1: '是'
      },
      order:2
    },
    {
      title: '是否开店',
      dataIndex: 'userType',
      valueType: 'select',
      hideInSearch: true,
      valueEnum:{
        0: "否",
        1: '是'
      }
    },
    {
      title: '注销申请时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'type',
      valueType: 'select',
      hideInTable: true,
      valueEnum:{
        0: "待注销",
        1: '已失效',
        2: '已撤销',
        3: '已注销'
      },
      order:1
    },
    {
      title: '注销申请状态',
      dataIndex: 'type',
      valueType: 'select',
      hideInSearch: true,
      valueEnum:{
        0: "待注销",
        1: '已失效',
        2: '已撤销',
        3: '已注销'
      }
    },
    {
      title: '注销原因',
      dataIndex: 'reason',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '注销时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true
    }
  ];
  return (
    <PageContainer>
        <ProTable<CancelListItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          request={cancelList}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {
        detailVisible &&
        <Detail
          id={selectItem?.memberId}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
  </PageContainer>
  )
}