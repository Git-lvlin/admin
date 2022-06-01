import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { consumerOrderPage } from '@/services/hydrogen-atom-management/hydrogen-atom-start-recording'
import moment from 'moment'
import { Button } from 'antd'
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
  const [detailId, setDetailId] = useState(null)
  const [visible, setVisible] = useState(false)
  const isPurchase = useLocation().pathname.includes('purchase')
  const [detailVisible, setDetailVisible] = useState(false);
  const ref=useRef()
  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: '专题名称',
      dataIndex: 'deviceImei',
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
                  <p>https://publicmobile-uat.yeahgo.com/web/exclu...</p>
                  <a onClick={()=>{setDetailVisible(true)}}>复制</a>
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
      dataIndex: 'memberPhone',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      hideInSearch: true,
      valueEnum:{
        "": "未开始",
        false: "进行中",
        true: '已结束'
      },
    },
    {
      title: '注销申请状态',
      dataIndex: 'orderAmount',
      valueType: 'option',
      hideInSearch: true,
      render:(text, record, _, action)=>[
        <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
        <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
    ],
    }
  ];
  return (
    <PageContainer>
        <ProTable<ThematicEventItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          request={consumerOrderPage}
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
        //   id={selectItem?.id}
          visible={visible}
          setVisible={setVisible}
          onClose={()=>{}}
        />
      }
  </PageContainer>
  )
}