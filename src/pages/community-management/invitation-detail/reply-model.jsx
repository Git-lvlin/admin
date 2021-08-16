import React, { useState, useEffect,useRef } from 'react';
import { ModalForm,ProFormSwitch,ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import {Form, Button,message } from 'antd';
import { listSystemVirtualMember } from '@/services/community-management/memberinfo-list-system-virtual-member';

export default props=>{
    const {record,InterFace,boxref,label,dynamicId,dynamicCommentId,parentId}=props
    const [byid,setByid]=useState()
    const [visible, setVisible] = useState(false);
    const [virtual,setVirtual]=useState([])
    const Termination=(record)=>{
        setByid(record&&record.id)
        setVisible(true)
    }
    //会员昵称下拉接口调用
  useEffect(()=>{
    listSystemVirtualMember({}).then(res=>{
        setVirtual(res.data.map(ele=>(
            {label:ele.nickName,value:ele.id}
        )))
    })
  },[])
    return (
        <ModalForm
            key={byid}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<p  onClick={()=>Termination(record)}>{label}</p>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                    <Button type='primary' key="submit" onClick={() => props.form?.submit?.()}>
                        发布
                    </Button>
                ];
            },
            }}
            onFinish={async (values) => {
                console.log('values',values)
                    InterFace({content:values.content,dynamicId,userId:values.userId,dynamicCommentId,parentId}).then(res=>{
                        if(res.code==0){
                            setVisible(false)   
                            boxref&&boxref.current?.reload()
                            message.success('操作成功')
                            return true;
                        }
                    })
                
            }}
        >
             <ProFormSelect
                width="md"
                name="userId"
                label="会员昵称"
                options={virtual}
                placeholder="请选择会员昵称"
            />
            <ProFormTextArea
                width="md"
                name="content"
                label="发布评论"
                placeholder="输入不超过200字。"
                rules={[
                    { 
                        validator:(rule,value,callback)=>{
                            return new Promise(async (resolve, reject) => {
                            if(value&&value.length>200){
                            await reject('最多200个字')
                            }else {
                            await resolve()
                            }
                        })}
                    }
                ]}
            />
    </ModalForm>
    )
}

