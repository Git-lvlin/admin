import React, { useState, useEffect, useRef,useMemo } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import SelectProductModal from './select-product-modal'
import { amountTransform } from '@/utils/utils'
import { subAccountCheck } from '@/services/product-management/product-list'
import { Button,InputNumber,message,Input} from 'antd';
import debounce from 'lodash/debounce';


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
  const [visible, setVisible] = useState(false)
  const [editableKeys, setEditableKeys] = useState([])
  const ref=useRef()
  useEffect(()=>{
    setDataSource(detailList)
    if(detailList){
      setEditableKeys(detailList?.map(item => item.id))
    }
  },[detailList])
  const debounceFetcher = useMemo(() => {
    const loadData = (value) => {
      const { recordList, record } = value;
      const getList = (list, salePriceProfitLoss) => {
        const arr = list.map(ele=>{
          if(ele?.skuId==record?.skuId){
            return {...ele,actPriceProfitLoss:salePriceProfitLoss}
          }else{
            return {...ele}
          }
        })
        return arr;
      }

      const params={
        operateType:1,
        skuId:record?.skuId,
        retailSupplyPrice:record?.retailSupplyPrice,
        wholesaleTaxRate:record?.wholesaleTaxRate,
        salePrice:amountTransform(record?.activityPrice,'*')
      }
      subAccountCheck(params).then(res => {
        const salePriceProfitLoss = res?.data[0]?.salePriceProfitLoss;
        setDataSource(getList(recordList, salePriceProfitLoss))
      })
    };

    return debounce(loadData, 10);
  }, [dataSource]);
  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: 'spuid',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false,
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
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
      title: '秒杀价',
      dataIndex: 'activityPrice',
      valueType: 'text',
      renderFormItem: (_, { record }) => {
        return  <Input onBlur={() => { debounceFetcher({ record, recordList: dataSource })}} />
      },
    },
    {
      title: '发票税率',
      dataIndex: 'wholesaleTaxRate',
      valueType: 'text',
      editable:false,
      hideInTable: true,
      render:(_)=>{
        return _
      },
    },
    {
      title: '平台亏盈',
      dataIndex: 'actPriceProfitLoss',
      valueType: 'text',
      editable:false,
      render:(_,data)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '商品状态',
      dataIndex: 'goodsState',
      valueType: 'text',
      editable:false,
      valueEnum:{
        1: '上架中',
        0: '已下架'
      }
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
          headerTitle="商品列表"
          rowKey="id"
          options={false}
          value={dataSource}
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
            setDataSource(data.map(item=>({
              goodsState: 1,
              actPriceProfitLoss: item?.salePriceProfitLoss,
              activityPrice: amountTransform(item?.salePrice,'/'),
              sort:9999,
              ...item
            })))
            callback(data.map(item=>({
              goodsState: 1,
              actPriceProfitLoss: item?.salePriceProfitLoss,
              activityPrice: amountTransform(item?.salePrice,'/'),
              sort:9999,
              ...item
            })))
            setEditableKeys(data.map(item => item.id))
          }}
      />
      }
  </>
  )
}
