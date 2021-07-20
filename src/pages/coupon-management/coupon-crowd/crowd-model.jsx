import React, { useState, useEffect,useRef, useCallback } from 'react';
import { ModalForm,ProFormSwitch,ProFormTextArea,ProFormCheckbox} from '@ant-design/pro-form';
import { userLevelList } from '@/services/crowd-management/coupon-crowd';
import { Button,message } from 'antd';

export default props=>{
    const {record,type,text,InterFace,title,boxref,label,state,arrId,Callback}=props
    const [byid,setByid]=useState()
    const [leveData,setLeveData]=useState([])
    const [visible, setVisible] = useState(false);
    const Termination=(record)=>{
        setByid(record&&record.id)
        setVisible(true)
        userLevelList({}).then(res=>{
            const arr=res.data.map(ele=>(
                {label:ele.name,value:ele.lv}
            ))
            setLeveData(arr)

        })
    }
    return (
        <ModalForm
            title={title}
            key={byid}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button type="primary" onClick={()=>Termination(record)}>选择等级</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                setVisible(false)
                Callback(values)   
                message.success('选择完成')
                boxref&&boxref.current?.reload()
                return true;
            }}
        >
        <ProFormCheckbox.Group      
          name="userLevel"
          label="选择等级"
          options={leveData}
        />
    </ModalForm>
    )
}

