import React, { useState, useEffect,useRef } from 'react';
import { ModalForm,ProFormSwitch,ProFormTextArea} from '@ant-design/pro-form';
import { Button,message } from 'antd';

export default props=>{
    const {record,type,text,InterFace,title,boxref,label,status,id}=props
    const [byid,setByid]=useState()
    const [visible, setVisible] = useState(false);
    const Termination=(record)=>{
        setByid(record&&record.id)
        setVisible(true)
    }
    return (
        <ModalForm
            title={title}
            key={byid}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button style={{marginLeft:type==1?'70px':'20px'}} type={type==1?"primary":"default"}  onClick={()=>Termination(record)}>{label}</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                console.log('values',values)
                InterFace({id:id,status:status,content:values.content}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref&&boxref.current?.reload()
                        message.success('操作成功')
                        return true;    
                    }
                })
            }}
        >
        <p>{text}</p>
        {
            status==3?
            <ProFormTextArea
                width="md"
                name="content"
                label="请填写驳回原因"
                rules={[
                    {
                        validator: (rule, value, callback) => {
                            return new Promise(async (resolve, reject) => {
                                if (value && value.length > 100) {
                                    await reject('不能超过100个字符')
                                } else {
                                    await resolve()
                                }
                            })
                        }
                    }
                ]}
            />
            :null
        }
        
    </ModalForm>
    )
}

