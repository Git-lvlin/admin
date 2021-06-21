import React, { useState, useEffect,useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import EcxelUpload from '@/components/EcxelUpload';
import ProForm,{
    DrawerForm,
  } from '@ant-design/pro-form';
import {findPage,createImportTask } from '@/services/daifa-store-management/list';
import {  Button,message } from 'antd';


export default props=>{
    const fileData = useRef([]);
    const [visible, setVisible] = useState(false);
    const [datalist,setDatalist]=useState([])
    const Termination=()=>{
        setVisible(true)
    }
    const fileUrl=async (e)=>{
        console.log('e',e)   
        await createImportTask({fileUrl:e}).then(res=>{
            console.log('res',res)
            if(res.code==0){
                message.success('选择成功');
            }
        })
        await findPage({}).then(res=>{
            if(res.code==0){
                message.success('导入成功');
                console.log('res',res.data)
                setDatalist(res.data)
            }
        })  
    }
    const columns = [
        {
          title: '任务id',
          dataIndex: 'id',
          valueType: 'text',
          ellipsis:true
        },
        {
          title: '导入文件',
          dataIndex: 'realname',
          valueType: 'text',
        },
        {
          title: '开始时间',
          dataIndex: 'createTime',
          valueType: 'text',
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          valueType: 'select',
        //   valueEnum: {
        //     0:'全部',
        //     1: '已启用',
        //     2: '已禁用',
        //     3: '未激活'
        //   }
        },
        {
          title: '进度',
          dataIndex: 'goodsTotal',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '总记录数',
          dataIndex: 'adminName',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '已导入',
          dataIndex: 'createTime',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'text',
        },
      ];
    const submit = (values) => {
        setDatalist([])
    }
    
    return (
        <DrawerForm
            key="1"
            title='批量新建'
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button type="primary" onClick={()=>Termination()}>批量新建</Button>}
            onFinish={async (values) => {
              await submit(values);
              return true;
            }}
        >
        <EcxelUpload calback={fileUrl}  multiple maxCount={1} accept="image/*" size={5 * 1024} />
        {
            datalist.length?
            <ProTable
            rowKey="id"
            options={false}
            search={false}
            dataSource={datalist}
            columns={columns}
        />
        :null
        }
       
        </DrawerForm>
    )
}

