import React, { useState, useEffect,useRef } from 'react';
import ProForm,{
    ModalForm,
    ProFormText
  } from '@ant-design/pro-form';
import { Button } from 'antd';
import {import_store,file_tpl_url } from '@/services/daifa-store-management/list'


export default props=>{
    const {boxref}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
        setVisible(true)
    }
    const fileUrl=()=>{
        file_tpl_url({}).then(res=>{
            console.log('res',res.data.filePath)
        })
    }
    const download=()=>{

    }
    return (
        <ModalForm
            title='批量新建内部店'
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button type="primary" onClick={()=>Termination()}>批量新建</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                // import_store({}).then(res=>{
                //     if(res.code==0){
                        setVisible(false)   
                //         boxref.current?.reload()
                //         return true;
                //     }
                // })
            }}
        >
        <p>导入内部店：<Button type="primary" onClick={fileUrl}>选择</Button></p>
        <p>下载导入的模板：<Button type="primary" onClick={download}>下载</Button></p>
    </ModalForm>
    
    )
}

