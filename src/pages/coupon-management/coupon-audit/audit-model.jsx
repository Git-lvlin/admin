import React, { useState, useEffect,useRef } from 'react';
import { ModalForm,ProFormSwitch,ProFormTextArea} from '@ant-design/pro-form';
import { Button } from 'antd';

export default props=>{
    const {record,type,text,InterFace,title,boxref,label,state,arrId}=props
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
                InterFace({dynamicIds:arrId?arrId:[byid],state,refuseReason:values.refuseReason}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref&&boxref.current?.reload()
                        return true;
                    }
                })
            }}
        >
        <p>{text}</p>
        {
            state==2?
            <ProFormTextArea
                width="md"
                name="refuseReason"
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

