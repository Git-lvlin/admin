import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Switch, Input} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import SelectProductModal from '@/components/select-product-modal'
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormText} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';


export default (props) => {
  const {callback,id,falg,detailList}=props
  const ref=useRef()
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const [visible, setVisible] = useState(false);
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
      title: 'SPUID',
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
    },
    {
      title: '零售供货价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
    },
    {
      title: '奖品库存',
      dataIndex: 'stockNum',
      valueType: 'digit',
      hideInSearch:true,
    },
    {
      title: '中奖概率',
      dataIndex: 'probability',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      renderFormItem: (_,r) => {
      return <Switch checked={r.record.status}/>
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
    setDataSource(arr) 
    callback(arr)
  }
  useEffect(()=>{
    if(!falg){
     setDataSource(detailList?.skus)
    }
   
  },[falg])
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
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
            callback(recordList)
          }
        }}
        toolBarRender={()=>[
            <Button type="primary" onClick={() => { 
              setEditableKeys(dataSource.map(item => item.id))
            } 
            }>编辑概率</Button>,
            <Button type="primary" onClick={() => { setEditableKeys([])}}>保存</Button>,
            <Button type="primary" onClick={()=>setVisible(true)}>
                <PlusOutlined />
                添加秒约商品
            </Button>,
            <SelectProductModal 
              title={'添加秒约商品'}  
              visible={visible} 
              setVisible={setVisible} 
              callback={(val)=>{
                const arr = [];
                val.forEach(item => {
                  arr.push({
                    status:false,
                    add:true,
                    ...item
                  })
                })
                setDataSource([...dataSource,...arr])
              }}
            />
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
