import React, { useRef, useState } from 'react';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { pageForAdmin,cancelReasonUpdate,getCancelMessage} from '@/services/setting/cancel-reason';
import { PageContainer } from '@/components/PageContainer';
import CancelModel from './cancel-model'
import StopModel from './stop-model'
import { useEffect } from 'react';

const CancelReason=(props)=> {
  const { storeType }=props
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [formDetail , setFormDetail ] = useState()
  const [stopVisible,setStopVisible]=useState(false)

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '注销原因',
      dataIndex: storeType == '1'?'message':'reason',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return storeType == '1'?{1:'已启用',0:'已禁用'}[_]:{1:'已启用',2:'已禁用'}[_.code]
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => [
        <a
        key="edit"
        onClick={() => {
          setVisible(true)
          setFormDetail(record)
        }}
      >
        编辑
      </a>,
        <a 
        key='stop'
        onClick={()=>{
          setStopVisible(true)
          setFormDetail(record)
        }}>
          {storeType == '1'?record?.status==1?'禁用':'启用':record?.status?.code==1?'禁用':'启用'}
        </a>
      ]
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        columns={columns}
        actionRef={actionRef}
        request={ storeType == '1'?getCancelMessage:pageForAdmin}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary"  onClick={()=>setVisible(true)} key="add">
              添加
            </Button>
            ],
          }}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
      {visible && <CancelModel
        visible={visible}
        setVisible={setVisible}
        formDetail={formDetail}
        storeType={storeType}
        callback={()=>{ actionRef.current.reload(); setFormDetail(null)}}
        onClose={() => { actionRef.current.reload(); setFormDetail(null) }}
      />}
      {stopVisible && <StopModel
        visible={stopVisible}
        setVisible={setStopVisible}
        formDetail={formDetail}
        storeType={storeType}
        callback={()=>{ actionRef.current.reload(); setFormDetail(null)}}
        onClose={() => { actionRef.current.reload(); setFormDetail(null) }}
      />}
    </>
  );
};


export default () => {
  const [activeKey, setActiveKey] = useState('2')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key='2' tab="社区店注销原因">
          {
            activeKey == '2' && <CancelReason storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key='1' tab="用户注销原因">
          {
            activeKey == '1' && <CancelReason storeType={activeKey} />
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}