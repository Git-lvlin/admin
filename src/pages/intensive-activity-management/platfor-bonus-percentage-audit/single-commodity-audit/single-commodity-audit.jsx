
import React, { useRef, useState } from 'react';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history,connect } from 'umi';
import { skuAuditList } from '@/services/intensive-activity-management/platfor-bonus-percentage-audit';
import AuditModel from './audit-model'
import Journal from './journal';
import { amountTransform } from '@/utils/utils'

export default () => {
  const [visible, setVisible] = useState(false);
  const [auditVisible, setAuditVisible] = useState(false);
  const [formDetail, setFormDetail] = useState({})
  const [logId, setLogId] = useState({})
  const actionRef=useRef()

  const columns = [
    {
      title: '活动商品',
      dataIndex: 'goodsName',
      valueType: 'text',
      render: (_,r) =>{
        return <>
                 <p>{_}</p>
                 <p>spuId：{r.spuId}</p>
                 <p>skuId：{r.skuId}</p>
               </>
      },
      align: 'center'
    },
    {
      title: '集约活动',
      dataIndex: 'wsName',
      valueType: 'text',
      render: (_,r) =>{
        return <>
                 <p>{_}</p>
                 <p>活动ID：{r.wsId}</p>
               </>
      },
      align: 'center'
    },
    {
      title: '店主额外奖励占总额外奖励比例',
      dataIndex: 'storePercent',
      valueType: 'text',
      render: (_,r) =>{
        return <p>{amountTransform(parseFloat(_), '*')}%</p>
      },
      align: 'center'
    },
    {
      title: '额外奖励说明',
      dataIndex: 'percentAuditStatusDesc',
      valueType: 'text',
      render:(_,r)=>{
        return <>
                <p>店主：{amountTransform(parseFloat(r?.storePercent), '*')}%</p>
                <p>运营中心：{amountTransform(parseFloat(r?.operationPercent), '*')}%</p>
               </>
      },
      align: 'center'
    },
    {
      title: '更新状态',
      dataIndex: 'percentAuditStatus',
      valueType: 'select',
      render: (_,r) =>{
        return <>
                <p>{r?.percentAuditStatus==0&&'未修改'}</p>
                <p>{r?.percentAuditStatus==1&&'审核通过'}</p>
                <p>{r?.percentAuditStatus==2&&`审核拒绝（${r?.rejectionReason}）`}</p>
                <p>{r?.percentAuditStatus==3&&`待审核(店主占${amountTransform(parseFloat(r?.storeAuditPercent), '*')}%)}`}</p>
               </>
      },
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <div key="audit">
          {
             record?.percentAuditStatus==3&&<a
             key="editable"
             onClick={() => {
              setAuditVisible(true)
              setFormDetail(record)
             }}
           >
             审核
           </a>
          }
        </div>,
        <a key='log' onClick={()=>{
          setLogId(record.id)
          setVisible(true)
        }}>日志</a>
      ],
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        columns={columns}
        actionRef={actionRef}
        request={skuAuditList}
        dateFormatter="string"
        search={false}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
      }}
      />
      {visible && <Journal
        visible={visible}
        setVisible={setVisible}
        logId={logId}
        onClose={()=>{actionRef.current.reload();setLogId(null)}}
      />}
      {auditVisible && <AuditModel
        visible={auditVisible}
        setVisible={setAuditVisible}
        formDetail={formDetail}
        onClose={()=>{actionRef.current.reload();setFormDetail(null)}}
        callback={()=>{actionRef.current.reload();setFormDetail(null)}}
      />}
    </>
  );
};