import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import DeleteModal from '@/components/DeleteModal'
import GoosModel from './goos-model'


export default () => {
  const ref=useRef()
  const [spuIdsArr,setSpuIdsArr]=useState([])
  const [onoff,setOnoff]=useState(false)
  const onTop=(off)=>{
}
  const columns= [
    {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
    },
    {
      title: 'SPUID',
      dataIndex: 'dynamicId',
      valueType: 'text',
    },
    {
      title: '商品图片',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true,
      // render:(_,data)=>{
      //   return <Image src={data.images[0]} alt="" width='50px' height='50px' />
      // }
    },
    {
      title: '商品名称',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '商品分类',
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch:true,
      ellipsis:true
    },
    {
      title: '销售价',
      key: 'dateRange',
      dataIndex: 'createTime',
      hideInSearch:true
    },
    {
      title: '零售供货价',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch:true
    },
    {
        title: '奖品库存',
        dataIndex: 'images',
        valueType: 'image',
        hideInSearch:true,
        renderFormItem:(_,r) => {
          return <ProFormDigit width="xs" name="num1" initialValue={5} />
        },
        render: (_) => {
          console.log('_',_)
          return <p>{_}</p>
        }
      },
    {
      title: '中奖概率',
      dataIndex: 'state',
      hideInSearch: true,
      renderFormItem:(_,r) => {
        return <ProFormDigit width="xs" name="num2" initialValue={5} />
      },
      render: (_) => <p>{_}</p>
    },
    {
      title: '状态',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem:(_,r) => {
        return <ProFormSwitch name="Switch" fieldProps={{}}/>
    },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, data) => [
          <DeleteModal
            record={data} 
            boxref={ref} 
            label1={'删除'}
            text={'确定要删除该商品吗？'} 
            // InterFace={couponDelSub}
            blok={1}
            title={'操作确认'}
            />
      ],
    },
    
  ]; 
  return (
    <>
      <ProTable
        actionRef={ref}
        rowKey="id"
        headerTitle="奖品设置"
        options={false}
        params={{
        //   auditStatus:type,
        }}
        // request={adminList}
        dataSource={spuIdsArr}
        search={false}
        toolBarRender={()=>[
            <Button  onClick={()=>setOnoff(false)} type="primary">
                编辑概率
            </Button>,
            <GoosModel callback={(val)=>setSpuIdsArr(val)}/>
        ]}
        columns={columns}
      />
         <ProTable
          rowKey="id"
          headerTitle="奖品"
          options={false}
          // dataSource={spuIdsArr}
          search={false}
          columns={columns}
      />
    </> 
  );
};
