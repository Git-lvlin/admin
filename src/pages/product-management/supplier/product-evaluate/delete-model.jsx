import React, { useState, useEffect,useRef } from 'react';
import { ModalForm,ProFormTextArea} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { deleteVirtual } from '@/services/product-management/product-evaluate';
import { Space } from 'antd';

export default props=>{
    const {setVisible,visible,callback,onClose,id}=props
    return (
        <ModalForm
            title='操作确认'
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                deleteVirtual({id}).then(res=>{
                        if(res.code==0){
                            setVisible(false) 
                            callback()  
                            message.success('操作成功')
                        }
                    })
                
            }}
        >
        <p>确认要执行此操作吗？</p>
    </ModalForm>
    )
}

