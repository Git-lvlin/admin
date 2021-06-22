import React, { useState, useEffect,useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import EcxelUpload from '@/components/EcxelUpload';
import ProForm,{
    DrawerForm,
  } from '@ant-design/pro-form';
import {findPage,createImportTask,file_tpl_url } from '@/services/daifa-store-management/list';
import {  Button,message } from 'antd';


export default props=>{
    const {callback = () => { }}=props 
    const [visible, setVisible] = useState(false);
    const [datalist,setDatalist]=useState([])
    const [falg,setFalg]=useState(false)
    const Termination=()=>{
        setVisible(true)
    }
    useEffect(()=>{
      var user=window.localStorage.getItem('user')
      console.log('user',user)
    },[])
    const fileUrl=async (e)=>{
        console.log('e',e)
        if(window.localStorage.getItem('user')){
          await createImportTask({fileUrl:e,param:window.localStorage.getItem('user')}).then(res=>{
            console.log('res',res)
            if(res.code==0){
                message.success('创建导入任务成功');
            }
        })
        await findPage({}).then(res=>{
            if(res.code==0){
                message.success('批量导入成功');
                console.log('res',res.data)
                setDatalist(res.data)
            }
          })
        }
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
          dataIndex: 'fileUrl',
          valueType: 'text',
          ellipsis:true
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
          dataIndex: 'state',
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
          dataIndex: 'process',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '总记录数',
          dataIndex: 'count',
          valueType: 'text',
          hideInSearch: true,
        },
        {
          title: '已导入',
          dataIndex: 'processCount',
          valueType: 'text',
          hideInSearch: true,
        },
        // {
        //   title: '操作',
        //   dataIndex: 'option',
        //   valueType: 'text',
        // },
      ];
    const submit = (values) => {
        setDatalist([])
        callback()
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
            destroyOnClose='false'
        >
        
        { 
            datalist.length?
            <ProTable
            rowKey="id"
            options={false}
            search={false}
            dataSource={datalist}
            columns={columns}
        />
        :<>
           <a href="https://dev-yeahgo-secret.oss-cn-shenzhen.aliyuncs.com/store_secret/message/rc-upload-1624330809769-12tmp_agent.xls"><Button type="primary" style={{margin:'20px 0 20px 0'}}>下载模板</Button></a>
           <EcxelUpload calback={fileUrl}  multiple maxCount={1} accept="image/*" size={5 * 1024} />
        </>
        }
       
        </DrawerForm>
    )
}

