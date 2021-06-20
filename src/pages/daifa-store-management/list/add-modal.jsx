import React, { useState, useEffect,useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import upload from '@/utils/upload'
import ProForm,{
    DrawerForm,
    ProFormText,
    ProFormUploadDragger, 
    ProFormUploadButton
  } from '@ant-design/pro-form';
import {import_store,file_tpl_url,findPage,createImportTask } from '@/services/daifa-store-management/list';
import {  Button,message } from 'antd';


export default props=>{
    const fileData = useRef([]);
    const [visible, setVisible] = useState(false);
    const [datalist,setDatalist]=useState([])
    const [baseUrl,setBaseUrl]=useState()
    const [upfile,setUpfile]=useState()
    const Termination=()=>{
        setVisible(true)
    }
    const fileUrl=async (e)=>{
        console.log('e',e)
        if(e.file.status=="done"){
            const dirName='excel'
            upload(e.file,dirName)
            .then(res => {
              console.log('res',res)
        })
        }
       
        
        // createImportTask({fileUrl:res.data.filePath}).then(res=>{
        //     console.log('res',res)
        //     if(res.code==0){
        //         message.success('选择成功');
        //     }
        // })
        // findPage({}).then(res=>{
        //     if(res.code==0){
        //         message.success('导入成功');
        //         // setDatalist(res.)
        //         return true;
        //     }
        // })
        

    }
    useEffect(()=>{
        
    })
    // const submit = (values) => {
    //     console.log('asda',values);
    // }
    
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
        {/* <Button type="primary" onClick={fileUrl}>导入文件</Button> */}
        <ProFormUploadButton
            key='2'
            name="导入文件"
            label="导入文件 "
            max={2}
            fieldProps={{
            name: 'file',
                onChange: (e) => {
                    fileUrl(e)
                }
            }}
            action="/upload.do"
        />
        {/* <ProTable
            rowKey="id"
            options={false}
            search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
            ]
            }}
            dataSource={datalist}
            // columns={columns}
            // actionRef={actionRef}
        /> */}
        </DrawerForm>
    )
}

