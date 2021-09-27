import React, { useState} from 'react';
import { ModalForm,ProFormTextArea} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { history } from 'umi';

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
            trigger={<a  onClick={()=>Termination(record)}>{label}</a>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                InterFace({id:id,status:status,content:values.content}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref&&boxref.current?.reload()
                        message.success('操作成功')
                        history.goBack()
                        return true;    
                    }
                })
            }}
        >
            <ProFormTextArea
                width="md"
                name="content"
                rules={[
                    {
                        validator: (rule, value, callback) => {
                            return new Promise(async (resolve, reject) => {
                                if (value && value.length > 100||value.length<3) {
                                    await reject('最多100个字，最少3个字')
                                } else {
                                    await resolve()
                                }
                            })
                        }
                    }
                ]}
                placeholder="最多100个字，最少3个字"
            />
    </ModalForm>
    )
}

