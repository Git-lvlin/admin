import React, { useState, useEffect, useRef,useMemo } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import SelectProductModal from './select-product-modal'
import { amountTransform } from '@/utils/utils'
import { subAccountCheck } from '@/services/product-management/product-list'
import { Button, Input, Image, Popover} from 'antd';
import debounce from 'lodash/debounce';
import { getMiniQr } from '@/services/common'


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
  const [qrCodeUrl,setQrCodeUrl]=useState<string>('')
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
        salePrice:amountTransform(record?.actPrice,'*')
      }
      subAccountCheck(params).then(res => {
        const salePriceProfitLoss = res?.data[0]?.salePriceProfitLoss;
        setDataSource(getList(recordList, salePriceProfitLoss))
      })
    };

    return debounce(loadData, 10);
  }, [dataSource]);

  const content = ()=>{
    if(qrCodeUrl){
      return (
        <img
          width={200}
          src={qrCodeUrl}
        />
      );
    }
  }


  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: 'spuid',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false,
      hideInSearch: true
    },
    {
      title: 'skuid',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false,
      fieldProps:{
        placeholder:'请输入skuID'
      }
    },
    {
      title: '商品图片',
      dataIndex: 'imageUrl',
      valueType: 'image',
      editable:false,
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable:false,
      fieldProps:{
        placeholder:'请输入商品名称'
      }
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true
    },
    {
      title: '销售价',
      dataIndex: 'salePrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true
    },
    {
      title: '活动价',
      dataIndex: 'actPrice',
      valueType: 'text',
      renderFormItem: (_, { record }) => {
        return  <Input onBlur={() => { debounceFetcher({ record, recordList: dataSource })}} />
      },
      hideInSearch: true
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
      hideInSearch: true
    },
    {
      title: '平台亏盈',
      dataIndex: 'actPriceProfitLoss',
      valueType: 'text',
      editable:false,
      render:(_,data)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      valueType: 'text',
      editable:false,
      valueEnum:{
        1: '上架中',
        0: '已下架'
      },
      hideInSearch: true
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      editable:false,
      hideInSearch: true
    }, 
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true
    },   
    {
      title: '操作',
      valueType: 'text',
      editable:false,
      render:(text, record, _, action)=>[
        <a key='detele' onClick={()=>{delGoods(record.id)}}>删除</a>,
        <span key='miniProgram'>
        {
          id&&<><Popover  content={content} placement="bottom" title="商品小程序码" trigger="click" >
                  <a onClick={()=>{ 
                    getMiniQr({ url:`/subpages/cart/detail/index?orderType=2&spuId=${record?.spuId}&objectId=&activityId=${id}&skuId=${record?.skuId}&wsId=0` }).then(res=>{
                      setQrCodeUrl(res.data.url)
                    })
                   }}>&nbsp;小程序码</a>
              </Popover>
          </>
        }
        </span>
      ],
      hideInSearch: true
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
          value={dataSource}
          recordCreatorProps={false}
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
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              <Button 
                key="rest" 
                onClick={() => { 
                  searchConfig?.form?.resetFields()
                  setDataSource(detailList)
                }}> 
                重置 
              </Button>,
              <Button 
                key="search" 
                type="primary" 
                onClick={() => { 
                  searchConfig?.form?.submit()
                  const { skuId,goodsName } = searchConfig?.form?.getFieldsValue()
                  const arr=dataSource.filter(ele=>(
                        ele?.skuId==skuId || ele?.goodsName==goodsName
                  ))
                  setDataSource(arr) 
                }}> 
                搜索 
              </Button>,
              <Button onClick={()=>{setVisible(true)}}>选择商品</Button>
            ],
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
            const arr = [];
            data.forEach(item => {
              arr.push({
                status:1,
                actPrice: amountTransform(item?.salePrice,'/'),
                actPriceProfitLoss:item?.salePriceProfitLoss,
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