import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch,ProFormDigit} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import DeleteModal from '@/components/DeleteModal'
import { EditableProTable } from '@ant-design/pro-table';
import GoosModel from './goos-model'


export default () => {
  const ref=useRef()
  const [spuIdsArr,setSpuIdsArr]=useState([])
  const [onoff,setOnoff]=useState(false)
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const columns= [
    {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder',
        editable:false
    },
    {
      title: 'SPUID',
      dataIndex: 'dynamicId',
      valueType: 'text',
      editable:false
    },
    {
      title: '商品图片',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true,
      editable:false
      // render:(_,data)=>{
      //   return <Image src={data.images[0]} alt="" width='50px' height='50px' />
      // }
    },
    {
      title: '商品名称',
      dataIndex: 'userName',
      valueType: 'text',
      editable:false
    },
    {
      title: '商品分类',
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch:true,
      editable:false
    },
    {
      title: '销售价',
      key: 'dateRange',
      dataIndex: 'createTime',
      hideInSearch:true,
      editable:false
    },
    {
      title: '零售供货价',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch:true,
      editable:false
    },
    {
      title: '奖品库存',
      dataIndex: 'images',
      valueType: 'image',
      hideInSearch:true,
      renderFormItem:(_,r) => {
        return <ProFormDigit width="xs" name="num1" initialValue={5} />
    },
    },
    {
      title: '中奖概率',
      dataIndex: 'state',
      hideInSearch: true,
      renderFormItem:(_,r) => {
        return <ProFormDigit width="xs" name="num2" initialValue={5} />
      },
      render: (_,r) => {
        console.log('r',r)
        return <p>{}</p>
      }
    },
    {
      title: '状态',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem:(_, row) => {
        return <ProFormSwitch name="Switch"
        //   fieldProps={{
        //     checked: onoff,
        //     // onChange:(bol)=>{onTop(bol,r.id)
        //   }
        // }
        />
      },
      render: (_,r) => {
        console.log('r',r)
        return <p>{}</p>
      }
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <a onClick={()=>delGoods(record.spuId)}>删除</a>
     ]
    },
  ]; 
   // 删除商品
   const  delGoods=val=>{
    setDataSource( 
      dataSource.filter(ele=>(
      ele.spuId!=val
    ))
    )
}
  const defaultData= [
    {
      id: '624748504',
      title: '当天红包金额',
      decs: '这个活动真好玩',
    },
    {
      id: '624691229',
      title: '连续签到额外奖励金额',
    },
  ]
  return (
    <EditableProTable
        rowKey="id"
        headerTitle="奖品设置"
        maxLength={5}
        name="table"
        value={defaultData}
        // onChange={setDataSource}
        recordCreatorProps={false}
        columns={columns}
        // request={async () => ({
        //   data: defaultData
        // })}
        editable={{
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
            setDataSource(recordList)
        }
        }}
        toolBarRender={()=>[
            <Button type="primary" onClick={() => { setEditableKeys(defaultData.map(item => item.id))}}>编辑概率</Button>,
            <Button type="primary" onClick={() => { setEditableKeys([]) }}>保存</Button>,
            <GoosModel callback={(val)=>setSpuIdsArr(val)}/>
        ]}
        style={{marginBottom:'30px'}}
    />
  );
};
