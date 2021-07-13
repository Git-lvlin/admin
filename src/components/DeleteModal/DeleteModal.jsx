import React, { useState, useEffect,useRef } from 'react';
import { ModalForm} from '@ant-design/pro-form';
import { Button } from 'antd';

export default props=>{
    const {record,text,InterFace,title,boxref,blok}=props
    const [byid,setByid]=useState()
    const [visible, setVisible] = useState(false);
    const Termination=(record)=>{
        setByid(record.id)
        setVisible(true)
    }
    return (
        <ModalForm
            title={title}
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            trigger={
                blok
                ?<a onClick={()=>Termination(record)}>{blok==1?'删除':null}</a>
                :<Button disabled={record.delete?true:false} onClick={()=>Termination(record)}>
                    {record.delete?'已删除':'删除'}
                 </Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                InterFace({id:byid}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref.current?.reload()
                        return true;
                    }
                })
            }}
        >
        <p>{text}</p>
    </ModalForm>
    )
}

