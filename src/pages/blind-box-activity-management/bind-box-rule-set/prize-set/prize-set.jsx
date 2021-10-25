import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Switch, Input,InputNumber,message} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import SelectProductModal from '@/components/select-product-modal'
import { PlusOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import ProTable from '@ant-design/pro-table';
const _ = require('lodash');



export default (props) => {
  const {callback,id,falg,detailList,submi}=props
  const ref=useRef()
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    if(!falg){
     setDataSource(detailList?.skus)
     setEditableKeys(detailList?.skus.map(item => item.id))
    }
    if(submi){
      setEditableKeys([])
    }
   
  },[falg,submi])

  const columns= [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder',
      editable:false,
    },
    {
      title: 'SKUID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false,
    },
    {
      title: '商品图片',
      dataIndex: 'imageUrl',
      valueType: 'image',
      hideInSearch:true,
      editable:false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable:false,
    },
    {
      title: '销售价',
      valueType: 'text',
      dataIndex: 'salePrice',
      hideInSearch:true,
      editable:false,
       render: (_)=> amountTransform(parseInt(_), '/').toFixed(2)
    },
    {
      title: '零售供货价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
       render: (_)=> amountTransform(parseInt(_), '/').toFixed(2)
    },
    {
      title: '可用库存',
      dataIndex: 'baseStockNum',
      valueType: 'text',
      editable:false,
    },
    {
      title: '奖品库存',
      dataIndex: 'stockNum',
      valueType: 'digit',
      hideInSearch:true,
      renderFormItem: (_,r) => {
        return  <InputNumber
                  min="0"
                  max={_.entry.baseStockNum}
                  stringMode
                />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
    },
    {
      title: '中奖概率%',
      dataIndex: 'probability',
      valueType: 'digit',
      hideInSearch: true,
      renderFormItem: (_,r) => {
        return  <InputNumber
                  min="0"
                  max="100"
                  precision='2'
                  stringMode
                />
        },
      render: (_,r) =>{
        return <p>{_}%</p>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      renderFormItem: (_,r) => {
      return <Switch checked={_.entry.status}/>
      },
      render: (_,r) =>{
        return <p>
        {
          r.status?'开启':'关闭'
        }
      </p>
      }
    },
    {
      title: '操作',
      valueType: 'text',
      render:(text, record, _, action)=>{
        return [
          <a onClick={()=>delGoods(record.id)}>删除</a>
      ]
      },
      editable:false,
      hideInTable:id&&falg
   }
  ]; 
  // 删除商品
  const  delGoods=val=>{
    const arr=dataSource.filter(ele=>(
          ele.id!=val
    ))
    // let sum=0
    // arr.map(ele=>{
    //   if(ele.status){
    //     sum+=parseInt(ele.probability)
    //   }
    // })
    // setSubmi(sum)
    setDataSource(arr) 
    callback(arr)
  }
  return (
    <>
    <EditableProTable
        rowKey="id"
        headerTitle="奖品设置"
        name="table"
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
            // let sum=0
            // recordList.map(ele=>{
            //   if(ele.status){
            //     sum+=parseInt(ele.probability)
            //   }
            // })
            // setSubmi(sum)
            // if(sum>100){
            //   message.error('所有商品概率总和不能超过100%')
            // }else if(sum==100){
              setDataSource(recordList)
              callback(recordList)
            // }
          },
        }}
        toolBarRender={()=>[
            <Button type="primary" onClick={()=>{
              setVisible(true)
            }}>
                <PlusOutlined />
                添加秒约商品
            </Button>,
            <>
            {
              visible&&<SelectProductModal 
                title={'添加秒约商品'}  
                visible={visible} 
                setVisible={setVisible}
                goodsSaleType={2} 
                apolloConfig={'MHSupplierId'}
                callback={(val)=>{
                  const arr = [];
                  val.forEach(item => {
                    arr.push({
                      id:item.id,
                      status:false,
                      add:true,
                      probability: item.probability,
                      skuId: item.skuId,
                      spuId: item.spuId,
                      stockNum: 0,
                      baseStockNum:item.stockNum,
                      goodsName: item.goodsName,
                      imageUrl: item.imageUrl,
                      salePrice: item.salePrice,
                      retailSupplyPrice: item.retailSupplyPrice,
                    })
                  })
                  detailList?.skus.map(ele=>{
                      arr.map(item=>{
                        if(item.skuId==ele.skuId){
                          item.id=ele.id
                          delete item.add
                        }
                      })
                  })
                  let arr2=_.uniqWith([...dataSource,...arr], _.isEqual)
                    setDataSource(arr2)
                    setEditableKeys(arr2.map(item => item.id))
                }}
              />
            }
            </>
        ]}
        style={{marginBottom:'30px',display:id&&falg?'none':'block'}}
    />

    <ProTable
        toolBarRender={false}
        search={false}
        rowKey="skuId"
        columns={columns}
        dataSource={detailList?.skus}
        style={{display:id&&falg?'block':'none'}}
    />
    </>
    
  );
};
