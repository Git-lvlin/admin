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
    const {spuId,InterFace,boxref}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
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
    const checkConfirm2=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value<=0) {
            await reject('必须大于0')
        } else {
            await resolve()
        }
        })
    }
    return (
        <ModalForm
            title='满减金额设置'
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<a onClick={()=>Termination()}>设置优惠</a>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                InterFace({spuId:spuId,...values}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref&&boxref.current?.reload()
                        message.success('操作成功')
                        return true;    
                    }
                })
            }}
            {...formItemLayout}
        >
        <ProForm.Group>
            <span>使用门槛 : 满</span>
            <ProFormText
                width={100}
                name='destAmount'
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
                name='maxDeduction'
                rules={[
                    {validator: checkConfirm2}
                ]} 
            />
            <span>元，（必须大于0，最多支持1位小数）</span>
        </ProForm.Group>
        
    </ModalForm>
    )
}

