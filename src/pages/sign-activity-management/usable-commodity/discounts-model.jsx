import React, { useState} from 'react';
import ProForm,{ ModalForm,ProFormTextArea,ProFormText} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { history } from 'umi';



const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default props=>{
    const {record,type,text,InterFace,title,boxref,label,status,id}=props
    const [byid,setByid]=useState()
    const [visible, setVisible] = useState(false);
    const Termination=(record)=>{
        setByid(record&&record.id)
        setVisible(true)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value<0) {
            await reject('必须大于等于0')
        } else {
            await resolve()
        }
        })
    }
    return (
        <ModalForm
            title='满减金额设置'
            key={byid}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<a>设置优惠</a>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                // InterFace({id:id,status:status,content:values.content}).then(res=>{
                //     if(res.code==0){
                //         setVisible(false)   
                //         boxref&&boxref.current?.reload()
                //         message.success('操作成功')
                //         history.goBack()
                //         return true;    
                //     }
                // })
            }}
            {...formItemLayout}
        >
        <ProFormText
            label="SPUID"
            name="1"
            readonly
            initialValue="5656"
        />
        <ProFormText
            label="商品名称"
            name="2"
            readonly
            initialValue="罗西尼手表男款"
        />
        <ProFormText
            label="零售供货价"
            name="3"
            readonly
            initialValue="¥18.09"
        />
        <ProFormText
            label="销售价"
            name="4"
            readonly
            initialValue="¥78.09"
        />
        <ProForm.Group>
            <span>使用门槛 : 满</span>
            <ProFormText
                width={100}
                name='usefulNum'
                // fieldProps={{ onChange: (val) => setFullSubtract(val.target.value) }}
                rules={[
                    {validator: checkConfirm}
                ]} 
            />
            <span>元，（填写0，则无使用门槛）</span>
        </ProForm.Group>
        <ProForm.Group>
            <span>可用红包 : </span>
            <ProFormText
                width={100}
                name='usefulNum'
                // fieldProps={{ onChange: (val) => setFullSubtract(val.target.value) }}
                rules={[
                    {validator: checkConfirm}
                ]} 
            />
            <span>元，（必须大于0，最多支持1位小数）</span>
        </ProForm.Group>
        
    </ModalForm>
    )
}

