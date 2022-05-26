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
      title: 'spuid',
      dataIndex: 'deviceImei',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入内容'
      },
      hideInSearch: true,
    },
    {
      title: '商品图片',
      dataIndex: 'occupationMode',
      valueType: 'text',
      order:4,
      render:(_)=>{
          return <a onClick={()=>{setDetailVisible(true)}}>{_}</a>
      },
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'occupationMode',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '市场价',
      dataIndex: 'memberPhone',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '销售价',
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
      title: '商品状态',
      dataIndex: 'orderAmount',
      valueType: 'option',
      hideInSearch: true,
      render:(text, record, _, action)=>[
        <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
        <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
    ],
    },
    {
        title: '平台亏盈',
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
        title: '可用库存',
        dataIndex: 'orderAmount',
        valueType: 'option',
        hideInSearch: true,
        render:(text, record, _, action)=>[
          <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
          <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
      ],
      }, 
      {
        title: '排序',
        dataIndex: 'orderAmount',
        valueType: 'option',
        hideInSearch: true,
        render:(text, record, _, action)=>[
          <a key='edit' onClick={()=>{setVisible(true);setDetailId(record.id)}}>编辑</a>,
          <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
      ],
      },   
      {
        title: '操作',
        dataIndex: 'orderAmount',
        valueType: 'option',
        hideInSearch: true,
        render:(text, record, _, action)=>[
          <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
      ],
      },  
  ];
  return (
    <>
        <ProTable<ThematicEventItem>
          actionRef={ref}
          headerTitle="关联商品"
          rowKey="id"
          options={false}
          request={consumerOrderPage}
          search={false}
          columns={columns}
          toolBarRender={()=>[
            <Button onClick={()=>{setVisible(true)}}>选择商品</Button>
          ]}
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
        />
      }
  </>
  )
}