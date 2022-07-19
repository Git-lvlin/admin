import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getActiveConfigList } from '@/services/cms/member/thematic-event-management'
import moment from 'moment'
import { Button,message } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import SpecialModel from './special-model'
import EndModel from './end-model'
import styles from './style.less'
import PreviewModel from './preview-model'


type ThematicEventItem={
  id: number;
  type: number;
  status: number;
  name: string;
  startTime: number;
  endTime: number;
  updateTime: number;
  statusDisplay: string;
  actionType: number;
  goodsCount: number;
  copyUrl: string;
}

export default () => {
  const [detailId, setDetailId] = useState<string | {}>()
  const [visible, setVisible] = useState<boolean>(false)
  const [endVisible, setEndVisible] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [total, setTotal]= useState<number>()
  const [copy, setCopy] = useState<string>(false)
  const ref=useRef()
  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: '专题名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入内容'
      },
      order:5
    },
    {
      title: '链接地址',
      dataIndex: 'copyUrl',
      valueType: 'text',
      order:4,
      render:(_)=>{
          return <>
                  <span style={{display:'inline-block',marginRight:'10px'}}>{_}</span>
                  <a onClick={()=>{
                   message.success('复制成功')
                   navigator.clipboard.writeText(_)
                  }}>复制</a>
                 </>
      },
      hideInSearch: true
    },
    {
      title: '相关单品',
      dataIndex: 'goodsCount',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '活动时间',
      dataIndex: 'startTime',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{moment(data?.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data?.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      valueEnum:{
        0: '全部',
        1: '未开始',
        2: '进行中',
        3: '已结束'
      }
    },
    {
      title: '状态',
      dataIndex: 'statusDisplay',
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'orderAmount',
      valueType: 'option',
      hideInSearch: true,
      render:(text, record, _, action)=>[
        <a key='preview' onClick={()=>{setPreviewVisible(true);setDetailId(record)}}>预览</a>,
        <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
        <a key='detele' onClick={()=>{setEndVisible(true);setDetailId(record.id)}}>{record?.status?'终止':null}</a>,
        <a key='copy' onClick={()=>{setVisible(true);setDetailId(record.id);setCopy('copy')}}>复制</a>
    ],
    }
  ];
  return (
    <PageContainer>
        <ProTable<ThematicEventItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          request={getActiveConfigList}
          params={{
            actCode:"subJectActiveCode"
          }}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button key='add' style={{color:'red',border:'1px solid red'}} onClick={()=>{setVisible(true)}}>新建专题</Button>
          ],
          }}
          postData={(data)=>{
            setTotal(data?.total)
            return data?.records
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          tableRender={(_, dom) => (
            <>
            {dom}
            <p className={styles?.summary}>当前条件共检索到 <span>{total}</span> 条相关信息</p>
            </>
          )}
          className={styles?.thematic_event_management}
        />
        {
          visible &&
          <SpecialModel
            id={detailId}
            copy={copy}
            visible={visible}
            setVisible={setVisible}
            onClose={()=>{setDetailId(null);ref?.current?.reload()}}
            callback={()=>{setDetailId(null);ref?.current?.reload()}}
          />
        }
        {
          endVisible&&<EndModel 
          visible={endVisible} 
          setVisible={setEndVisible}  
          endId={detailId}
          onClose={()=>{setDetailId(null);ref?.current?.reload()}}
          callback={()=>{setDetailId(null);ref?.current?.reload()}}
          />
        }
        {
          previewVisible&&<PreviewModel 
          visible={previewVisible} 
          setVisible={setPreviewVisible}  
          link={detailId?.copyUrl}
          onClose={()=>{setDetailId(null);ref?.current?.reload()}}
          callback={()=>{setDetailId(null);ref?.current?.reload()}}
          />
        }
  </PageContainer>
  )
}