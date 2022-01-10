import React, { useEffect, useState,useRef } from 'react'
import { Spin, Empty, Switch,Form } from 'antd'
import { categoryAuditList } from '@/services/intensive-activity-management/platfor-bonus-percentage-audit'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import Journal from './journal';
import styles from './style.less'
import ProTable from '@ant-design/pro-table';
import AuditModel from './audit-model'
import { amountTransform } from '@/utils/utils'


const Category = (props) => {
  const { parentId = 0, onClick = () => { }} = props;
  const [visible, setVisible] = useState(false);
  const [auditVisible, setAuditVisible] = useState(false);
  const [formDetail, setFormDetail] = useState({})
  const [logId, setLogId] = useState({})
  const actionRef=useRef()
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable:true
    },
    {
      title: '分类图片',
      dataIndex: 'gcIcon',
      valueType: 'image',
    },
    {
      title: '分类名称',
      dataIndex: 'gcName',
      render: (_,r) =>{
        if(parentId){
          return <p>{_}</p>
        }else{
          return <p style={{cursor:'pointer'}} onClick={()=>onClick(r.id)}>{_}</p>
        }
      }
    },
    {
      title: '店主额外奖励占总额外奖励比例',
      dataIndex: 'storePercent',
      valueType: 'text',
      render: (_,r) =>{
        return <p>{amountTransform(parseFloat(_), '*')}%</p>
      }
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
      }
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
      }
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
      <div style={{ marginRight: 50 }}>
        <ProTable
          rowKey="id"
          actionRef={actionRef}
          headerTitle={`${parentId?'二':'一'}级分类`}
          maxLength={5}
          columns={columns}
          params={{
            isPercentAudit:2,
            gcParentId:parentId?parentId:0
          }}
          request={categoryAuditList}
          options={false}
          search={false}
          style={{width:'800px',height:'600px',overflowY:'scroll',background:'#fff'}}
          pagination={false}
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
      </div>
  )
}

export default () => {
  const [selectId, setSelectId] = useState(null);
  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <Category onClick={(id) => { setSelectId(id)}}/>
        {selectId && <Category parentId={selectId}/>}
      </div>

    </>
  )
}

