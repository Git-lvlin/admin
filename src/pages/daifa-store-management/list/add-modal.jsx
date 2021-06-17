import React, { useState, useEffect,useRef } from 'react';
import ProForm,{
    ModalForm,
    ProFormText
  } from '@ant-design/pro-form';
import { Button } from 'antd';

export default props=>{
    const {boxref}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
        setVisible(true)
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
                // InterFace({}).then(res=>{
                //     if(res.code==0){
                        setVisible(false)   
                //         boxref.current?.reload()
                //         return true;
                //     }
                // })
            }}
        >
        导入内部店：<Button type="primary">选择</Button>
        下载导入的模板：<Button type="primary">下载</Button>
    </ModalForm>
    
    )
}

