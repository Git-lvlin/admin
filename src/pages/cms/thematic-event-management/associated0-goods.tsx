import React, { useState, useEffect, useRef } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd'
import { useLocation } from 'umi';
import SelectProductModal from './select-product-modal'
import { amountTransform } from '@/utils/utils'


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

export default (props) => {
  const { id,detailList,callback }=props
  const [dataSource, setDataSource] = useState([]);
  const [detailId, setDetailId] = useState(null)
  const [visible, setVisible] = useState(false)
  const isPurchase = useLocation().pathname.includes('purchase')
  const [detailVisible, setDetailVisible] = useState(false);
  const [editableKeys, setEditableKeys] = useState([])
  const ref=useRef()
  useEffect(()=>{
    setDataSource(detailList)
    if(detailList){
      setEditableKeys(detailList?.map(item => item.id))
    }
  },[detailList])
  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: 'spuid',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false,
    },
    {
      title: '商品图片',
      dataIndex: 'imageUrl',
      valueType: 'image',
      editable:false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable:false,
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '销售价',
      dataIndex: 'salePrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '活动价',
      dataIndex: 'actPrice',
      valueType: 'text',
      render:(_)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '平台亏盈',
      dataIndex: 'actPriceProfitLoss',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '商品状态',
      dataIndex: 'goodsState',
      valueType: 'text',
      editable:false,
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      editable:false,
    }, 
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
    },   
    {
      title: '操作',
      valueType: 'text',
      editable:false,
      render:(text, record, _, action)=>[
        <a key='detele' onClick={()=>{delGoods(record.id)}}>删除</a>
    ],
    },  
  ];
  // 删除商品
  const  delGoods=val=>{
    const arr=dataSource.filter(ele=>(
          ele.id!=val
    ))
    setDataSource(arr) 
    callback(arr)
  }
  return (
    <>
        <EditableProTable<ThematicEventItem>
          actionRef={ref}
          headerTitle="关联商品"
          rowKey="id"
          options={false}
          value={dataSource&&dataSource.map(ele=>({...ele,actPrice:amountTransform(ele?.actPrice,'/')}))}
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
              callback(recordList)
            },
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
        keyId={dataSource}
        detailList={dataSource||[]}
        callback={(data)=>{
          const arr = dataSource?.length>0?dataSource:[];
          data.forEach(item => {
            arr.push({
              actPrice: 0,
              sort:9999,
              ...item
            })
          })
          setDataSource(arr)
          callback(arr)
          setEditableKeys(arr.map(item => item.id))
        }}
      />
      }
  </>
  )
}