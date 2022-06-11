import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getActiveConfigList } from '@/services/cms/member/thematic-event-management'
import moment from 'moment'
import { Button,message } from 'antd'
import { amountTransform } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import { useLocation } from 'umi';
import SpecialModel from './special-model'


type ThematicEventItem={
    deviceImei: string;
    id: string;
    occupantId: string;
    orderAmount: string;
    orderSn: string;
    payType: string;
    deviceUseTime: number;
    createTime: string;
    payTypeStr: string;
    storeNo: string;
    storeName: string;
    memberPhone: string;
    occupationMode: number;
    isShopkeeper: boolean;
    occupationModeStr: string;
}

export default () => {
  const [detailId, setDetailId] = useState<string>()
  const [visible, setVisible] = useState(false)
  const isPurchase = useLocation().pathname.includes('purchase')
  const [detailVisible, setDetailVisible] = useState(false);
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
      dataIndex: 'occupationMode',
      valueType: 'text',
      order:4,
      render:(_)=>{
          return <>
                  <span style={{display:'inline-block',marginRight:'10px'}}>https://publicmobile-uat.yeahgo.com/web/exclu...</span>
                  <a onClick={()=>{
                   message.success('复制成功')
                   navigator.clipboard.writeText('https://publicmobile-uat.yeahgo.com/web/exclu...')
                  }}>复制</a>
                 </>
      },
      hideInSearch: true
    },
    {
      title: '相关单品',
      dataIndex: 'occupationMode',
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
        <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
        <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>终止</a>
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
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button style={{color:'red',border:'1px solid red'}} onClick={()=>{setVisible(true)}}>新建专题</Button>
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {
        visible &&
        <SpecialModel
          id={detailId}
          visible={visible}
          setVisible={setVisible}
          onClose={()=>{setDetailId(null);ref?.current?.reload()}}
          callback={()=>{setDetailId(null);ref?.current?.reload()}}
        />
      }
  </PageContainer>
  )
}