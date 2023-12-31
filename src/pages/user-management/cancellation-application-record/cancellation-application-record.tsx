import { useState, useRef } from 'react'
import ProTable from '@/components/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { cancelList } from '@/services/user-management/logout-list'
import { PageContainer } from '@ant-design/pro-layout';
import Detail from '@/pages/user-management/user-list/detail';
import { Image, Space } from 'antd'
import WriteModal from './write-modal';
import WriteDetail from './write-detail';
import type { TableProps } from './data';

export default () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [writeVisible, setWriteVisible] = useState(false);
  const [writeDetailVisible, setWriteDetailVisible] = useState(false);
  const [msgDetail, setMsgDetail] = useState<TableProps>();
  const ref=useRef<ActionType>()
  const columns:ProColumns[]= [
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
      order:3,
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
        return <a onClick={()=>{setDetailVisible(true);setMsgDetail(data);}}>{_}</a>
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
      dataIndex: 'finishTime',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_,data) => (
        <Space>
        {data?.type == 0&&<a key='write' onClick={()=>{setWriteVisible(true);setMsgDetail(data);}}>确认注销</a>}
        {data?.type == 3&&<a key='detail' onClick={()=>{setWriteDetailVisible(true);setMsgDetail(data);}}>注销明细</a>}
        </Space>
      )
    }
  ];
  return (
    <PageContainer>
        <ProTable
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
          scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        />
      {
        detailVisible &&
        <Detail
          id={msgDetail?.memberId}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {
        writeVisible &&
        <WriteModal
          msgDetail={msgDetail}
          visible={writeVisible}
          setVisible={setWriteVisible}
          callback={()=>{ref?.current?.reload()}}
        />
      }
      {
        writeDetailVisible &&
        <WriteDetail
          msgDetail={msgDetail}
          visible={writeDetailVisible}
          setVisible={setWriteDetailVisible}
        />
      }
  </PageContainer>
  )
}