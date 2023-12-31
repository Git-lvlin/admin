import React, { useState, useEffect, useRef,useMemo } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import SelectProductModal from './select-product-modal'
import { amountTransform } from '@/utils/utils'
import { subAccountCheck } from '@/services/product-management/product-list'
import { Button,Input} from 'antd';
import debounce from 'lodash/debounce';
import DeleteModel from './delete-model'



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

const Associated0Goods= (props: { id: string; detailList: any; callback: any; }) => {
  const { id,detailList,callback }=props
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false)
  const [delectVisible, setDelectVisible] = useState(false)
  const [editableKeys, setEditableKeys] = useState([])
  const [deleteGoos, setDeleteGoos] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const ref= useRef<ActionType>()
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
      title: 'skuid',
      dataIndex: 'skuId',
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
      title: '批发商家结算价',
      dataIndex: 'wholesaleSupplyPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true,
    },
    {
      title: '零售商家结算价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true,
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
  const  delGoods=(val:string)=>{
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
          params={{
            id:id
          }}
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
            <Button key='allDele' type='primary' disabled={!deleteGoos.length} onClick={()=>{setDelectVisible(true);}}>批量删除</Button>,
            <Button key='select' onClick={()=>{setVisible(true)}}>选择商品</Button>
          ]}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          rowSelection={{
            preserveSelectedRowKeys: true,
            onChange:(_,val)=>{
              setDeleteGoos(val)
              setSelectedRowKeys(_)
            },
            selectedRowKeys
          }}
          tableAlertRender={false}
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
            const arr = [];
            data.forEach(item => {
              arr.push({
                goodsState: 1,
                actPriceProfitLoss: item?.salePriceProfitLoss,
                activityPrice: amountTransform(item?.salePrice,'/'),
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
      {delectVisible && <DeleteModel
        visible={delectVisible}
        setVisible={setDelectVisible}
        record={deleteGoos}
        callBack={()=>{
          ref?.current?.reload();
          const arr=dataSource.concat(deleteGoos).filter(function(v, i, arr) {
                  return arr.indexOf(v) === arr.lastIndexOf(v);
          });
          setSelectedRowKeys([])
          setDeleteGoos([])
          setDataSource(arr) 
          callback(arr)
        }}
        onClose={()=>{ref?.current?.reload();}}
      />}
  </>
  )
}
export default Associated0Goods;
