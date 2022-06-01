import React, { useState, useEffect, useRef } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { consumerOrderPage } from '@/services/hydrogen-atom-management/hydrogen-atom-start-recording'
import moment from 'moment'
import { Button } from 'antd'
import { amountTransform } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import { useLocation } from 'umi';
import SelectProductModal from './select-product-modal'


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
  const [editableKeys, setEditableKeys] = useState([])
  const ref=useRef()
  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: 'spuid',
      dataIndex: 'deviceImei',
      valueType: 'text',
      editable:false,
    },
    {
      title: '商品图片',
      dataIndex: 'occupationMode',
      valueType: 'image',
      editable:false,
    },
    {
      title: '商品名称',
      dataIndex: 'occupationMode',
      valueType: 'text',
      editable:false,
    },
    {
      title: '市场价',
      dataIndex: 'memberPhone',
      valueType: 'text',
      editable:false,
    },
    {
      title: '销售价',
      dataIndex: 'isShopkeeper',
      valueType: 'text',
      editable:false,
    },
    {
      title: '活动价',
      dataIndex: 'isShopkeeper',
      valueType: 'text',
    },
    {
      title: '平台亏盈',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      editable:false,
    },
    {
      title: '商品状态',
      dataIndex: 'orderAmount',
      valueType: 'text',
      editable:false,
    },
    {
      title: '可用库存',
      dataIndex: 'orderAmount',
      valueType: 'text',
      editable:false,
    }, 
    {
      title: '排序',
      dataIndex: 'orderAmount',
      valueType: 'text',
    },   
    {
      title: '操作',
      dataIndex: 'orderAmount',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <a key='detele' onClick={()=>{setVisible(true);setDetailId(record.id)}}>删除</a>
    ],
    },  
  ];
  return (
    <>
        <EditableProTable<ThematicEventItem>
          actionRef={ref}
          headerTitle="关联商品"
          rowKey="id"
          options={false}
          request={consumerOrderPage}
          recordCreatorProps={false}
          search={false}
          columns={columns}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
            },
          }}
          postData={(data)=>{
            setEditableKeys(data.map(item => item.id))
            return data
          }}
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
        <SelectProductModal
        title={'选择商品'}  
        visible={visible} 
        setVisible={setVisible}
        goodsSaleType={2} 
        apolloConfig={'MHSupplierId'}
        // keyId={dataSource}
        // detailList={detailList?.skus||[]}
        callback={(val)=>{
          // const arr = dataSource.length>0?dataSource.filter(ele=>ele.skuId==0):[];
          // val.forEach(item => {
          //   arr.push({
          //     stockNum: 0,
          //     goodsType:1,
          //     ...item
          //   })
          // })
          //   setDataSource(arr)
          //   callback(arr)
          //   setEditableKeys(arr.map(item => item.id))
        }}
      />
      }
  </>
  )
}