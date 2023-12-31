import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@/components/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { cancelList } from '@/services/user-management/logout-list'
import { PageContainer } from '@ant-design/pro-layout';
import Detail from '@/pages/user-management/user-list/detail';
import { Image } from 'antd'

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
  const [selectItem, setSelectItem] = useState({});
  const [detailVisible, setDetailVisible] = useState(false);
  const ref=useRef()
  const columns:ProColumns<CancelListItem>[]= [
    {
      title: '用户ID',
      dataIndex: 'memberId',
      order: -1,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入用户昵称'
      },
      order:1,
      hideInTable: true
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <div style={{display:'flex',alignItems:'center'}}>
                <Image src={data?.icon} width={50} height={50}/>
                <p>{_}</p>
               </div>
      }
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      order:2,
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
      title: '上次访问时间',
      dataIndex: 'loginTime',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '注销申请时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '注销原因',
      dataIndex: 'reason',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '注销时间',
      dataIndex: 'finishTime',
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
          params={{
            type:3
          }}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
          }}
          scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
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